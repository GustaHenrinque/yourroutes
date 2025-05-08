// src/screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      // vai para o TabNavigator, que agora inicia em “Perfil”
      navigation.replace('Index');
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.jpeg')} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff' },
  logo:      { width:200, height:200, aspectRatio:235/39, borderRadius:20 },
});
