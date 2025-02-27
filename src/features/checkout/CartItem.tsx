import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';
import {useAppDispatch} from '@states/reduxHook';
import {clearRestaurantCart} from '@states/reducers/cartSlice';
import CustomText from '@components/global/CustomText';
import Icon from '@components/ui/Icon';
import {Colors} from '@unistyles/Constants';
import {navigate} from '@utils/NavigationUtils';
import {RFValue} from 'react-native-responsive-fontsize';

const CartItem: React.FC<{item: any}> = ({item}) => {
  const dispatch = useAppDispatch();
  const deleteCart = async (id: any) => {
    dispatch(clearRestaurantCart({restaurant_id: id}));
  };

  const totalItems = useMemo(() => {
    return item.items.reduce((acc: any, item: any) => {
      acc += item.quantity;
      return acc;
    }, 0);
  }, [item.items]);

  return (
    <View style={styles.cartItemContainer}>
      <View style={styles.topRow}>
        <Image
          source={item?.restaurant?.imageUrl}
          style={styles.restaurantImage}
        />
        <View style={styles.restaurantInfo}>
          <CustomText style={{fontFamily: 'Poppins-Medium'}} fontSize={12}>
            {item?.restaurant?.name}
          </CustomText>
          <TouchableOpacity
            style={styles.viewMenuButton}
            onPress={() => {
              navigate('RestaurantScreen', {
                item: item.restaurant,
              });
            }}>
            <CustomText
              style={{top: -1, fontFamily: 'Poppins-Medium'}}
              fontSize={9}
              color={Colors.active}>
              View Menu
            </CustomText>
            <Icon
              name="chevron-right"
              iconFamily="MaterialIcons"
              color={Colors.active}
              size={12}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() =>
            navigate('CheckoutScreen', {
              item: item?.restaurant,
            })
          }>
          <CustomText
            style={{fontFamily: 'Poppins-Bold', marginRight: 6}}
            color="#fff"
            fontSize={10}>
            View Cart
          </CustomText>
          <CustomText
            style={{fontFamily: 'Poppins-Medium'}}
            color="#fff"
            fontSize={10}>
            {totalItems} item
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => deleteCart(item?.restaurant.id)}
          style={styles.closeButton}>
          <Icon
            name="close"
            iconFamily="MaterialCommunityIcons"
            size={RFValue(12)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  restaurantImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
  },
  restaurantInfo: {
    flex: 1,
  },
  viewMenuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  cartButton: {
    backgroundColor: Colors.active,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#f5f5f5',
    padding: 6,
    borderRadius: 50,
  },
});
