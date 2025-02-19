import {createStyleSheet} from 'react-native-unistyles';

export const RestaurantStyles = createStyleSheet(
  ({colors, device, border}) => ({
    listContainer: {},
    backToTopButton: {
      top: 80,
      position: 'absolute',
      zIndex: 1000,
      width: '100%',
      alignItems: 'center',
      transform: [{translateY: 0}],
    },
  }),
);
