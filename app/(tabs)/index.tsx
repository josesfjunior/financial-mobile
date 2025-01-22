import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './login/login';
import Cadastro from './cadastro/cadastro';
import Steps from './borading/steps';
import Home from './home/home';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Steps" screenOptions={{
      headerShown: false, // Oculta o cabeçalho em todas as telas
    }}>
      <Stack.Screen name="Steps" component={Steps} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center',     // Centraliza horizontalmente
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});
