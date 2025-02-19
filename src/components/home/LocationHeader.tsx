import {View, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles';
import {useSharedState} from '@features/tabs/SharedContext';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import Icon from '@components/ui/Icon';
import CustomText from '@components/global/CustomText';

const LocationHeader = () => {
  const {scrollYGlobal} = useSharedState();
  const {styles} = useStyles(homeStyles);
  const textColor = '#fff';

  const opacityFadingStyles = useAnimatedStyle(() => {
    const opacity = interpolate(scrollYGlobal.value, [0, 80], [1, 0]);
    return {
      opacity: opacity,
    };
  });

  return (
    <Animated.View style={[opacityFadingStyles, {paddingTop: 10}]}>
      <SafeAreaView />
      <View style={styles.flexRowBetween}>
        <View style={styles.flexRowGap}>
          <Icon
            name="map-marker"
            color={textColor}
            iconFamily="MaterialCommunityIcons"
            size={32}
          />

          <View>
            <TouchableOpacity style={styles.flexRow}>
              <CustomText
                variant="h5"
                color={textColor}
                fontFamily="Poppins-Bold"
                style={{fontFamily: 'Poppins-Bold'}}>
                #43 Kammasandra
              </CustomText>
              <Icon
                name="chevron-down"
                color={textColor}
                iconFamily="MaterialCommunityIcons"
                size={18}
              />
            </TouchableOpacity>

            <CustomText
              color={textColor}
              fontFamily="Poppins-Medium"
              style={{fontFamily: 'Poppins-Medium'}}>
              Bengaluru , Karnakaka
            </CustomText>
          </View>
        </View>

        <View style={styles.flexRowGap}>
          <TouchableOpacity style={styles.translation}>
            <Image
              source={require('@assets/images/translate.jpg')}
              style={styles.translationIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.profileAvatar}>
            <Image
              source={require('@assets/images/profile.jpg')}
              style={styles.profileAvatar}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default LocationHeader;
