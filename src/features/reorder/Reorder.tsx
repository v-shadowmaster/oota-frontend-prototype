import {View, Text, Image} from 'react-native';
import React from 'react';
import {useStyles} from 'react-native-unistyles';
import {emptyStyles} from '@unistyles/emptyStyles';

const Reorder = () => {
  const {styles} = useStyles(emptyStyles);
  return (
    <View style={styles.container(false)}>
      <Image
        source={require('@assets/images/coming_soon1.jpg')}
        style={styles.emptyStyles}
      />
    </View>
  );
};

export default Reorder;
