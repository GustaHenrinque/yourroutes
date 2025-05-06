import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Alterado para redirecionar para "Login"
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.jpeg')
     } style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200, // Largura 100%
    height: 200, // Altura proporcional
    aspectRatio: 235 / 39, // Mantém a proporção original
    borderRadius: 20,
  },
});
