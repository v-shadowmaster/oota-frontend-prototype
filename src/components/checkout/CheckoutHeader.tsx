import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '@unistyles/Constants';
import Icon from '@components/ui/Icon';
import CustomText from '@components/global/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import {goBack} from '@utils/NavigationUtils';

const CheckoutHeader: React.FC<{title: string}> = ({title}) => {
  return (
    <View style={styles.flexRow}>
      <View style={styles.flexRowGap}>
        <Pressable onPress={() => goBack()}>
          <Icon name="chevron-back" iconFamily="Ionicons" size={16} />
        </Pressable>
        <View>
          <CustomText
            style={[{fontFamily: 'Poppins-Bold'}, styles.text]}
            fontSize={11}>
            {title}
          </CustomText>
          <CustomText
            style={[{fontFamily: 'Poppins-Medium'}, styles.text2]}
            fontSize={10}>
            Delivering to Kammasandra
          </CustomText>
        </View>
      </View>

      <View>
        <Icon
          iconFamily="Ionicons"
          name="share-outline"
          color={Colors.primary}
          size={RFValue(16)}
        />
      </View>
    </View>
  );
};

export default CheckoutHeader;

const styles = StyleSheet.create({
  flexRow: {
    justifyContent: 'space-between',
    padding: 20,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 0.6,
    borderColor: Colors.border,
  },

  flexRowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  text: {
    textAlign: 'left',
  },
  text2: {
    textAlign: 'left',
    opacity: 0.5,
  },
});
