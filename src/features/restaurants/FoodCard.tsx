import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {memo} from 'react';
import CustomText from '@components/global/CustomText';
import Icon from '@components/ui/Icon';
import {Colors} from '@unistyles/Constants';
import AddButton from './AddButton';

const FoodCard: React.FC<{item: any; restaurant: any}> = ({
  item,
  restaurant,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        {/* <IsVegComponent isVeg={item?.isVeg} /> */}
        <CustomText fontSize={12} numberOfLines={1} fontFamily="Poppins-Medium">
          {item?.name}
        </CustomText>
        <CustomText
          fontSize={10}
          numberOfLines={2}
          fontFamily="Poppins-Medium"
          style={styles.lowOpacity}>
          {item?.description}
        </CustomText>
        <CustomText
          fontSize={11}
          numberOfLines={1}
          fontFamily="Poppins-Medium"
          style={styles.lowOpacity}>
          {item?.price}
        </CustomText>

        <TouchableOpacity style={styles.addToCollectionContainer}>
          <Icon
            name="bookmark"
            iconFamily="MaterialCommunityIcons"
            size={16}
            color={Colors.primary}
          />
          <CustomText fontSize={10} fontFamily="Poppins-Medium">
            Add to Collections
          </CustomText>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <View style={styles.image}>
          <Image source={item.imageUrl} />
          //create this button
          <AddButton item={item} restaurant={restaurant} />
        </View>
      </View>
    </View>
  );
};

export default memo(FoodCard);

const styles = StyleSheet.create({
  container: {},
  infoContainer: {},
  lowOpacity: {},
  addToCollectionContainer: {},
  imageContainer: {},
  image: {},
});
