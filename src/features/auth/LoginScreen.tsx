import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {FC, useState} from 'react';
import {loginStyles} from '@unistyles/authStyles';
import {useStyles} from 'react-native-unistyles';
import Animated from 'react-native-reanimated';
import CustomText from '@components/global/CustomText';
import BreakerText from '@components/ui/BreakerText';
import PhoneInput from '@components/ui/PhoneInput';
import {resetAndNavigate} from '@utils/NavigationUtils';

const LoginScreen: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const {styles} = useStyles(loginStyles);

  const handleLogin = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      resetAndNavigate('UserBottomTab');
    }, 2000);
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Image
        source={require('@assets/images/login.jpg')}
        style={styles.cover}
      />
      <Animated.ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.bottomContainer}>
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
              style={{fontFamily: 'Poppins-Medium'}}
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
