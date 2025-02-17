import {View, Text, Platform, StatusBar} from 'react-native';
import React, {FC} from 'react';
import {useStyles} from 'react-native-unistyles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useSharedState} from '@features/tabs/SharedContext';
import {homeStyles} from '@unistyles/homeStyles';
import HeaderSection from '@components/home/HeaderSection';

const DeliveryScreen: FC = () => {
  const insets = useSafeAreaInsets();
  const {styles} = useStyles(homeStyles);
  const {scrollY, scrollYGlobal} = useSharedState();

  const backgroundColorChanges = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollYGlobal.value,
      [0, 100],
      [0, 1],
      Extrapolate.CLAMP,
    );
    return {
      backgroundColor: `rgba(255,255,255,${opacity})`,
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Animated.View style={[{width: '100%'}]}>
        <Animated.View
          style={[
            backgroundColorChanges,
            styles.topHeader,
            {zIndex: 1, width: '100%'},
          ]}>
          <HeaderSection />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default DeliveryScreen;
