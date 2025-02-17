import {createStyleSheet} from 'react-native-unistyles';
import {Platform, StatusBar} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {isBannerHeight} from './Constants';

export const homeStyles = createStyleSheet(({colors, device, border}) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  topHidingContainer: {
    marginTop: isBannerHeight,
    backgroundColor: colors.background,
  },
  topHeader: {
    zIndex: 1,
    alignSelf: 'center',
    paddingHorizontal: 4, // Reduced from 10
    width: '100%',
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
    paddingHorizontal: 4, // Reduced from 40
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 4,
    backgroundColor: '#fff',
  },
  flexRowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  translation: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: border.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  translationIcon: {
    resizeMode: 'contain',
    width: 32,
    height: 32,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: border.full,
    resizeMode: 'contain',
  },
  lottie: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: -20, // Adjust this value to position the animation
    opacity: 0.6, // Add some transparency
  },
  rollingText: {
    opacity: 0.6,
  },
  goldenCircle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileAvatar: {
    width: 40,
    marginHorizontal: 5,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  vegMode: {
    width: '15%',
    top: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switch: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    bottom: 2,
  },
  lottieContainer: {
    backgroundColor: '#E23744', // Zomato red color
    height:
      Platform.OS === 'android'
        ? device.height * 0.32 + (StatusBar.currentHeight || 0)
        : device.height * 0.35,
    justifyContent: 'flex-end',
    position: 'absolute',
    zIndex: -1,
    left: 0,
    right: 0,
    top: -(StatusBar.currentHeight ?? 0), // Adjust for status bar
    overflow: 'hidden',
    width: '100%',
  },
  locationTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  locationMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationMainText: {
    fontSize: RFValue(16),
    fontFamily: 'Poppins-SemiBold',
    color: '#1C1C1C', // Dark text color
  },
  locationSubText: {
    fontSize: RFValue(12),
    fontFamily: 'Poppins-Regular',
    marginTop: 2,
    color: '#666666', // Lighter text color
    opacity: 0.9,
  },
  headerContainer: {
    position: 'relative',
    width: '100%',
    paddingHorizontal: 8, // Consistent padding for all header content
  },
  padding: {
    paddingHorizontal: 12, // Match headerContainer padding
  },
  searchBarWrapper: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    width: '100%',
    backgroundColor: 'transparent',
  },
  searchContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  searchIconContainer: {
    marginRight: 8,
  },
  searchTextContainer: {
    flex: 1,
  },
  searchText: {
    fontSize: RFValue(13),
    fontFamily: 'Poppins-Regular',
    color: '#8A8A8A',
    includeFontPadding: false,
  },
  textContainer: {},
}));
