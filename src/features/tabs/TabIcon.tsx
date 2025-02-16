import CustomText from '@components/global/CustomText';
import Icon from '@components/ui/Icon';
import {Colors} from '@unistyles/Constants';
import {FC, memo} from 'react';
import {TextStyle, View, ViewStyle} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

interface TabProps {
  name: string;
}

interface IconProp {
  focused: boolean;
}

const styles = {
  width: RFValue(18),
  height: RFValue(18),
};

const tabStyles: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 8,
};

const textStyleInActive: TextStyle = {
  textAlign: 'center',
  marginTop: 4,
  color: Colors.lightText,
  fontSize: RFValue(9.5),
};

const textStyleActive: TextStyle = {
  textAlign: 'center',
  marginTop: 4,
  color: Colors.active,
};

const TabIcon: FC<TabProps> = memo(({name}) => {
  return (
    <View style={tabStyles}>
      <Icon
        iconFamily="MaterialCommunityIcons"
        name={
          name === 'Delivery'
            ? 'truck-delivery-outline'
            : name === 'Reorder'
            ? 'refresh'
            : 'face-man-profile'
        }
        size={22}
        color="#000000"
      />
      <CustomText style={[{fontFamily: 'Poppins-Bold'}]}>{name}</CustomText>
    </View>
  );
});

const TabIconFocused: FC<TabProps> = memo(({name}) => {
  return (
    <View style={tabStyles}>
      <Icon
        iconFamily="MaterialCommunityIcons"
        name={
          name === 'Delivery'
            ? 'truck-delivery'
            : name === 'Reorder'
            ? 'refresh'
            : 'face-man-profile'
        }
        size={22}
        color={Colors.active}
      />
      <CustomText style={[textStyleActive, {fontFamily: 'Poppins-Bold'}]}>
        {name}
      </CustomText>
    </View>
  );
});

export const DeliveryTabIcon: FC<IconProp> = ({focused}) => {
  return focused ? (
    <TabIconFocused name="Delivery" />
  ) : (
    <TabIcon name="Delivery" />
  );
};

export const ReorderTabIcon: FC<IconProp> = ({focused}) => {
  return focused ? (
    <TabIconFocused name="Reorder" />
  ) : (
    <TabIcon name="Reorder" />
  );
};

export const ProfileTabIcon: FC<IconProp> = ({focused}) => {
  return focused ? (
    <TabIconFocused name="Profile" />
  ) : (
    <TabIcon name="Profile" />
  );
};
