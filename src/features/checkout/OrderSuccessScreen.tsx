import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SoundPlayer from 'react-native-sound-player';
import {replace, resetAndNavigate} from '@utils/NavigationUtils';
import {Colors, screenWidth} from '@unistyles/Constants';
import LottieView from 'lottie-react-native';
import CustomText from '@components/global/CustomText';
import {useRoute} from '@react-navigation/native';

const OrderSuccessScreen = () => {
  const route = useRoute() as any;
  const restaurant = route?.params?.restaurant;
  useEffect(() => {
    try {
      SoundPlayer.playAsset(require('@assets/sfx/sss.mp3'));
    } catch (e) {
      console.log('cannot play the sound file', e);
    }

    const timeoutId = setTimeout(() => {
      replace('UserBottomTab');
    }, 2300);

    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <View style={styles.container}>
      <LottieView
        source={require('@assets/animations/confirm.json')}
        autoPlay
        duration={2000}
        loop={false}
        speed={1}
        style={styles.lottieView}
        enableMergePathsAndroidForKitKatAndAbove={true}
        hardwareAccelerationAndroid
      />
      <CustomText
        style={[styles.orderPlacedText, {fontFamily: 'Poppins-Bold'}]}
        fontSize={12}>
        ORDER PLACED
      </CustomText>
      <View style={[styles.deliveryContainer]}>
        <CustomText
          variant="h4"
          fontFamily="Poppins-Bold"
          style={styles.deliveryContainer}>
          Delivery to Home
        </CustomText>
      </View>
      <CustomText
        fontSize={12}
        style={[styles.addressText, {fontFamily: 'Poppins-Regular'}]}>
        Kammasandra , KR Puram
      </CustomText>
    </View>
  );
};

export default OrderSuccessScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  lottieView: {
    width: screenWidth * 0.6,
    height: 150,
  },
  orderPlacedText: {opacity: 0.4},
  deliveryContainer: {
    borderBottomWidth: 2,
    paddingBottom: 4,
    marginBottom: 5,
    borderColor: Colors.active,
  },
  deliveryText: {
    marginTop: 15,
    borderColor: Colors.active,
  },
  addressText: {
    opacity: 0.8,
  },
});
