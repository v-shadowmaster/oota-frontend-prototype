import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '@unistyles/Constants';

const HorizontalLine = () => {
  return (
    <>
      <View style={styles.HorizontalLineStyle} />
    </>
  );
};

export default HorizontalLine;

const styles = StyleSheet.create({
  HorizontalLineStyle: {
    height: 1,
    width: '100%',

    backgroundColor: '#000',
    opacity: 0.2,
  },
});
