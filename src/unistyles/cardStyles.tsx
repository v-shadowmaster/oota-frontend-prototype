import {createStyleSheet} from 'react-native-unistyles';
import {RFValue} from 'react-native-responsive-fontsize';

export const cardStyles = createStyleSheet(({colors, device, border}) => ({
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 16,
  },
  recommendedContainer: {
    marginTop: 8,
  },
  itemContainer: {
    width: device.width * 0.6,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: colors.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: device.width * 0.4,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  discountContainer: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: '#256FEF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 2,
  },
  discountWrapper: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    zIndex: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  discountContent: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 3,
  },
  discountGradient: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  itemInfo: {
    padding: 12,
    gap: 8,
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 6,
    zIndex: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rating: {
    backgroundColor: '#267E3E',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  distance: {
    color: '#696969',
    fontSize: RFValue(12),
  },
  cuisineText: {
    color: '#696969',
    fontSize: RFValue(12),
    marginTop: 2,
  },
  timeDistance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#696969',
  },
}));
