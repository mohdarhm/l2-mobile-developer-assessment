// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import EndScreen from './screens/EndScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
        <Stack.Screen name="EndScreen" component={EndScreen} />
      </Stack.Navigator>
  );
};

export default App;
