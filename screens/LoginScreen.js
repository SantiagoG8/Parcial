import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { showMessage } from 'react-native-flash-message';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      return showMessage({
        message: "Campos vacíos",
        description: "Por favor ingresa email y contraseña.",
        type: "warning",
      });
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      showMessage({
        message: "Inicio de sesión exitoso",
        type: "success",
      });
      navigation.replace('Home');
    } catch (error) {
      showMessage({
        message: "Login failed",
        description: error.message,
        type: "danger",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 },
  link: { marginTop: 10, color: 'blue', textAlign: 'center' },
});
