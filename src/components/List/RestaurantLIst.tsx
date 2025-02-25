import {View, Text, FlatList} from 'react-native';
import React from 'react';
import CustomText from '@components/global/CustomText';
import {recommenedListData} from '@utils/dummyData';
import {useStyles} from 'react-native-unistyles';
import {cardStyles} from '@unistyles/cardStyles';
import RestaurantCard from './RestaurantCard';
import HorizontalLine from '@components/ui/HorizontalLine';

const RestaurantLIst = () => {
  const {styles} = useStyles(cardStyles);

  const renderItem = ({item}: any) => {
    return <RestaurantCard item={item} />;
  };

  return (
    <View>
      <CustomText
        fontFamily="Poppins-Medium"
        style={{alignSelf: 'center', padding: 12}}
        fontSize={14}>
        1823 restaurants delivering to you
      </CustomText>
      <HorizontalLine />

      <FlatList
        data={recommenedListData}
        scrollEventThrottle={16}
        bounces={true}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item?.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default RestaurantLIst;
