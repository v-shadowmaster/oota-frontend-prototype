import React, {useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';
import {resetAndNavigate} from '@utils/NavigationUtils';

const SplashScreen = () => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      resetAndNavigate('LoginScreen');
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.logoWrapper}>
        {/* First line in Bold */}
        <Text style={styles.lineBold}>oota</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

//rgb(11, 146, 69)
//rgb(239, 255, 119)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(239, 255, 119)', // Matches the requested color code
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
  },
  lineBold: {
    fontFamily: 'Poppins-Bold', // Ensure you've linked "Poppins-Bold"
    fontSize: 72,
    color: '#000', // Black text, similar to Uber Eats style
  },
});
