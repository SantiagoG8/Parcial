import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Title is required');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
    };

    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];
      tasks.push(newTask);
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      navigation.goBack();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button title="Save Task" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 8,
  },
});
