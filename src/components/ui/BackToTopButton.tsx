import {StyleSheet, TouchableOpacity, View, Dimensions} from 'react-native';
import React, {memo} from 'react';
import Icon from './Icon';
import CustomText from '@components/global/CustomText';

const BackToTopButton: React.FC<{onPress: () => void}> = memo(({onPress}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={styles.contentContainer}>
        <Icon
          iconFamily="MaterialCommunityIcons"
          name="arrow-up-circle"
          size={24}
          color="#FFFFFF"
        />
        <CustomText style={styles.text}>Back to top</CustomText>
      </View>
    </TouchableOpacity>
  );
});

// Set display name for debugging
BackToTopButton.displayName = 'BackToTopButton';

export default BackToTopButton;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  // #111827
  button: {
    backgroundColor: '#111827', // Dark background like Twitter's
    borderRadius: 9999, // Fully rounded
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
    position: 'absolute',
    bottom: 20,
    left: width / 2 - 75, // Center horizontally (assuming button width ~150)
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
