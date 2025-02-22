import CustomText from '@components/global/CustomText';
import Icon from '@components/ui/Icon';
import {FC, memo} from 'react';
import {View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
} from 'react-native-reanimated';

interface TabProps {
  name: string;
}

interface IconProp {
  focused: boolean;
}

// X-inspired dark color scheme
const colors = {
  active: '#0F1419', // X Black for active state
  inactive: '#536471', // X Gray for inactive
};

const TabIcon: FC<TabProps & {focused: boolean}> = memo(({name, focused}) => {
  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSequence(
            withSpring(focused ? 1.2 : 1, {
              damping: 12,
              stiffness: 120,
            }),
            withDelay(
              100,
              withSpring(focused ? 1 : 1, {
                damping: 10,
                stiffness: 100,
              }),
            ),
          ),
        },
        {
          translateY: withSpring(focused ? -2 : 0, {
            damping: 10,
            stiffness: 100,
          }),
        },
      ],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(focused ? -1 : 0, {
            damping: 10,
            stiffness: 100,
          }),
        },
      ],
      opacity: withTiming(focused ? 1 : 0.8, {
        duration: 200,
      }),
    };
  });

  const getIconName = () => {
    switch (name) {
      case 'Delivery':
        return {
          active: 'truck-delivery',
          inactive: 'truck-delivery-outline',
        };
      case 'Reorder':
        return {
          active: 'clock-time-four',
          inactive: 'clock-time-four-outline',
        };
      case 'Profile':
        return {
          active: 'account',
          inactive: 'account-outline',
        };
      default:
        return {
          active: 'home',
          inactive: 'home-outline',
        };
    }
  };

  const icons = getIconName();

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}>
      <Animated.View style={iconAnimatedStyle}>
        <Icon
          iconFamily="MaterialCommunityIcons"
          name={focused ? icons.active : icons.inactive} 
          size={26}
          color={focused ? colors.active : colors.inactive}
        />
      </Animated.View>
      <Animated.View style={textAnimatedStyle}>
        <CustomText
          style={{
            fontSize: 13,
            color: focused ? colors.active : colors.inactive,
            fontFamily: focused ? 'Poppins-Bold' : 'Poppins-Medium',
          }}>
          {name}
        </CustomText>
      </Animated.View>
    </View>
  );
});

export const DeliveryTabIcon: FC<IconProp> = memo(({focused}) => (
  <TabIcon name="Delivery" focused={focused} />
));

export const ReorderTabIcon: FC<IconProp> = memo(({focused}) => (
  <TabIcon name="Reorder" focused={focused} />
));

export const ProfileTabIcon: FC<IconProp> = memo(({focused}) => (
  <TabIcon name="Profile" focused={focused} />
));

export default {
  DeliveryTabIcon,
  ReorderTabIcon,
  ProfileTabIcon,
};
