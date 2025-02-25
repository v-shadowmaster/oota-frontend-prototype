import {View, Text} from 'react-native';
import React, {Children, FC} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useAppSelector} from '@states/reduxHook';
import {useSharedState} from './SharedContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useStyles} from 'react-native-unistyles';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {Colors, screenHeight, screenWidth} from '@unistyles/Constants';
import ScalePress from '@components/ui/ScalePress';
import {DeliveryTabIcon, ProfileTabIcon, ReorderTabIcon} from './TabIcon';
import CartHOC from '@features/checkout/CartHOC';

const CustomTabBar: FC<BottomTabBarProps> = props => {
  const isVegMode = useAppSelector(state => state.user.isVegMode);
  const {scrollY} = useSharedState();
  const {state, navigation} = props;
  const bottom = useSafeAreaInsets();
  const {styles} = useStyles();

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = scrollY.value === 1 ? 100 : 0;
    return {
      transform: [{translateY: withTiming(translateY, {duration: 300})}],
      // Add height and position properties
      height: withTiming(translateY === 0 ? 'auto' : 0, {duration: 300}),
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    };
  });

  const indicatorStyle = useAnimatedStyle(() => {
    const baseLeft = 10;
    let slideValue = state.index == 2 ? 0.23 : 0.24;
    return {
      left: withTiming(baseLeft + state.index * screenWidth * slideValue),
    };
  });

  return (
    <>
      <CartHOC />
      <Animated.View
        style={[
          animatedStyle,
          {
            paddingBottom: bottom.bottom,
            backgroundColor: Colors.background,
            borderTopWidth: 1,
            borderTopColor: Colors.border,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          {state?.routes?.map((route, index) => {
            const isFocused = state.index == index;
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route?.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route?.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <ScalePress
                onPress={onPress}
                onLongPress={onLongPress}
                key={index}
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                {route?.name == 'Delivery' && (
                  <DeliveryTabIcon focused={isFocused} />
                )}
                {route?.name == 'Reorder' && (
                  <ReorderTabIcon focused={isFocused} />
                )}
                {route?.name == 'Profile' && (
                  <ProfileTabIcon focused={isFocused} />
                )}
              </ScalePress>
            );
          })}
        </View>
        <Animated.View
          style={[
            indicatorStyle,
            {backgroundColor: isVegMode ? Colors.active : Colors.primary},
          ]}
        />
      </Animated.View>
    </>
  );
};

export default CustomTabBar;
