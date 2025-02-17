import {View, Platform} from 'react-native';
import React from 'react';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles';
import LottieView from 'lottie-react-native';
import {useSharedState} from '@features/tabs/SharedContext';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

const Graphics = () => {
  const {styles} = useStyles(homeStyles);
  const {scrollYGlobal} = useSharedState();
  const animationRef = React.useRef<LottieView>(null);

  React.useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollYGlobal.value, [0, 100], [1, 0.9]);
    const opacity = interpolate(scrollYGlobal.value, [0, 100], [1, 0]);

    return {
      transform: [{scale}],
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.lottieContainer, animatedStyle]}>
      <LottieView
        ref={animationRef}
        style={styles.lottie}
        source={require('@assets/animations/pongal.json')}
        autoPlay
        loop
        speed={0.5}
        resizeMode="cover"
        renderMode="HARDWARE"
        hardwareAccelerationAndroid
      />
    </Animated.View>
  );
};

export default Graphics;
