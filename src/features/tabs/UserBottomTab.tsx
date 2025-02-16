import DeliveryScreen from '@features/delivery/DeliveryScreen';
import ProfileScreen from '@features/profile/ProfileScreen';
import Reorder from '@features/reorder/Reorder';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';

const Tab = createBottomTabNavigator();

const UserBottomTab: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen name="Delivery" component={DeliveryScreen} />
      <Tab.Screen name="Reorder" component={Reorder} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default UserBottomTab;
