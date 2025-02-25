import {
  StyleSheet,
  Text,
  Animated,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@states/reduxHook';
import {useSharedState} from '@features/tabs/SharedContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {clearAllCarts} from '@states/reducers/cartSlice';
import CustomText from '@components/global/CustomText';
import {Colors, screenHeight, screenWidth} from '@unistyles/Constants';
import Icon from '@components/ui/Icon';
import {BlurView} from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';

const CartHOC: FC = () => {
  const dispatch = useAppDispatch();
  const carts = useAppSelector(state => state.cart.carts);
  const {scrollY} = useSharedState();
  const bottom = useSafeAreaInsets();
  const [isExpand, setIsExpanded] = useState(false);
  const totalCartsLength = carts?.length;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY:
          scrollY.value === 1
            ? withTiming(Platform.OS === 'ios' ? -15 : 0, {duration: 300})
            : withTiming(Platform.OS === 'ios' ? -90 : -100, {duration: 300}),
      },
    ],
  }));

  const clearCart = async () => {
    dispatch(clearAllCarts());
    setIsExpanded(false);
  };

  if (!totalCartsLength) return null;

  return (
    <Animated.View
      style={[
        isExpand ? styles.expandedCartContainer : styles.cartContainer,
        {
          paddingBottom: !isExpand ? bottom.bottom + 16 : 0,
        },
      ]}>
      {carts?.length > 1 && !isExpand && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setIsExpanded(true)}
          style={styles.moreButton}>
          <CustomText
            style={{top: -1, fontFamily: 'Poppins-Medium'}}
            color={Colors.active}
            fontSize={9}>
            + {carts?.length - 1} more
          </CustomText>

          <Icon
            iconFamily="Ionicons"
            name="caret-up-outline"
            color={Colors.active}
            size={10}
          />
        </TouchableOpacity>
      )}

      {Platform.OS === 'ios' && isExpand && (
        <BlurView style={styles.absolute} blurType="light" blurAmount={10} />
      )}

      {isExpand && <View style={styles.contentContainer} />}

      {isExpand && (
        <TouchableOpacity
          style={styles.closeIcon}
          onPress={() => setIsExpanded(false)}>
          <Icon iconFamily="Ionicons" name="close" size={16} color="#fff" />
        </TouchableOpacity>
      )}

      {isExpand ? null : <></>}

      {!isExpand && (
        <LinearGradient
          colors={[
            'rgba(255,255,255,0.1)',
            'rgba(255,255,255,1)',
            'rgba(255,255,255,1)',
            'rgba(255,255,255,1)',
            'rgba(255,255,255,0.98)',
            'rgba(255,255,255,1)',
          ]}
          style={{
            position: 'absolute',
            width: '100%',
            height: 92,
            zIndex: -1,
            bottom: -20,
          }}
        />
      )}
    </Animated.View>
  );
};

export default CartHOC;

const styles = StyleSheet.create({
  expandedCartContainer: {},
  cartContainer: {},
  moreButton: {},
  absolute: {},
  contentContainer: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: -2,
    bottom: -40,
    position: 'absolute',
  },
  closeIcon: {},
});
