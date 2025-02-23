import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import {useAppDispatch, useAppSelector} from '@states/reduxHook';
import {
  addCustomizableItem,
  removeCustomizableItem,
  removeItemFromCart,
  selectRestaurantCartItem,
} from '@states/reducers/cartSlice';
import {Colors} from '@unistyles/Constants';
import Icon from '@components/ui/Icon';
import CustomText from '@components/global/CustomText';
import AnimatedNumber from 'react-native-animated-numbers';
import CustomModal from '@components/modal/CustomModal';
import EditItemModal from '@components/modal/EditItemModal';

const MiniFoodCard: React.FC<{item: any; cus: any; restaurant: any}> = ({
  cus,
  restaurant,
  item,
}) => {
  const cartItem = useAppSelector(
    selectRestaurantCartItem(restaurant?.id, item?.id),
  );

  const dispatch = useAppDispatch();
  const modalRef = useRef<any>(null);

  const openEditModal = () => {
    modalRef?.current?.openModal(
      <EditItemModal
        item={item}
        cus={cus}
        restaurant={restaurant}
        onClose={() => modalRef?.current?.closeModal()}
      />,
    );
  };

  const removeCartHandler = (cus: any) => {
    dispatch(
      removeCustomizableItem({
        restaurant_id: restaurant?.id,
        customizationId: cus?.id,
        itemId: item?.id,
      }),
    );
  };

  const addCartHandler = (cus: any) => {
    const data = {
      restaurant: restaurant,
      item: item,
      customization: {
        quantity: 1,
        price: cus?.price,
        customizationOptions: cus?.customizationOptions,
      },
    };

    dispatch(addCustomizableItem(data));
  };

  return (
    <>
      <CustomModal ref={modalRef} />
      <View style={styles.container}>
        {/* Food Item Info Section */}
        <View style={styles.mainContent}>
          <View style={styles.leftContent}>
            {/* Veg/Non-veg Indicator */}
            <Animated.View
              style={[
                styles.vegIndicator,
                {
                  backgroundColor: cartItem?.isVeg
                    ? 'rgb(0, 121, 84)'
                    : 'rgb(235, 33, 33)',
                },
              ]}>
              <Icon
                name={cartItem?.isVeg ? 'leaf' : 'food'}
                iconFamily="MaterialCommunityIcons"
                size={8}
                color="#FFFFFF"
              />
            </Animated.View>

            {/* Item Details */}
            <View style={styles.itemDetails}>
              <CustomText fontFamily="Poppins-Bold" style={styles.itemName}>
                {cartItem?.name}
              </CustomText>
              <CustomText style={styles.price}>
                {cus?.customizationOptions?.map((i: any, idx: number) => {
                  return (
                    <CustomText key={idx}>
                      {i?.selectedOption?.name} ,
                    </CustomText>
                  );
                })}
              </CustomText>

              <View style={styles.priceContainer}>
                <Icon
                  name="currency-inr"
                  iconFamily="MaterialCommunityIcons"
                  size={14}
                  color="#536471"
                />
                <CustomText style={styles.price}>{cus?.price}</CustomText>
              </View>

              <CustomText style={styles.customizations}>
                {cus?.customizationOptions?.map((i: any, idx: number) => (
                  <CustomText key={idx} style={styles.customizationText}>
                    {i?.selectedOptions?.name}
                    {idx < cus?.customizationOptions.length - 1 ? ' • ' : ''}
                  </CustomText>
                ))}
              </CustomText>
            </View>
          </View>

          {/* Cart Controls */}
          <View style={styles.cartControls}>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => removeCartHandler(cus)}>
                <Icon
                  name="minus-thick"
                  iconFamily="MaterialCommunityIcons"
                  color="#FFFFFF"
                  size={16}
                />
              </TouchableOpacity>

              <AnimatedNumber
                includeComma={false}
                animationDuration={300}
                fontStyle={styles.quantityText}
                animateToNumber={cus?.quantity}
              />

              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => addCartHandler(cus)}>
                <Icon
                  name="plus-thick"
                  iconFamily="MaterialCommunityIcons"
                  color="#FFFFFF"
                  size={16}
                />
              </TouchableOpacity>
            </View>

            <CustomText style={styles.totalPrice}>
              <Icon
                name="currency-inr"
                iconFamily="MaterialCommunityIcons"
                size={14}
                color="#0F172A"
              />
              {cus?.cartPrice}
            </CustomText>
          </View>
        </View>

        {/* Edit Button */}
        <TouchableOpacity style={styles.editButton} onPress={openEditModal}>
          <CustomText style={styles.editText}>Edit</CustomText>
          <Icon
            name="chevron-right"
            iconFamily="MaterialIcons"
            color="#536471"
            size={16}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default React.memo(MiniFoodCard);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFF3F4',
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftContent: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  vegIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#0F1419',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: {
    color: '#536471',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },

  price1: {
    color: '#536471',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    flexDirection: 'column',
  },
  customizations: {
    marginBottom: 8,
  },
  customizationText: {
    color: '#536471',
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
  },
  cartControls: {
    alignItems: 'flex-end',
  },

  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 4,
    marginBottom: 8,
  },
  controlButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginHorizontal: 12,
  },
  totalPrice: { 
    color: '#0F1419',
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 28,
  },
  editText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    marginRight: 4,
  },
});
