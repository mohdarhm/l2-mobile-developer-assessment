// screens/EndScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const EndScreen = ({ navigation, route }) => {
  const { score } = route.params;

  const mainmenu = () => {
    navigation.navigate('StartScreen');
  };
  
  const playAgain = () => {
    navigation.navigate('GameScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Over</Text>
      <Text style={styles.score}>Final Score: {score}</Text>
      <Button title="Play Again" onPress={playAgain} />
      <Button title="Exit!!!!" onPress={mainmenu} />
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
  score: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default EndScreen;
