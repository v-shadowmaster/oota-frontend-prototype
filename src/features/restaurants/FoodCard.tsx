import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Animated,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {memo, useState, useRef} from 'react';
import CustomText from '@components/global/CustomText';
import Icon from '@components/ui/Icon';

// Modern VegIndicator with animation
const IsVegComponent: React.FC<{isVeg: boolean}> = ({isVeg}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 20,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  //rgb(4, 66, 47)

  return (
    <Animated.View
      style={[
        styles.vegIndicator,
        {transform: [{scale: scaleAnim}]},
        {backgroundColor: isVeg ? 'rgb(0, 121, 84)' : 'rgb(235, 33, 33)'},
      ]}>
      <Icon
        name={isVeg ? 'leaf' : 'food'}
        iconFamily="MaterialCommunityIcons"
        size={8}
        color="#FFFFFF"
      />
    </Animated.View>
  );
};

// Enhanced Add Button with micro-animations
const AddButton: React.FC<{item: any; restaurant: any}> = ({item}) => {
  const [quantity, setQuantity] = useState(0);
  const buttonScale = useRef(new Animated.Value(1)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;

  const animatePress = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(buttonScale, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 0.7,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.spring(buttonScale, {
          toValue: 1,
          tension: 20,
          friction: 4,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  return (
    <Animated.View
      style={[styles.addButtonWrapper, {transform: [{scale: buttonScale}]}]}>
      {quantity === 0 ? (
        <Pressable
          style={styles.addButton}
          onPress={() => {
            animatePress();
            setQuantity(1);
          }}>
          <Animated.View style={{opacity: textOpacity}}>
            <CustomText
              fontFamily="Montserrat-Bold"
              fontSize={14}
              color="#FFFFFF"
              style={{fontFamily: 'Montserrat-Bold'}}>
              ADD
            </CustomText>
          </Animated.View>
        </Pressable>
      ) : (
        <View style={styles.quantityControls}>
          <Pressable
            onPress={() => {
              animatePress();
              setQuantity(prev => Math.max(0, prev - 1));
            }}
            style={styles.quantityButton}>
            <Icon
              name="remove"
              iconFamily="MaterialIcons"
              size={18}
              color="#FFFFFF"
            />
          </Pressable>
          <Animated.Text style={[styles.quantityText, {opacity: textOpacity}]}>
            {quantity}
          </Animated.Text>
          <Pressable
            onPress={() => {
              animatePress();
              setQuantity(prev => prev + 1);
            }}
            style={styles.quantityButton}>
            <Icon
              name="add"
              iconFamily="MaterialIcons"
              size={18}
              color="#FFFFFF"
            />
          </Pressable>
        </View>
      )}
    </Animated.View>
  );
};

// Refined main FoodCard
const FoodCard: React.FC<{item: any; restaurant: any}> = ({
  item,
  restaurant,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const bookmarkScale = useRef(new Animated.Value(1)).current;

  const animateBookmark = () => {
    Animated.sequence([
      Animated.spring(bookmarkScale, {
        toValue: 1.2,
        tension: 20,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.spring(bookmarkScale, {
        toValue: 1,
        tension: 20,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.mainInfo}>
          <View style={styles.titleRow}>
            <IsVegComponent isVeg={item?.isVeg} />
            <CustomText
              fontSize={16}
              numberOfLines={1}
              fontFamily="Poppins-Medium"
              style={styles.title}>
              {item?.name}
            </CustomText>
          </View>

          <CustomText
            fontSize={13}
            numberOfLines={2}
            fontFamily="Poppins-Regular"
            style={styles.description}>
            {item?.description}
          </CustomText>

          <View style={styles.bottomRow}>
            <View style={styles.priceSection}>
              <Icon
                name="currency-inr"
                iconFamily="MaterialCommunityIcons"
                size={16}
                color="#0F172A"
              />
              <CustomText
                fontSize={15}
                fontFamily="Poppins-Medium"
                style={styles.price}>
                {item?.price}
              </CustomText>
            </View>

            <View style={styles.featuresSection}>
              {item?.isCustomizable && (
                <View style={styles.customizableBadge}>
                  <Icon
                    name="tune"
                    iconFamily="MaterialIcons"
                    size={14}
                    color="#6366F1"
                  />
                  <CustomText
                    fontSize={12}
                    fontFamily="Poppins-Medium"
                    style={styles.customizableText}>
                    Customizable
                  </CustomText>
                </View>
              )}
              <Animated.View style={{transform: [{scale: bookmarkScale}]}}>
                <TouchableOpacity
                  style={styles.bookmarkButton}
                  onPress={() => {
                    setIsBookmarked(!isBookmarked);
                    animateBookmark();
                  }}>
                  <Icon
                    name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                    iconFamily="MaterialCommunityIcons"
                    size={20}
                    color={isBookmarked ? '#1D4ED8' : '#64748B'}
                  />
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </View>

        <View style={styles.imageSection}>
          <Image
            source={item.imageUrl}
            style={styles.foodImage}
            resizeMode="cover"
          />
          <AddButton item={item} restaurant={restaurant} />
        </View>
      </View>
    </View>
  );
};

export default memo(FoodCard);

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  mainInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    flex: 1,
    color: '#0F172A',
    fontFamily: 'Poppins-Medium',
  },
  description: {
    marginTop: 6,
    color: '#64748B',
    lineHeight: 18,
    fontFamily: 'Poppins-Regular',
  },
  bottomRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  price: {
    color: '#0F172A',
    marginLeft: 2,
    fontFamily: 'Poppins-Medium',
  },
  featuresSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  customizableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  customizableText: {
    color: '#4338CA',
    fontFamily: 'Poppins-Medium',
  },
  bookmarkButton: {
    padding: 4,
  },
  imageSection: {
    width: width * 0.25,
    aspectRatio: 1,
  },
  foodImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
  },
  vegIndicator: {
    width: 18,
    height: 18,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addButtonWrapper: {
    position: 'absolute',
    bottom: -8,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#0F172A',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 20,
    paddingHorizontal: 8,
  },
  quantityButton: {
    padding: 8,
  },
  quantityText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: '#FFFFFF',
    paddingHorizontal: 12,
  },
});
