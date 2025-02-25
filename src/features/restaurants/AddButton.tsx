import React, {useCallback, useRef} from 'react';
import {Pressable, StyleSheet, View, Animated} from 'react-native';
import {useAppDispatch, useAppSelector} from '@states/reduxHook';
import Icon from '@components/ui/Icon';
import CustomText from '@components/global/CustomText';
import {
  addItemToCart,
  removeCustomizableItem,
  removeItemFromCart,
  selectRestaurantCartItem,
} from '@states/reducers/cartSlice';
import CustomModal from '@components/modal/CustomModal';
import AddItemModal from '@components/modal/AddItemModal';
import RepeatItemModal from '@components/modal/RepeatItemModal';
import RemoveItemModal from '@components/modal/RemoveItemModal';

const AddButton: React.FC<{item: any; restaurant: any}> = ({
  item,
  restaurant,
}) => {
  const dispatch = useAppDispatch();
  // Use the selector without custom equality – this will always return the latest state.
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

  // Derive the quantity directly from the store.
  const quantity = cart?.quantity || 0;

  // Animation values.
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

  const openRemoveModal = () => {
    modalRef.current?.openModal(
      <RemoveItemModal
        item={item}
        closeModal={() => modalRef.current?.closeModal()}
        restaurant={restaurant}
      />,
    );
  };

  const removeCartHandler = useCallback(() => {
    if (item?.isCustomizable) {
      if (cart?.customization && cart?.customization?.length > 1) {
        openRemoveModal();
        return;
      }
      dispatch(
        removeCustomizableItem({
          restaurant_id: restaurant?.id,
          customizationId: cart?.customization![0]?.id,
          itemId: item?.id,
        }),
      );
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

export default AddButton;

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
