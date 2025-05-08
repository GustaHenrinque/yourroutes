import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Index from '../screens/index';
import SplashScreen from '../screens/SplashScreen';
import Perfil from '../screens/perfil'; // Certifique-se de que o caminho está correto

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
              size={28}
              color="white"
              style={{ marginBottom: -10 }}
            />
          );
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'black',
          height: 80,
          paddingHorizontal: 50,
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
      <Stack.Screen name="Index" component={TabNavigator} />
    </Stack.Navigator>
  );
}