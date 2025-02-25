import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useAppSelector} from '@states/reduxHook';
import {selectRestaurantCartItem} from '@states/reducers/cartSlice';
import CustomText from '@components/global/CustomText';
import MiniFoodCard from '@components/restaurants/MiniFoodCard';

const RemoveItemModal: React.FC<{
  item: any;
  closeModal: () => void;
  restaurant: any;
}> = ({item, restaurant, closeModal}) => {
  const cartItem = useAppSelector(
    selectRestaurantCartItem(restaurant?.id, item?.id),
  );

  useEffect(() => {
    if (!cartItem) {
      closeModal();
    }
  }, [cartItem]);
    
    
  return (
    <View>
      <View style={styles.noShadowHeaderContainer}>
        <View style={styles.flexRowGap}>
          <CustomText style={{fontFamily: 'Poppins-Bold', fontSize: 14}}>
            Customization for {item?.name}
          </CustomText>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainerWhiteBackbround}>
        {cartItem?.customization?.map((cus, index) => {
          return (
            <MiniFoodCard
              item={item}
              cus={cus}
              key={cus?.id}
              restaurant={restaurant}
            />
          );
        })}
      </ScrollView>
      <SafeAreaView />
    </View>
  );
};

export default RemoveItemModal;

const styles = StyleSheet.create({
  noShadowHeaderContainer: {},
  flexRowGap: {},
  scrollContainerWhiteBackbround: {},
});
