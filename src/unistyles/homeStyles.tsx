import {createStyleSheet} from 'react-native-unistyles';
import {Platform, StatusBar} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {isBannerHeight} from './Constants';

export const homeStyles = createStyleSheet(({colors, device, border}) => ({
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
    marginTop: 0, // Reduced from 10
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
  },
  flexRowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
    width: '100%', // Use full container width

    bottom: -1,

    aspectRatio: 1,
  },
  rollingText: {
    opacity: 0.5,
  },
  goldenCircle: {
    width: 50,
    position: 'absolute',
    zIndex: -1,
    alignSelf: 'center',
    height: 50,
    borderRadius: border.full,
  },
  profileAvatar: {
    width: 40,
    marginHorizontal: 5,
    height: 40,
    borderRadius: border.full,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#CC152D',
    height: device.height * 0.54,
    width: '100%', // Ensure full width
    justifyContent: 'flex-end',
    position: 'absolute',
    zIndex: -3,
    alignSelf: 'center',
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

    color: '#fff',
  },
  locationSubText: {
    fontSize: RFValue(12),
    marginTop: 2,
    color: '#fff',
    opacity: 0.8,
  },
  headerContainer: {
    position: 'relative',
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  padding: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  searchBarWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
    backgroundColor: 'transparent',
  },
  searchContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
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
    color: '#8A8A8A',
    includeFontPadding: false,
  },
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  graphicsWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  leftTab: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 8,

    borderColor: '#0f0f0f',
    borderWidth: 2,
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  rightTab: {
    backgroundColor: colors.background,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    gap: 4,
  },

  exploreSectionContainer: {
    backgroundColor: colors.background,
    paddingTop: 16,
  },
  searchInputContainer: {
    backgroundColor: '#F3F4F7',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.7,
    elevation: 5,
    shadowRadius: 6,
    shadowColor: colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    width: '100%',
    borderWidth: 0.6,
    borderColor: colors.tertiary,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
}));
