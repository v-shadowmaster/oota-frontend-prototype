import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '@states/reduxHook';
import {
  clearRestaurantCart,
  selectRestaurantCart,
} from '@states/reducers/cartSlice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  goBack,
  navigate,
  replace,
  resetAndNavigate,
} from '@utils/NavigationUtils';
import {Colors} from '@unistyles/Constants';
import CheckoutHeader from '@components/checkout/CheckoutHeader';
import OrderList from './OrderList';
import BillDetails from './BillDetails';
import CustomText from '@components/global/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import ArrowButton from './ArrowButton';

const CheckoutScreen = () => {
  const route = useRoute() as any;
  const restaurant = route?.params?.item;
  const cart = useAppSelector(selectRestaurantCart(restaurant?.id));
  const totalItemPrice =
    cart?.reduce((total, item) => total + (item.cartPrice || 0), 0) || 0;
  const totalItems =
    cart?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cart || cart?.length === 0) {
      goBack();
    }
  }, [cart]);

  const handlePlaceOrder = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      replace('OrderSuccessScreen', {
        restaurant: restaurant,
      });
   
    }, 2000);
       dispatch(clearRestaurantCart(restaurant?.id));
  };

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

        <BillDetails totalItemPrice={totalItemPrice} />

        <View style={styles.flexRowBetween}>
          <View>
            <CustomText fontSize={10} style={{fontFamily: 'Poppins-Medium'}}>
              Cancellation Policy
            </CustomText>
            <CustomText
              fontSize={9}
              style={[styles.cancelText, {fontFamily: 'Poppins-Bold'}]}>
              Orders cannot be cancelled once packed for delivery. In case of
              late arrival just eat donot complain mother fucker you are not
              Ambani's kids
            </CustomText>
          </View>
        </View>
      </ScrollView>

      <View style={styles.paymentGateway}>
        <View style={{width: '30%'}}>
          <CustomText
            fontSize={RFValue(6)}
            style={{fontFamily: 'Poppins-Medium'}}>
            💵 PAY USING
          </CustomText>
          <CustomText
            fontSize={10}
            style={{
              marginTop: 2,
              fontFamily: 'Poppins-Medium',
            }}>
            Phone pe or Google pay
          </CustomText>
        </View>
        <View style={{width: '70%'}}>
          <ArrowButton
            loading={loading}
            price={totalItemPrice}
            title="Place Order"
            onPress={handlePlaceOrder}
          />
        </View>
      </View>
      <SafeAreaView />
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
    position: 'absolute',
    bottom: 0,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 25 : 5,
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
