import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Login from '../screens/login';
import Register from '../screens/register';
import Index from '../screens/index';
import Rotas from '../screens/rotas';
import SplashScreen from '../screens/SplashScreen'; // Certifique-se de que o caminho está correto

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'Index') {
            iconName = 'home';
          } else if (route.name === 'Rotas') {
            iconName = 'map';
          }

          return (
            <Feather
              name={iconName}
              size={focused ? 24 : 20}
              color={focused ? 'black' : color}
            />
          );
        },
        tabBarActiveTintColor: '#333',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Index" component={Index} />
      <Tab.Screen name="Rotas" component={Rotas} />
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
