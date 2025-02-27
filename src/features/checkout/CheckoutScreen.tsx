import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {useAppSelector} from '@states/reduxHook';
import {selectRestaurantCart} from '@states/reducers/cartSlice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {goBack} from '@utils/NavigationUtils';
import {Colors} from '@unistyles/Constants';
import CheckoutHeader from '@components/checkout/CheckoutHeader';
import OrderList from './OrderList';

const CheckoutScreen = () => {
  const route = useRoute() as any;
  const restaurant = route?.params?.item;
  const cart = useAppSelector(selectRestaurantCart(restaurant?.id));
  const totalItemPrice =
    cart?.reduce((total, item) => total + (item.cartPrice || 0), 0) || 0;
  const totalItems =
    cart?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cart || cart?.length === 0) {
      goBack();
    }
  }, [cart]);

  return (
    <View style={styles.container}>
      <View style={{height: Platform.OS === 'android' ? insets.top : 0}} />
      <CheckoutHeader title={restaurant?.name} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <OrderList
          cartItems={cart}
          restaurant={restaurant}
          totalItems={totalItems}
        />
      </ScrollView>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  cancelText: {
    marginTop: 4,
    opacity: 0.6,
  },
  paymentGateway: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 14,
    paddingTop: 10,
    bottom: Platform.OS === 'android' ? 40 : undefined,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scrollContainer: {
    padding: 10,
    backgroundColor: Colors.background_light,
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  flexRowBetween: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
  },
});
