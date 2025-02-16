import {View, Text, Image} from 'react-native';
import React from 'react';
import {useStyles} from 'react-native-unistyles';
import {emptyStyles} from '@unistyles/emptyStyles';

const ProfileScreen = () => {
  const {styles} = useStyles(emptyStyles);
  return (
    <View style={styles.container(true)}>
      <Image
        source={require('@assets/images/coming_soon.jpg')}
        style={styles.emptyStyles}
      />
    </View>
  );
};

export default ProfileScreen;
