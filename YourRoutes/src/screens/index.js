import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.searchAndFilterContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="gray" />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar"
            placeholderTextColor="gray"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 30, // Reduz o espaço superior
  },
  searchAndFilterContainer: {
    marginTop: -10, // Move os elementos abaixo da logo um pouco mais para cima
    marginBottom: 10, // Espaço entre a barra de pesquisa e o resto
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', // Fundo branco
    borderRadius: 10,
    borderWidth: 1, // Adiciona borda
    borderColor: 'gray', // Cor da borda cinza
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10, // Espaço entre a barra de pesquisa e outros elementos
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
  },
});
