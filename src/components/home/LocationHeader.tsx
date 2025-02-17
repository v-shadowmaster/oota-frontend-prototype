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
  const textColor = '#E23744'; // Zomato red color

  const opacityFadingStyles = useAnimatedStyle(() => {
    const opacity = interpolate(scrollYGlobal.value, [0, 80], [1, 0]);
    return {
      opacity: opacity,
    };
  });

  return (
    <Animated.View style={[opacityFadingStyles, {backgroundColor: '#fff'}]}>
      <View style={styles.flexRowBetween}>
        <View style={styles.flexRowGap}>
          <Icon
            name="map-marker"
            color="#000"
            iconFamily="MaterialCommunityIcons"
            size={38}
          />
          <View style={styles.locationTextContainer}>
            <TouchableOpacity>
              <View style={styles.locationMainRow}>
                <CustomText
                  style={[
                    styles.locationMainText,
                    {fontFamily: 'Poppins-Bold', fontSize: 20},
                  ]}>
                  KR Puram, Bengaluru
                </CustomText>
                <Icon
                  name="chevron-down"
                  color="#000"
                  iconFamily="Ionicons"
                  size={20}
                />
              </View>
              <CustomText
                style={[
                  styles.locationSubText,
                  {fontFamily: 'Poppins-Medium', fontSize: 16, color: 'gray'},
                ]}>
                Karnataka, India
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.profileAvatar}>
          <Image
            source={require('@assets/images/profile.jpg')}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default LocationHeader;
