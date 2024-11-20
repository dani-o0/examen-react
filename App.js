import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TaskListScreen from './screens/TaskListScreen';
import CreateNewTaskScreen from './screens/CreateNewTaskScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'Task List' }} />
        <Stack.Screen name="CreateNewTask" component={CreateNewTaskScreen} options={{ title: 'Add New Task' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
