import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Login from '../screens/login';
import Register from '../screens/register';
import Index from '../screens/index';
import SplashScreen from '../screens/SplashScreen'; // Certifique-se de que o caminho está correto
import Perfil from '../screens/perfil';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Index') {
            iconName = 'map-pin'; // Ícone de localização
          } else if (route.name === 'Perfil') {
            iconName = 'user'; // Ícone de perfil
          }

          return (
            <Feather
              name={iconName}
              size={28} // Aumentar o tamanho dos ícones
              color="white" // Ícones brancos
              style={{ marginBottom: -10 }} // Move os ícones mais para baixo
            />
          );
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'black', // Cor preta
          height: 80, // Altura maior
          paddingHorizontal: 50, // Reduzir o espaçamento horizontal
        },
      })}
    >
       <Tab.Screen name="Index" component={Index} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Index" component={TabNavigator} />
    </Stack.Navigator>
  );
}