import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

const CreateNewTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [hasDueDate, setHasDueDate] = useState(false);

  const handleAddTask = () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Title is required to add a task.');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      deadline: hasDueDate && deadline.trim() ? deadline : 'No due date',
      completed: false,
    };

    navigation.navigate('TaskList', { newTask });
  };

  return (
    <View style={styles.container}>
      <Text>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
      />
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <CheckBox
          checked={hasDueDate}
          onPress={() => setHasDueDate(!hasDueDate)}
          containerStyle={styles.checkboxContainer}
        />
        <Text>Has due date?</Text>
      </View>
        <Text>Deadline:</Text>
            <TextInput
            style={styles.input}
            value={deadline}
            onChangeText={setDeadline}
            placeholder="Enter deadline (YYYY-MM-DD)"
            editable={hasDueDate}
            selectTextOnFocus={hasDueDate}
        />
      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
  },
  checkboxContainer: {
    marginVertical: 8,
    padding: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
});

export default CreateNewTaskScreen;
