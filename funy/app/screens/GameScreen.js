import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Balloon from '../components/Balloon';

const GameScreen = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(120);
  const [balloonsPopped, setBalloonsPopped] = useState(0);
  const [balloonsMissed, setBalloonsMissed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(timer);
          navigation.navigate('EndScreen', { score, balloonsPopped, balloonsMissed }); // Navigate to EndScreen with the final score and counts
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePop = () => {
    setScore(score + 2);
    setBalloonsPopped(balloonsPopped + 1);
  };

  const handleMiss = () => {
    setScore(score - 1);
    setBalloonsMissed(balloonsMissed + 1);
  };

  const exitGame = () => {
    const confirmExit = () => {
      if (Platform.OS === 'web') {
        const confirmed = window.confirm('Are you sure you want to exit the game?');
        if (confirmed) {
          navigation.navigate('EndScreen', { score, balloonsPopped, balloonsMissed });
        }
      } else {
        Alert.alert(
          'Exit Game',
          'Are you sure you want to exit the game?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Exit', onPress: () => navigation.navigate('EndScreen', { score, balloonsPopped, balloonsMissed }) },
          ],
          { cancelable: false }
        );
      }
    };

    confirmExit();
  };

  const playAgain = () => {
    setScore(0);
    setSeconds(120);
    setBalloonsPopped(0);
    setBalloonsMissed(0);
    navigation.navigate('GameScreen');
  };

  return (
    <View style={styles.container}>
      {[...Array(10)].map((_, index) => (
        <Balloon
          key={index}
          initialPosition={500 + index * 50}
          onPop={handlePop}
          onMiss={handleMiss}
        />
      ))}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <Text style={styles.scoreText}>Balloons Popped: {balloonsPopped}</Text>
        <Text style={styles.scoreText}>Balloons Missed: {balloonsMissed}</Text>
      </View>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>Time: {formatTime(seconds)}</Text>
      </View>
      <Button title="Exit Game" onPress={exitGame} />

    </View>
  );
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Set background color for visibility
  },
  scoreContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  timerContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default GameScreen;
