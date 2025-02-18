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
  },
  animatedSubText: {
    fontSize: RFValue(7),
    lineHeight: 9,
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
    width: '100%',
    bottom: -1, // Adjust this value to position the animation
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
    backgroundColor: '#E23744',
    height: device.height * 0.5,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    zIndex: 1,
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
    paddingHorizontal: 12, // Match headerContainer padding
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
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
  },

  rightTab: {
    backgroundColor: colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  exploreSectionContainer: {
    backgroundColor: colors.background,
    paddingTop: 16,
  },
}));
