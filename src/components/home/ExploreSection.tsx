import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles';
import CustomText from '@components/global/CustomText';
import {Colors} from '@unistyles/Constants';
import Icon from '@components/ui/Icon';
import RecommendedList from '@components/List/RecommendedList';
import BreakerText from '@components/ui/BreakerText';
import RegularFoodList from '@components/List/RegularFoodList';
import HorizontalLine from '@components/ui/HorizontalLine';

const ExploreSection = () => {
  const [tabSelected, settabSelected] = useState(1);
  const {styles} = useStyles(homeStyles);

  return (
    <View style={[styles.topHidingContainer]}>
      <View style={[styles.flexRowCenter]}>
        <Pressable
          style={[
            styles.leftTab,
            {borderColor: tabSelected == 1 ? Colors.active : Colors.tertiary},
          ]}
          onPress={() => settabSelected(1)}>
          <CustomText
            style={{fontFamily: 'Poppins-Medium'}}
            color={tabSelected == 1 ? Colors.text : Colors.lightText}>
            Recommended
          </CustomText>
        </Pressable>
        <Pressable
          style={[
            styles.rightTab,
            {borderColor: tabSelected == 2 ? Colors.active : Colors.tertiary},
          ]}
          onPress={() => settabSelected(2)}>
          <Icon
            name="bookmark-outline"
            iconFamily="Ionicons"
            color={tabSelected == 2 ? Colors.text : Colors.lightText}
            size={14}
          />
          <CustomText
            style={{fontFamily: 'Poppins-Medium'}}
            color={tabSelected == 2 ? Colors.text : Colors.lightText}>
            Collections
          </CustomText>
        </Pressable>
      </View>

      <RecommendedList />

      <CustomText
        style={{
          fontFamily: 'Poppins-Bold',
          paddingHorizontal: 20,
          marginTop: 10,
        }}
        color={Colors.text}
        fontSize={18}>
        What's on your mind
      </CustomText>

      <RegularFoodList />

      <CustomText
        style={{
          fontFamily: 'Poppins-Bold',
          paddingHorizontal: 20,
          marginTop: 10,
        }}
        color={Colors.text}
        fontSize={18}>
        All Restaurants
      </CustomText>
    </View>
  );
};

export default ExploreSection;
