// screens/StartScreen.js
import React from 'react';
import { Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet } from 'react-native';

const StartScreen = ({ navigation }) => {
  const startGame = () => {
    navigation.navigate('GameScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>pop ze balloon</Text>
      <Button type="outline" title="Start" onPress={startGame} />
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default StartScreen;
