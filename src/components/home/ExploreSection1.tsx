import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useStyles} from 'react-native-unistyles';
import {cardStyles} from '@unistyles/cardStyles';
import {Colors} from '@unistyles/Constants';
import Animated from 'react-native-reanimated';
import Icon from '@components/ui/Icon';
import ScalePress from '@components/ui/ScalePress';
import {navigate} from '@utils/NavigationUtils';
import CustomText from '@components/global/CustomText';
import CustomGradient from '@components/global/CustomGradient';
import {recommenedListData} from '@utils/dummyData';

const RecommendedList = () => {
  const {styles} = useStyles(cardStyles);

  const renderItem = ({item}: any) => {
    return (
      <ScalePress style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image source={item.imageUrl} style={styles.itemImage} />
          {item?.discount && (
            <View style={styles.discountWrapper}>
              <CustomGradient
                position="bottom"
                style={styles.discountGradient}
              />
              <View style={styles.discountContent}>
                <CustomText
                  color="#fff"
                  fontSize={12}
                  fontFamily="Poppins-Bold">
                  {item?.discount}
                </CustomText>
                <CustomText
                  color="#fff"
                  fontSize={10}
                  fontFamily="Poppins-Medium">
                  {item?.discountAmount}
                </CustomText>
              </View>
            </View>
          )}

          <TouchableOpacity style={styles.bookmarkIcon}>
            <Icon
              iconFamily="MaterialCommunityIcons"
              name="bookmark"
              color="#000"
              size={20}
            />
          </TouchableOpacity>
          <CustomGradient position="bottom" />
        </View>

        <View style={styles.itemInfo}>
          <CustomText
            fontSize={16}
            color={Colors.text}
            fontFamily="Poppins-Bold"
            numberOfLines={1}>
            {item?.name}
          </CustomText>

          <View style={styles.ratingContainer}>
            <View style={styles.rating}>
              <CustomText color="#fff" fontSize={12} fontFamily="Poppins-Bold">
                {item?.rating}
              </CustomText>
              <Icon
                iconFamily="MaterialCommunityIcons"
                name="star"
                color="#fff"
                size={12}
              />
            </View>
            <CustomText style={styles.cuisineText} numberOfLines={1}>
              {item?.cuisine}
            </CustomText>
          </View>

          <View style={styles.timeDistance}>
            <View style={styles.flexRow}>
              <Icon
                iconFamily="MaterialCommunityIcons"
                color="#696969"
                name="clock-outline"
                size={16}
              />
              <CustomText
                fontSize={12}
                color="#696969"
                fontFamily="Poppins-Regular">
                {item?.time}
              </CustomText>
            </View>
            <View style={styles.dot} />
            <CustomText style={styles.distance}>{item?.distance}</CustomText>
          </View>
        </View>
      </ScalePress>
    );
  };

  return (
    <Animated.FlatList
      data={recommenedListData}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default RecommendedList;
