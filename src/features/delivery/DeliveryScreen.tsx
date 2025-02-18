// DeliveryScreen.tsx
import {View, Platform, StatusBar} from 'react-native';
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
import Graphics from '@components/home/Graphics';
import MainList from '@components/List/MainList';
import MainList1 from '@components/List/MainList1';

const DeliveryScreen: FC = () => {
  const insets = useSafeAreaInsets();
  const {styles} = useStyles(homeStyles);
  const {scrollYGlobal} = useSharedState();

  const backgroundColorChanges = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollYGlobal.value,
      [0, 100],
      [0, 1],
      Extrapolate.CLAMP,
    );
    return {
      backgroundColor: opacity === 1 ? '#fff' : 'transparent',
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollYGlobal.value,
      [0, 100],
      [0, -50],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{translateY}],
      zIndex: 2,
    };
  });

  return (
    <View style={[styles.container, {paddingTop: 0}]}>
      <StatusBar translucent backgroundColor="transparent" />

      <Animated.View
        style={[
          styles.graphicsWrapper,
          {marginTop: Platform.OS === 'ios' ? insets.top : 0},
        ]}>
        <Graphics />
      </Animated.View>

      <Animated.View
        style={[
          headerAnimatedStyle,
          backgroundColorChanges,
          styles.headerWrapper,
          {marginTop: Platform.OS === 'ios' ? insets.top : 0},
        ]}>
        <HeaderSection />
      </Animated.View>

      <MainList />
    </View>
  );
};

export default DeliveryScreen;
