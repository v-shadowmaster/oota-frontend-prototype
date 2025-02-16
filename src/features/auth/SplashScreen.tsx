import {Platform, StatusBar, StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useStyles} from 'react-native-unistyles';
import {splashStyles} from '@unistyles/authStyles';
import {resetAndNavigate} from '@utils/NavigationUtils';
import Animated, {FadeInDown} from 'react-native-reanimated';

useEffect(() => {
  const timeoutId = setTimeout(() => {
    resetAndNavigate('LoginScreen');
  }, 3000);

  return () => clearTimeout(timeoutId);
}, []);

const SplashScreen = () => {
  const {styles} = useStyles(splashStyles);
  return (
    <View style={styles.container}>
      <StatusBar hidden={Platform.OS !== 'android'} />
      <Image
        source={require('@assets/images/logo.png')}
        style={styles.logoImage}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
