import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Pluggy from '../pluggy/pluggy';
import Main from '../main/main';

export default function Home() {
    const Stack = createStackNavigator();

    return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Pluggy" component={Pluggy} />
    </Stack.Navigator>
  );
}