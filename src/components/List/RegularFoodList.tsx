import {View, Text, Image, ScrollView, FlatList} from 'react-native';
import React from 'react';
import {useStyles} from 'react-native-unistyles';
import {cardStyles} from '@unistyles/cardStyles';
import ScalePress from '@components/ui/ScalePress';
import CustomText from '@components/global/CustomText';
import {regularFoodData} from '@utils/dummyData';
import {Colors} from '@unistyles/Constants';

const RegularFoodList = () => {
  const {styles} = useStyles(cardStyles);

  const renderItem = ({item}: any) => {
    return (
      <ScalePress style={styles.regularFoodContainer}>
        <Image
          source={item.imageUrl}
          style={styles.regularFoodImageContainer}
        />
        <CustomText
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            marginTop: 4,
            fontFamily: 'Poppins-Medium',
          }}
          color={Colors.text}>
          {item.name}
        </CustomText>
      </ScalePress>
    );
  };
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <FlatList
        horizontal
        data={regularFoodData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        style={styles.recommendedContainer}
      />
    </ScrollView>
  );
};

export default RegularFoodList;
