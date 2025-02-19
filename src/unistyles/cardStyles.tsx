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
    width: device.width * 0.33,

    aspectRatio: 1,
    marginRight: 6,
    borderRadius: 12,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: '#000',
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: '#000',
    width: '100%',
    height: '75%',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  itemImage: {
    borderWidth: 2,
    borderColor: '#000',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  discountContainer: {
    borderWidth: 2,
    borderColor: '#000',
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
    borderWidth: 2,
    borderColor: '#000',
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
    borderWidth: 2,
    borderColor: '#000',
    padding: 2,
    gap: 2,
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
