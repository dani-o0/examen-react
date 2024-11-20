import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { FIREBASE_STORAGE } from '../firebaseConfig'; // Importa la configuración de Firebase

const EditTaskScreen = ({ route, navigation }) => {
  const { task } = route.params;
  
  // Inicializamos el estado con el valor del deadline, 
  // Si no tiene fecha, asignamos un valor vacío
  const [title, setTitle] = useState(task.title);
  const [deadline, setDeadline] = useState(task.deadline || '');

  // Función para manejar la actualización de la tarea
  const handleSave = async () => {
    // Verificar si el título está vacío
    if (title.trim() === '') {
      Alert.alert('Error', 'The task title must not be empty.');
      return;
    }

    // Si el campo de deadline está vacío, asignamos "No due date"
    const updatedDeadline = deadline.trim() === '' ? 'No due date' : deadline;

    try {
      const taskRef = doc(FIREBASE_STORAGE, 'tasks', task.id);
      await updateDoc(taskRef, {
        title,
        deadline: updatedDeadline,
      });
      navigation.goBack();  // Regresar a la lista de tareas
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Función para manejar la edición del deadline
  const handleDeadlineChange = (text) => {
    // Si el texto es vacío, se establece como "No due date"
    setDeadline(text.trim() === '' ? 'No due date' : text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Deadline</Text>
      <TextInput
        style={styles.input}
        value={deadline === 'No due date' ? '' : deadline}  // Mostrar vacío si es "No due date"
        onChangeText={handleDeadlineChange}
        placeholder="Enter a date or leave blank"
      />
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
});

export default EditTaskScreen;
