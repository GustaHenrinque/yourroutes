import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
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
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, styles.activeFilter]}
            onPress={() => navigation.navigate('Todos')}
          >
            <Text style={styles.filterTextActive}>Todos</Text>
          </TouchableOpacity>
          
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
  logo: {
    alignSelf: 'flex-start', // Alinha a imagem para o canto esquerdo
    marginBottom: 0, // Reduz o espaço entre a logo e os elementos abaixo
    resizeMode: 'contain',
    width: 150,
    height: undefined,
    aspectRatio: 1,
  },
  searchAndFilterContainer: {
    marginTop: -10, // Move os elementos abaixo da logo um pouco mais para cima
    marginBottom: 10, // Espaço entre o conjunto de pesquisa e navegação
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
    marginBottom: 10, // Espaço entre a barra de pesquisa e os botões de navegação
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    backgroundColor: '#fff', // Fundo branco
    borderRadius: 20,
    borderWidth: 1, // Adiciona borda
    borderColor: 'gray', // Cor da borda cinza
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  activeFilter: {
    backgroundColor: '#000',
    borderWidth: 1, // Adiciona borda
    borderColor: 'gray', // Cor da borda cinza
  },
  filterText: {
    color: 'gray',
    fontSize: 14,
  },
  filterTextActive: {
    color: '#fff',
    fontSize: 14,
  },
});
