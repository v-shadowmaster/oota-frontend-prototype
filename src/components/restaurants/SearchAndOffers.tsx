import {StyleSheet, Text, TouchableOpacity, View, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles';
import {useAppSelector} from '@states/reduxHook';
import {selectRestaurantCart} from '@states/reducers/cartSlice';
import Icon from '@components/ui/Icon';
import {Colors} from '@unistyles/Constants';
import CustomText from '@components/global/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import {navigate} from '@utils/NavigationUtils';
import AnimatedNumber from 'react-native-animated-numbers';

const searchItems: string[] = [
  'samosa',
  'cake',
  'ice cream',
  'pizza',
  'biryani',
  'chicken nuggets',
];

const SearchAndOffers: React.FC<{item: any}> = ({item}) => {
  const {styles} = useStyles(homeStyles);
  const cart = useAppSelector(selectRestaurantCart(item?.id));
  const [searchSuggestion, setSearchSuggestion] = useState(searchItems[0]);

  // useRef to track the current index for search suggestions
  const countRef = useRef(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      countRef.current = (countRef.current + 1) % searchItems.length;
      setSearchSuggestion(searchItems[countRef.current]);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const summary = React.useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        acc.totalPrice += item?.cartPrice || 0;
        acc.totalItems += item?.quantity;
        return acc;
      },
      {totalPrice: 0, totalItems: 0},
    );
  }, [cart]);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const scalAnim = useRef(new Animated.Value(1)).current;
  const [showOffer, setShowOffer] = useState(summary.totalItems > 0);
  const [showConfetti, setShowConfetti] = useState(false);
  const hasShowCongrats = useRef(false);

  useEffect(() => {
    if (summary?.totalItems > 0) {
      setShowOffer(true);
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setShowOffer(false));
    }

    if (
      summary?.totalPrice > 500 &&
      !showConfetti &&
      !hasShowCongrats.current
    ) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scalAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(scalAnim, {
            toValue: 1.2,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
        {iterations: 2},
      ).start(() => {
        setShowConfetti(true);
        hasShowCongrats.current = true;
      });
    } else if (summary?.totalPrice <= 500) {
      setShowConfetti(false);
      hasShowCongrats.current = false;
      scalAnim.setValue(1);
    }
  }, [summary.totalItems, summary.totalPrice]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  return (
    <View style={[styles.searchOfferWrapper, {zIndex: 100}]}>
      {/* Top Row: Search Bar and Menu */}
      <View style={[styles.flexRowBetween, styles.padding]}>
        <TouchableOpacity
          style={[styles.searchInputContainer, {flex: 1, marginRight: 10}]}
          activeOpacity={0.8}>
          <View style={{marginRight: 8}}>
            <Icon
              iconFamily="Ionicons"
              name="search"
              color={Colors.active}
              size={20}
            />
          </View>
          <CustomText
            fontFamily="Poppins-Medium"
            fontSize={14}
            style={styles.rollingText}>
            {`Search "${searchSuggestion}"`}
          </CustomText>
        </TouchableOpacity>
        {/* Updated Menu Button: Colors adjusted for visibility */}
        <TouchableOpacity
          style={[
            styles.flexRowGap,
            {
              minWidth: 80,
              backgroundColor: '#000',
              padding: 6,
              borderRadius: 12,
            },
          ]}
          activeOpacity={0.8}>
          <Icon
            iconFamily="MaterialCommunityIcons"
            name="silverware-fork-knife"
            color="#fff"
            size={20}
          />
          <CustomText
            color="#fff"
            fontSize={14}
            style={{fontFamily: 'Poppins-Bold'}}>
            Menu
          </CustomText>
        </TouchableOpacity>
      </View>
      {/* Offer Banner */}
      {showOffer && (
        <Animated.View
          style={[{transform: [{translateY}], zIndex: 2, marginBottom: 10}]}>
          <LinearGradient
            colors={
              showConfetti ? ['#3a7bd5', '#3a6073'] : ['#e9425e', '#9145bc']
            }
            start={{x: 1, y: 0}}
            end={{x: 1, y: 1.2}}
            style={styles.offerContainer}>
            {showConfetti && (
              <LottieView
                source={require('@assets/animations/cel.json')}
                style={styles.confetti}
                autoPlay
                loop={false}
                onAnimationFinish={() => setShowConfetti(false)}
              />
            )}
            <TouchableOpacity
              style={styles.offerContent}
              activeOpacity={0.8}
              onPress={() => {
                navigate('CheckoutScreen', {item});
              }}>
              <View style={styles.offerHeader}>
                <View style={styles.itemInfo}>
                  <AnimatedNumber
                    includeComma={false}
                    animationDuration={300}
                    animateToNumber={summary?.totalItems}
                    fontStyle={styles.animatedCount}
                  />
                  <CustomText style={styles.offerText}>
                    {` item${summary?.totalItems > 1 ? 's added' : ' added'}`}
                  </CustomText>
                </View>
                <Icon
                  iconFamily="MaterialCommunityIcons"
                  name="arrow-right-circle"
                  color={Colors.active}
                  size={20}
                />
              </View>
              <Animated.Text
                style={[
                  styles.offerSubtitle,
                  {transform: [{scale: scalAnim}]},
                ]}>
                {summary?.totalPrice > 500
                  ? 'Congratulations! You get an extra 15% OFF!'
                  : `Add items worth Rs-${Math.max(
                      1,
                      500 - summary?.totalPrice,
                    )} more to get extra 15% OFF`}
              </Animated.Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      )}
    </View>
  );
};

export default SearchAndOffers;
