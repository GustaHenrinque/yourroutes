import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const q = query(
        collection(db, 'users'),
        where('email', '==', email),
        where('password', '==', password) // Evite usar senhas em texto puro em produção
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.replace('Index'); // Navegar para a tela principal
      } else {
        Alert.alert('Erro', 'Email ou senha inválidos.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Image source={require('../../assets/logo.jpeg')} style={styles.logo} />
      <Text style={styles.subtitle}>Faça login para continuar</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="gray"
      />
      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="gray"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  logo: {
    width: '100%',
    height: 200,
    aspectRatio: 235 / 39,
    alignSelf: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    fontSize: 16,
    color: 'black',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
});
