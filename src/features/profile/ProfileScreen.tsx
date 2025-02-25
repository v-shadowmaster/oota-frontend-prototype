import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {useStyles} from 'react-native-unistyles';
import {emptyStyles} from '@unistyles/emptyStyles';

const ProfileScreen = () => {
  const {styles} = useStyles(emptyStyles);
  return <View style={{flex: 1}}></View>;
};

export default ProfileScreen;
