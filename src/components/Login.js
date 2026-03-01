// Documentación interna: Pantalla de login. POST /auth/login, guarda en Redux/AsyncStorage.
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import { API_URL } from './config/config';
import { styles } from '../styles/style';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { username, password });
      dispatch(setUser({ user: { username }, token: res.data.token }));
      navigation.navigate('Products');
    } catch (err) {
      Alert.alert('Error', 'Credenciales inválidas. Prueba: mor_2314 / 83r5^_');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fake Store</Text>
      <TextInput style={{ ...styles.input || { borderWidth: 1, padding: 12, margin: 10, borderRadius: 8 } }} placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput style={{ ...styles.input || { borderWidth: 1, padding: 12, margin: 10, borderRadius: 8 } }} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;