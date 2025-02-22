import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, View, Animated} from 'react-native';
import {useAppDispatch, useAppSelector} from '@states/reduxHook';
import Icon from '@components/ui/Icon';
import CustomText from '@components/global/CustomText';
import {
  addItemToCart,
  removeItemFromCart,
  selectRestaurantCartItem,
} from '@states/reducers/cartSlice';
import CustomModal from '@components/modal/CustomModal';
import AddItemModal from '@components/modal/AddItemModal';
import RepeatItemModal from '@components/modal/RepeatItemModal';

const AddButton: React.FC<{item: any; restaurant: any}> = ({
  item,
  restaurant,
}) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(
    selectRestaurantCartItem(restaurant?.id, item?.id),
  );
  const modalRef = useRef<any>(null);

  const openRepeatModal = () => {
    modalRef?.current?.openModal(
      <RepeatItemModal
        item={item}
        onOpenAddModal={openAddModal}
        restaurant={restaurant}
        closeModal={() => {
          modalRef.current?.closeModal();
        }}
      />,
    );
  };

  const openAddModal = () => {
    modalRef?.current?.openModal(
      <AddItemModal
        item={item}
        restaurant={restaurant}
        onClose={() => {
          modalRef.current?.closeModal();
        }}
      />,
    );
  };

  // Local quantity state and animation values
  const [quantity, setQuantity] = useState(0);
  const buttonScale = useRef(new Animated.Value(1)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;

  // Sync local quantity with the cart.
  useEffect(() => {
    if (cart) {
      // Assuming cart.quantity is available; fallback to 1 if not.
      setQuantity(cart.quantity || 1);
    } else {
      setQuantity(0);
    }
  }, [cart]);

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

  const addCartHandler = useCallback(() => {
    if (item?.isCustomizable) {
      if (cart != null) {
        openRepeatModal();
        return;
      }
      openAddModal();
    } else {
      dispatch(
        addItemToCart({
          restaurant: restaurant,
          item: {...item, customization: []},
        }),
      );
    }
  }, [dispatch, item, restaurant, cart]);

  const removeCartHandler = useCallback(() => {
    if (item?.isCustomizable) {
      if (cart !== undefined) {
        console.log('open modal');
      }
    } else {
      dispatch(
        removeItemFromCart({
          restaurant_id: restaurant?.id,
          itemId: item?.id,
        }),
      );
    }
  }, [dispatch, item, restaurant, cart]);

  return (
    <>
      <CustomModal ref={modalRef} />
      <Animated.View
        style={[styles.addButtonWrapper, {transform: [{scale: buttonScale}]}]}>
        {quantity === 0 ? (
          <Pressable
            style={styles.addButton}
            onPress={() => {
              addCartHandler();
              animatePress();
              // For non-customizable items, update immediately.
              if (!item?.isCustomizable) {
                setQuantity(1);
              }
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
                removeCartHandler();
                animatePress();
                if (!item?.isCustomizable) {
                  setQuantity(prev => Math.max(0, prev - 1));
                }
              }}
              style={styles.quantityButton}>
              <Icon
                name="remove"
                iconFamily="MaterialIcons"
                size={18}
                color="#FFFFFF"
              />
            </Pressable>
            <Animated.Text
              style={[styles.quantityText, {opacity: textOpacity}]}>
              {quantity}
            </Animated.Text>
            <Pressable
              onPress={() => {
                addCartHandler();
                animatePress();
                if (!item?.isCustomizable) {
                  setQuantity(prev => prev + 1);
                }
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
    </>
  );
};

export default React.memo(AddButton);

const styles = StyleSheet.create({
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
