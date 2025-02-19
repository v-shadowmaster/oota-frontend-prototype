import {View, Text} from 'react-native';
import React from 'react';
import LocationHeader from './LocationHeader';
import Graphics from './Graphics';
import SearchBar from './SearchBar';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles';

const HeaderSection = () => {
  const {styles} = useStyles(homeStyles);
  return (
    <>
      <View>
        <LocationHeader />
        <SearchBar />
      </View>
    </>
  );
};

export default HeaderSection;
