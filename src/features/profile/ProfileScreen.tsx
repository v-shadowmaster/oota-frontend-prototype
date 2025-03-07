import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {useStyles} from 'react-native-unistyles';
import {emptyStyles} from '@unistyles/emptyStyles';
import MapView from 'react-native-maps';

const ProfileScreen = () => {
  const {styles} = useStyles(emptyStyles);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

export default ProfileScreen;

/// AIzaSyCgbcr_CHYlWTgQLi_fk4gphXk1CXnRYMY
