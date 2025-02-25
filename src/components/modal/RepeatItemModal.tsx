import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useAppSelector} from '@states/reduxHook';
import {selectRestaurantCartItem} from '@states/reducers/cartSlice';
import CustomText from '@components/global/CustomText';
import {Colors} from '@unistyles/Constants';
import MiniFoodCard from '@components/restaurants/MiniFoodCard';

const RepeatItemModal: React.FC<{
  item: any;
  restaurant: any;
  onOpenAddModal: () => void;
  closeModal: () => void;
}> = ({item, restaurant, onOpenAddModal, closeModal}) => {
  const cartItem = useAppSelector(
    selectRestaurantCartItem(restaurant?.id, item?.id),
  );

  React.useEffect(() => {
    if (!cartItem) {
      closeModal();
    }
  }, [cartItem]);

  return (
    <View>
      <View style={styles.noShadowHeaderContainer}>
        <View style={styles.flexRowGap}>
          <CustomText
            fontFamily="Poppins-Bold"
            fontSize={18}
            style={{fontFamily: 'Poppins-Bold'}}>
            Repeat last used customization ?
          </CustomText>
        </View>
      </View>

      <ScrollView style={styles.ShadowContainerWhiteBackground}>
        {cartItem?.customization?.map((cus, index) => {
          return (
            <MiniFoodCard
              item={item}
              cus={cus}
              key={index}
              restaurant={restaurant}
            />
          );
        })}
      </ScrollView>

      <View style={styles.noShadowHeaderContainer}>
        <TouchableOpacity onPress={onOpenAddModal}>
          <CustomText
            fontFamily="Poppins-Bold"
            color={Colors.active}
            fontSize={16}
            style={{fontFamily: 'Poppins-Bold', paddingVertical: 24}}>
            + Add new customization
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RepeatItemModal;

const styles = StyleSheet.create({
  noShadowHeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRowGap: {
    padding: 20,
  },
  ShadowContainerWhiteBackground: {},
});
