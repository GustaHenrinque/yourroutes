import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      // Salvar os dados no Firestore na coleção 'users'
      await addDoc(collection(db, 'users'), {
        name: name,
        email: email,
        password: password, // Evite salvar senhas em texto puro em produção
        createdAt: new Date(),
      });

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login'); // Navegar para a tela de login
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Image source={require('../../assets/logo.jpeg')} style={styles.logo} />
      <Text style={styles.subtitle}>Cadastre-se</Text>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={name}
        onChangeText={setName}
        placeholderTextColor="gray"
      />
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
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
});
