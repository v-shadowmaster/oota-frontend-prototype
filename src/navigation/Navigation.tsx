import SelectLocation from '@components/global/SelectLocation';
import SeletonScreen from '@components/global/SeletonScreen';
import LoginScreen from '@features/auth/LoginScreen';
import SplashScreen from '@features/auth/SplashScreen';
import CheckoutScreen from '@features/checkout/CheckoutScreen';
import OrderSuccessScreen from '@features/checkout/OrderSuccessScreen';
import ProfileScreen from '@features/profile/ProfileScreen';
import RestaurantScreen from '@features/restaurants/RestaurantScreen';
import AnimatedTabs from '@features/tabs/AnimatedTabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '@utils/NavigationUtils';
import {FC} from 'react';
import {StatusBar} from 'react-native';

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar translucent />
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            animation: 'fade',
          }}
        />

        <Stack.Screen
          name="OrderSuccessScreen"
          component={OrderSuccessScreen}
          options={{
            animation: 'fade',
          }}
        />

        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            animation: 'fade',
          }}
        />

        <Stack.Screen
          name="SelectLocation"
          component={SelectLocation}
          options={{
            animation: 'fade',
          }}
        />

        <Stack.Screen
          name="CheckoutScreen"
          component={CheckoutScreen}
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="SkeletonScreen"
          component={SeletonScreen}
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="UserBottomTab"
          component={AnimatedTabs}
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
