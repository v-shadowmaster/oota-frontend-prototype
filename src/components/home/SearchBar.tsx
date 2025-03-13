import {View, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import React, {useState, useEffect, useRef, FC} from 'react';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles';
import {useAppDispatch, useAppSelector} from '@states/reduxHook';
import {useSharedState} from '@features/tabs/SharedContext';
import {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import Icon from '@components/ui/Icon';
import {Colors} from '@unistyles/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '@components/global/CustomText';

const searchItems: string[] = [
  'samosa',
  'cake',
  'ice cream',
  'pizza',
  'biryani',
  'chicken nuggets',
];

const SearchBar: FC = () => {
  const dispatch = useAppDispatch();
  const isVegMode = useAppSelector(state => state.user.isVegMode);
  const {scrollYGlobal} = useSharedState();
  const {styles} = useStyles(homeStyles);
  const [searchSuggestion, setSearchSuggestion] = useState(searchItems[0]);

  // useRef to keep track of the current index
  const countRef = useRef(0);

  useEffect(() => {
    // set up an interval to update the suggestion every 2 seconds (2000ms)
    const intervalId = setInterval(() => {
      countRef.current = (countRef.current + 1) % searchItems.length;
      setSearchSuggestion(searchItems[countRef.current]);
    }, 2000);

    // cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const textColorAnimation = useAnimatedStyle(() => {
    const textColor = interpolate(scrollYGlobal.value, [0, 80], [255, 0]);
    return {
      color: `rgb(${textColor},${textColor},${textColor})`,
    };
  });

  return (
    <>
      <SafeAreaView />
      <View style={{marginTop: 0, marginBottom: 14}}>
        <TouchableOpacity style={[styles.searchInputContainer]}>
          <View style={styles.searchLeftSection}>
            <Icon
              iconFamily="Ionicons"
              name="search"
              color={isVegMode ? Colors.active : Colors.primary}
              size={20}
            />
            <CustomText
              fontFamily="Poppins-Medium"
              fontSize={14}
              style={[styles.rollingText]}>
              {`search "${searchSuggestion}"`}
            </CustomText>
          </View>
          <Icon
            iconFamily="Ionicons"
            name="mic-outline"
            color={isVegMode ? Colors.active : Colors.primary}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SearchBar;
