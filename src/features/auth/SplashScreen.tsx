import {Platform, StatusBar, StyleSheet, View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useStyles} from 'react-native-unistyles';
import {splashStyles} from '@unistyles/authStyles';
import {resetAndNavigate} from '@utils/NavigationUtils';
import Animated, {FadeInDown} from 'react-native-reanimated';

const SplashScreen = () => {
  const {styles} = useStyles(splashStyles);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      resetAndNavigate('UserBottomTab');
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Image
        source={require('@assets/images/logo.png')}
        style={styles.logoImage}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
