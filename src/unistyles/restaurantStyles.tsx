import {createStyleSheet} from 'react-native-unistyles';

export const RestaurantStyles = createStyleSheet(
  ({colors, device, border}) => ({
    listContainer: {},
    backToTopButton: {
      top: 100,
      position: 'absolute',
      zIndex: 1000,
      width: '100%',
      alignItems: 'center',
      transform: [{translateY: 0}],
    },
    shadowBottom: {
      width: '100%',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      backgroundColor: '#fff',
    },
    centerDesign: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
);
