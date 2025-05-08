// src/screens/perfil.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Perfil() {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEdit = () => setIsEditing(!isEditing);
  const handleSave = () => {
    setIsEditing(false);
    alert('Perfil atualizado com sucesso!');
  };
  const goToMap = () => navigation.navigate('Index'); // navega para a aba “Index”

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Ionicons name="person-circle-outline" size={150} color="black" />
      </View>

      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
            placeholder="Nome de usuário"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="E-mail"
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.email}>{email}</Text>
        </>
      )}

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleEdit}>
          <Ionicons name={isEditing ? "close-outline" : "create-outline"} size={24} color="black" />
          <Text style={styles.actionText}>{isEditing ? "Cancelar" : "Editar Perfil"}</Text>
        </TouchableOpacity>

        {/* Novo botão para ir ao mapa */}
        <TouchableOpacity style={styles.mapButton} onPress={goToMap}>
          <Ionicons name="map-pin" size={24} color="white" />
          <Text style={styles.mapButtonText}>Ver Mapa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:       { flex:1, backgroundColor:'#fff', alignItems:'center', justifyContent:'center', padding:20 },
  avatarContainer: { marginBottom:30 },
  userName:        { fontSize:24, fontWeight:'bold', color:'#000', marginBottom:10 },
  email:           { fontSize:18, color:'gray', marginBottom:40 },
  actionsContainer:{ width:'100%', alignItems:'center' },
  actionButton:    { flexDirection:'row', alignItems:'center', marginBottom:20 },
  actionText:      { color:'#000', fontSize:18, marginLeft:10 },
  input:           { width:'100%', borderWidth:1,borderColor:'gray',borderRadius:5,padding:10,marginBottom:20,fontSize:16 },
  saveButton:      { backgroundColor:'#ccc',padding:10,borderRadius:5,marginBottom:20 },
  saveButtonText:  { color:'#000',fontSize:18,textAlign:'center' },
  mapButton:       {
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#007AFF',
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius:8,
  },
  mapButtonText:   { color:'#fff', fontSize:16, marginLeft:8 },
});
