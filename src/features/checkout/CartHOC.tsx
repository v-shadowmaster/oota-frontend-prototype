import {
  StyleSheet,
  Animated,
  Platform,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@states/reduxHook';
import {useSharedState} from '@features/tabs/SharedContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {clearAllCarts} from '@states/reducers/cartSlice';
import CustomText from '@components/global/CustomText';
import {Colors, screenHeight, screenWidth} from '@unistyles/Constants';
import Icon from '@components/ui/Icon';
import {BlurView} from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import CartItem from './CartItem';

const CartHOC: FC = () => {
  const dispatch = useAppDispatch();
  const carts = useAppSelector(state => state.cart.carts);
  const {scrollY} = useSharedState();
  const bottom = useSafeAreaInsets();
  const [isExpand, setIsExpanded] = useState(false);
  const totalCartsLength = carts?.length || 0;

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
    <Reanimated.View
      style={[
        isExpand ? styles.expandedCartContainer : styles.cartContainer,
        {paddingBottom: !isExpand ? bottom.bottom + 16 : bottom.bottom},
        animatedStyle,
      ]}>
      {/* "More" button for collapsed view with multiple carts */}
      {totalCartsLength > 1 && !isExpand && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setIsExpanded(true)}
          style={styles.moreButton}>
          <CustomText
            style={{top: -1, fontFamily: 'Poppins-Medium'}}
            color={Colors.active}
            fontSize={9}>
            + {totalCartsLength - 1} more
          </CustomText>
          <Icon
            iconFamily="Ionicons"
            name="caret-up-outline"
            color={Colors.active}
            size={10}
          />
        </TouchableOpacity>
      )}

      {/* iOS blur background for expanded view */}
      {Platform.OS === 'ios' && isExpand && (
        <BlurView style={styles.absolute} blurType="light" blurAmount={10} />
      )}

      {/* Close button for expanded view */}
      {isExpand && (
        <TouchableOpacity
          style={styles.closeIcon}
          onPress={() => setIsExpanded(false)}>
          <Icon iconFamily="Ionicons" name="close" size={16} color="#fff" />
        </TouchableOpacity>
      )}

      {isExpand ? (
        // EXPANDED VIEW
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.flexRowBetween}>
            <CustomText style={{fontFamily: 'Poppins-Medium'}} variant="h5">
              Your Carts ({totalCartsLength})
            </CustomText>
            <TouchableOpacity onPress={clearCart}>
              <CustomText
                fontSize={10}
                style={{fontFamily: 'Poppins-Bold'}}
                color={Colors.active}>
                Clear All
              </CustomText>
            </TouchableOpacity>
          </View>

          {/* List all cart items in expanded view */}
          {carts?.map((item, index) => (
            <View key={index} style={styles.expandedCartItemWrapper}>
              <CartItem item={item} />
            </View>
          ))}
        </ScrollView>
      ) : (
        // COLLAPSED VIEW - Stacked cart items
        <>
          {carts?.map((item, index) => {
            // Calculate proper stacking (last items first for proper z-index)
            const reverseIndex = totalCartsLength - 1 - index;
            const isTopItem = reverseIndex === 0;

            return (
              <View
                key={index}
                style={[
                  styles.collapsedCartItemWrapper,
                  {
                    transform: [
                      {scale: isTopItem ? 1 : 0.95 - reverseIndex * 0.02},
                    ],
                    top: reverseIndex * -4,
                    zIndex: 100 - reverseIndex,
                  },
                ]}>
                {isTopItem && <CartItem item={item} />}
              </View>
            );
          })}
        </>
      )}

      {/* Gradient overlay for collapsed view */}
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
          style={styles.linearGradient}
        />
      )}
    </Reanimated.View>
  );
};

export default CartHOC;

const styles = StyleSheet.create({
  expandedCartContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 9999,
  },
  cartContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 300,
    height: 110,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    padding: 8,
    overflow: 'hidden',
    zIndex: 999,
  },
  moreButton: {
    position: 'absolute',
    top: -20,
    right: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1000,
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
  closeIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1000,
    backgroundColor: Colors.active,
    borderRadius: 16,
    padding: 4,
  },
  scrollContainer: {
    paddingBottom: 20,
    width: '100%',
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  expandedCartItemWrapper: {
    width: '100%',
    marginBottom: 8,
  },
  collapsedCartItemWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    right: 0,
  },
  linearGradient: {
    position: 'absolute',
    width: '100%',
    height: 92,
    zIndex: -1,
    bottom: -20,
  },
});
