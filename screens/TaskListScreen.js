import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, Button } from 'react-native';
import { CheckBox } from 'react-native-elements';

const TaskListScreen = ({ navigation, route }) => {
  const [tasks, setTasks] = useState([
  ]);

  useEffect(() => {
    if (route.params?.newTask) {
      setTasks([...tasks, route.params.newTask]);
    }
  }, [route.params?.newTask]);

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () =>
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)),
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
      <Text
        style={[
          styles.taskTitle,
          item.completed && styles.taskCompleted,
        ]}
      >
        {item.deadline
          ? `${item.title}\n${item.deadline}`
          : item.title}
      </Text>
      <Button
        title="Delete"
        color="red"
        onPress={() => deleteTask(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Button
        title="Add New Task"
        onPress={() => navigation.navigate('CreateNewTask')}
      />
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
});

export default TaskListScreen;
