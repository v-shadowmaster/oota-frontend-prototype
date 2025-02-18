import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {FC} from 'react';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles';
import {useSharedState} from '@features/tabs/SharedContext';
import Animated, {useAnimatedStyle, interpolate} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '@components/ui/Icon';
import CustomText from '@components/global/CustomText';

const LocationHeader: FC = () => {
  const {scrollYGlobal} = useSharedState();
  const {styles} = useStyles(homeStyles);
  const textColor = '#fff'; // Zomato red color

  const opacityFadingStyles = useAnimatedStyle(() => {
    const opacity = interpolate(scrollYGlobal.value, [0, 80], [1, 0]);
    return {
      opacity: opacity,
    };
  });

  return (
    <Animated.View style={[opacityFadingStyles]}>
      <SafeAreaView />
      <View style={styles.flexRowBetween}>
        <View style={styles.flexRowGap}>
          <Icon
            name="map-marker"
            color="#fff"
            iconFamily="MaterialCommunityIcons"
            size={28}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.flexRowGap}>
            <CustomText
              variant="h5"
              color={textColor}
              fontFamily="Poppins-Bold">
              KR Puram, Bengaluru
            </CustomText>
            <Icon
              name="chevron-down"
              color="#fff"
              iconFamily="MaterialCommunityIcons"
              size={20}
            />
          </TouchableOpacity>

          <CustomText color={textColor} fontFamily="Poppins-Bold">
            Karnataka, India
          </CustomText>
        </View>

        <View style={styles.flexRowGap}>
          <TouchableOpacity style={styles.profileAvatar}>
            <Image
              source={require('@assets/images/profile.jpg')}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
                borderRadius: 20,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default LocationHeader;
