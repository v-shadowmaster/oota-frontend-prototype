import {FlatList, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import RestaurantHeader from '@components/restaurants/RestaurantHeader';
import SortingAndFilters from '@components/home/SortingAndFilters';
import {restaurantFilterOptions, restaurantItemData} from '@utils/dummyData';
import HorizontalLine from '@components/ui/HorizontalLine';
import FoodCard from './FoodCard';

const RestaurantScreen: React.FC = () => {
  const route = useRoute() as any;
  const restaurant = route?.params?.item;

  const insets = useSafeAreaInsets();

  const renderItem = ({item}: any) => {
    return <FoodCard item={item} restaurant={restaurant} />;
  };

  return (
    <>
      <View style={{height: Platform.OS === 'android' ? insets.top : 0}} />
      <CustomSafeAreaView>
        <RestaurantHeader
          title={restaurant?.name}
          rating={restaurant?.rating}
        />

        <View style={styles.sortingContainer}>
          <SortingAndFilters
            menuTitle="Filter"
            options={restaurantFilterOptions}
          />
        </View>

        <FlatList
          data={restaurantItemData}
          renderItem={renderItem}
          scrollEventThrottle={16}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => (
            <View style={styles.mainPadding}>
              <HorizontalLine />
            </View>
          )}
          contentContainerStyle={styles.scrollContainerStyle}
        />
      </CustomSafeAreaView>
    </>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
  sortingContainer: {},
  mainPadding: {},
  scrollContainerStyle: {},
});
