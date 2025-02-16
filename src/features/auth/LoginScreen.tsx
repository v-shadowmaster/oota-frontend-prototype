import {Platform, StatusBar, StyleSheet, Text, View, Image} from 'react-native';
import React, {FC} from 'react';
import {loginStyles} from '@unistyles/authStyles';
import {useStyles} from 'react-native-unistyles';
import Animated from 'react-native-reanimated';
import CustomText from '@components/global/CustomText';

const LoginScreen: FC = () => {
  const {styles} = useStyles(loginStyles);
  return (
    <View style={styles.container}>
      <StatusBar hidden={Platform.OS !== 'android'} />
      <Image
        source={require('@assets/images/login.png')}
        style={styles.cover}
      />
      <Animated.ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.bottomContainer}></Animated.ScrollView>

      <CustomText></CustomText>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
