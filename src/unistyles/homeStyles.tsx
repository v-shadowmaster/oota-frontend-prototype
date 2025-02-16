import {createStyleSheet} from 'react-native-unistyles';
import {Colors} from './Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {isBannerHeight} from './Constants';
import {Platform} from 'react-native';

export const homeStyles = createStyleSheet(({colors, device}) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topHidingContainer: {
    marginTop: isBannerHeight,
    backgroundColor: colors.background,
  },
  topHeader: {
    zIndex: 1,
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  animatedText: {
    fontSize: RFValue(10.5),
    fontFamily: 'Poppins-Bold',
  },
  animatedSubText: {
    fontSize: RFValue(7),
    lineHeight: 9,
    fontFamily: 'Poppins-Bold',
  },
  exploreContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
}));
