import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {loginStyles} from '@unistyles/authStyles';
import {useStyles} from 'react-native-unistyles';

import CustomText from '@components/global/CustomText';
import BreakerText from '@components/ui/BreakerText';
import PhoneInput from '@components/ui/PhoneInput';
import {resetAndNavigate} from '@utils/NavigationUtils';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';
import GetLocation from 'react-native-get-location';

const LoginScreen: FC = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const keyboardOffsetHeight = useKeyboardOffsetHeight();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const {styles} = useStyles(loginStyles);

  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState<any>(null);
  const [longitude, setLongitude] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (keyboardOffsetHeight == 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.25,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [keyboardOffsetHeight]);

  const handleLogin = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      resetAndNavigate('UserBottomTab');
    }, 2000);
  };
  return (
    <View style={[styles.container, {flex: 1}]}>
      <StatusBar hidden={true} />
      <Image
        source={require('@assets/images/login.jpg')}
        style={styles.cover}
      />
      <Animated.ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        style={[{flex: 1}, {transform: [{translateY: animatedValue}]}]}
        contentContainerStyle={[
          styles.bottomContainer,
          {
            paddingBottom: keyboardOffsetHeight
              ? keyboardOffsetHeight + 20
              : 20,
          },
        ]}>
        <CustomText
          fontFamily="Poppins-Bold"
          variant="h2"
          style={(styles.title, {fontFamily: 'Poppins-Bold'})}>
          India's #1 Food Delivery and Dining App
        </CustomText>
        <BreakerText text="Login or Signup" />
        <PhoneInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          onFocus={() => {}}
          onBlur={() => {}}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          disabled={loading}
          onPress={handleLogin}
          activeOpacity={0.8}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <CustomText
              color="#fff"
              style={{fontFamily: 'Poppins-Bold'}}
              variant="h5">
              Continue
            </CustomText>
          )}
        </TouchableOpacity>
      </Animated.ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
