import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';

const Balloon = ({ initialPosition, onPop, onMiss }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [position] = useState(new Animated.Value(initialPosition)); // Initial position at the bottom of the screen
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const moveUpAnimation = Animated.timing(position, {
      toValue: -100, // Move to the top of the screen
      duration: 5000, // Duration for the animation (5 seconds)
      useNativeDriver: true, // Enable native driver for performance
    });

    const resetPositionAnimation = Animated.timing(position, {
      toValue: initialPosition, // Move back to the bottom of the screen
      duration: 0, // No duration for the reset animation
      useNativeDriver: true, // Enable native driver for performance
    });

    const loopedAnimation = Animated.sequence([moveUpAnimation, resetPositionAnimation]); // Animation sequence

    const loopedAnimationLoop = () => {
      if (isVisible) {
        Animated.loop(loopedAnimation).start(); // Start the looped animation
      }
    };

    loopedAnimationLoop(); // Start the looped animation initially

    return () => {
      // Clean up animation on unmount if needed
      loopedAnimation.stop();
    };
  }, []);

  const handlePop = () => {
    setIsVisible(false);
    onPop();
  };

  const handleMiss = () => {
    setIsVisible(false);
    onMiss(); // Call onMiss when the balloon is missed
  };

  if (!isVisible) {
    return null;
  }

  return (
    <TouchableOpacity onPress={handlePop} onLongPress={handleMiss} activeOpacity={1}>
      <Animated.View style={[styles.balloon, { transform: [{ translateY: position }] }]}>
        <Text style={styles.text}>🎈 placeholder balloon lmaoooo</Text> {/* Text-based balloon */}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  balloon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: 'lightblue',
  },
  text: {
    fontSize: 30,
  },
});

export default Balloon;
