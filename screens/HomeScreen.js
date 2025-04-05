import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const isFocused = useIsFocused(); 
  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused) {
      loadTasks();
    }
  }, [isFocused]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const toggleComplete = async (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = async (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity
        style={[styles.checkbox, item.completed && styles.checked]}
        onPress={() => toggleComplete(item.id)}
      />
      <View style={styles.taskTextContainer}>
        <Text style={item.completed ? styles.completedText : styles.taskTitle}>
          {item.title}
        </Text>
        <Text>{item.description}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.delete}>❌</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No tasks yet</Text>}
      />
      <Button title="Add Task" onPress={() => navigation.navigate('AddTask')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#333',
    marginRight: 12,
    borderRadius: 4,
  },
  checked: {
    backgroundColor: 'green',
  },
  taskTextContainer: {
    flex: 1,
  },
  taskTitle: {
    fontWeight: 'bold',
  },
  completedText: {
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  delete: {
    marginLeft: 10,
    fontSize: 18,
  },
});
