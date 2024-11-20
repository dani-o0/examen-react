import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, Button } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { FIREBASE_STORAGE } from '../firebaseConfig'; // Importa la configuración de Firebase

const TaskListScreen = ({ navigation, route }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Función para obtener las tareas desde Firebase
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIREBASE_STORAGE, 'tasks'));
        const tasksList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksList);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();

    // Volver a cargar las tareas cuando regresamos desde EditTaskScreen
    const unsubscribe = navigation.addListener('focus', fetchTasks); // Vuelve a obtener las tareas cuando la pantalla gana el foco

    // Limpiar el listener cuando el componente se desmonte
    return unsubscribe;
  }, [navigation]);

  const toggleTaskCompletion = async (id) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
      const taskRef = doc(FIREBASE_STORAGE, 'tasks', id);
      await updateDoc(taskRef, {
        completed: !task.completed,
      });
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      );
    }
  };

  const deleteTask = async (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await deleteDoc(doc(FIREBASE_STORAGE, 'tasks', id));
              setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
            } catch (error) {
              console.error('Error deleting task:', error);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTaskCompletion(item.id)}
        containerStyle={styles.checkboxContainer}
      />
      <Text style={[styles.taskTitle, item.completed && styles.taskCompleted]}>
        {item.deadline ? `${item.title}\n${item.deadline}` : item.title}
      </Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="Edit" 
          onPress={() => navigation.navigate('EditTask', { task: item })} 
        />
        <Button 
          title="Delete" 
          color="red" 
          onPress={() => deleteTask(item.id)} 
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Button title="Add New Task" onPress={() => navigation.navigate('CreateNewTask')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  taskTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 16,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  checkboxContainer: {
    padding: 0,
    margin: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10, // Espacio entre los botones
  },
});

export default TaskListScreen;
