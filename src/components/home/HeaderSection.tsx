import {View} from 'react-native';
import React from 'react';
import LocationHeader from './LocationHeader';
import SearchBar from './SearchBar';
import Graphics from './Graphics';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles';

const HeaderSection = () => {
  const {styles} = useStyles(homeStyles);

  return (
    <View style={styles.headerContainer}>
      <LocationHeader />
      <SearchBar />
    </View>
  );
};

export default HeaderSection;
