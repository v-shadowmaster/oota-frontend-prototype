import {createStyleSheet} from 'react-native-unistyles';

import {Colors} from './Constants';

export const shadowStyle = {
  shadowOffset: {width: 1, height: 1},
  shadowOpacity: 0.4,
  elevation: 5,
  shadowRadius: 4,
  shadowColor: Colors.lightText,
  borderColor: Colors.border,
  borderRadius: 10,
};

export const phoneStyles = createStyleSheet(({colors, fonts, border}) => ({
  container: {
    gap: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },

  countryPickerContainer: {
    backgroundColor: '#fff',
    ...shadowStyle,
    padding: 8,
    height: 45,
    flexDirection: 'row',
    gap: 5,
    width: '18%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneInputContainer: {
    backgroundColor: '#fff',
    width: '80%',
    ...shadowStyle,
    paddingHorizontal: 8,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  input: {
    height: 45,
    fontFamily: fonts.Medium,
    width: '100%',
  },
}));
