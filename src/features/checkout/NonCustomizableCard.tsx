import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useCallback, useState} from 'react';
import {useAppDispatch} from '@states/reduxHook';
import {addItemToCart, removeItemFromCart} from '@states/reducers/cartSlice';
import Animated from 'react-native-reanimated';
import Icon from '@components/ui/Icon';
import CustomText from '@components/global/CustomText';
import {Colors} from '@unistyles/Constants';
import AnimatedNumber from 'react-native-animated-numbers';
import {RFValue} from 'react-native-responsive-fontsize';

const NonCustomizableCard: FC<{item: any; restaurant: any}> = ({
  restaurant,
  item,
}) => {
  const dispatch = useAppDispatch();

  const addCartHandler = useCallback(() => {
    dispatch(
      addItemToCart({
        restaurant: restaurant,
        item: {...item, customization: []},
      }),
    );
  }, [dispatch, restaurant?.id, item]);

  const removeCartHandler = useCallback(() => {
    dispatch(
      removeItemFromCart({
        restaurant_id: restaurant?.id,
        itemId: item?.id,
      }),
    );
  }, [dispatch, restaurant?.id, item]);

  return (
    <View style={styles.flexRowItemBaseline}>
      <View style={styles.flexRowGapBaseline}>
        <Animated.View
          style={[
            styles.vegIndicator,
            {
              backgroundColor: item?.isVeg
                ? 'rgb(0, 121, 84)'
                : 'rgb(235, 33, 33)',
            },
          ]}>
          <Icon
            name={item?.isVeg ? 'leaf' : 'food'}
            iconFamily="MaterialCommunityIcons"
            size={8}
            color="#FFFFFF"
          />
        </Animated.View>

        <View>
          <CustomText style={{fontFamily: 'Poppins-Bold'}}>
            {item?.name}
          </CustomText>
          <CustomText style={{fontFamily: 'Poppins-Medium'}}>
            {item?.price}
          </CustomText>
        </View>
      </View>
      <View style={styles.cartOperationContainer}>
        <View style={styles.miniAddButtonContainer}>
          <TouchableOpacity onPress={removeCartHandler}>
            <Icon
              iconFamily="MaterialCommunityIcons"
              color={Colors.active}
              name="minus-thick"
              size={RFValue(10)}
            />
          </TouchableOpacity>
          <AnimatedNumber
            includeComma={false}
            animationDuration={300}
            animateToNumber={item?.quantity}
            fontStyle={styles.miniAnimatedCount}
          />
          <TouchableOpacity onPress={addCartHandler}>
            <Icon
              iconFamily="MaterialCommunityIcons"
              color={Colors.active}
              name="plus-thick"
              size={RFValue(10)}
            />
          </TouchableOpacity>
        </View>
        <CustomText style={{fontFamily: 'Poppins-Medium'}}>
          {' '}
          <Icon
            name="currency-inr"
            iconFamily="MaterialCommunityIcons"
            size={14}
            color="#0F172A"
          />
          {item?.cartPrice}
        </CustomText>
      </View>
    </View>
  );
};

export default NonCustomizableCard;

const styles = StyleSheet.create({
  flexRowItemBaseline: {},
  flexRowGapBaseline: {},
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
  cartOperationContainer: {},
  miniAddButtonContainer: {},
  miniAnimatedCount: {},
});
