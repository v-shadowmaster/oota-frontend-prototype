import {View, TouchableOpacity, Dimensions} from 'react-native';
import React, {useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles';
import {useAppDispatch, useAppSelector} from '@states/reduxHook';
import {useSharedState} from '@features/tabs/SharedContext';
import Icon from '@components/ui/Icon';
import {Colors} from '@unistyles/Constants';
import CustomText from '@components/global/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';

const searchItems: string[] = [
  'Search "Biryani"',
  'Search "Chai Samosa"',
  'Search "Cake"',
  'Search "Ice Cream"',
];

const SearchBar = () => {
  const {styles} = useStyles(homeStyles);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const searchOpacity = useSharedValue(1);

  const updateSearchIndex = useCallback(() => {
    setCurrentSearchIndex(prev => (prev + 1) % searchItems.length);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      searchOpacity.value = withTiming(0, {duration: 200}, isFinished => {
        if (isFinished) {
          runOnJS(updateSearchIndex)();
          searchOpacity.value = withTiming(1, {duration: 200});
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [updateSearchIndex]);

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: searchOpacity.value,
  }));

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.searchBarWrapper}>
      <View style={styles.searchContainer}>
        <View style={styles.searchIconContainer}>
          <Icon
            iconFamily="Ionicons"
            name="search-outline"
            color="#8A8A8A"
            size={20}
          />
        </View>
        <Animated.View style={[styles.searchTextContainer, opacityStyle]}>
          <CustomText style={styles.searchText}>
            {searchItems[currentSearchIndex]}
          </CustomText>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchBar;
