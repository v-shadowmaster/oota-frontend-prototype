import React, {memo} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from '@components/ui/Icon';
import HorizontalLine from '@components/ui/HorizontalLine';
import ScalePress from '@components/ui/ScalePress';
import {navigate} from '@utils/NavigationUtils';

interface RestaurantCardProps {
  item: {
    id: number;
    name: string;
    imageUrl: any;
    time: string;
    distance: string;
    discount: string;
    discountAmount: string;
    rating: number;
    isBookmarked: boolean;
  };
}

//rgb(2, 2, 2)

const RestaurantCard: React.FC<RestaurantCardProps> = memo(({item}) => {
  const RatingBadge = memo(() => (
    <View style={styles.ratingBadge}>
      <Icon iconFamily="MaterialIcons" name="star" size={14} color="#F59E0B" />
      <Text style={styles.ratingText}>{item.rating}</Text>
    </View>
  ));

  const DiscountBadge = memo(() => (
    <View style={styles.discountBadge}>
      <Icon
        iconFamily="MaterialIcons"
        name="local-offer"
        size={12}
        color="#047857"
      />
      <Text style={styles.discountText}>{item.discount}</Text>
    </View>
  ));

  return (
    <>
      <ScalePress
        style={styles.container}
        onPress={() => {
          navigate('RestaurantScreen', {item: item});
        }}>
        {/* Image container with overlaid elements */}
        <View style={styles.imageContainer}>
          <Image
            source={item.imageUrl}
            style={styles.image}
            resizeMode="cover"
          />
          {/* Overlaid elements */}
          <View style={styles.imageOverlay}>
            <View style={styles.topOverlay}>
              <DiscountBadge />
              <Pressable
                style={styles.bookmarkButton}
                hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}>
                <Icon
                  iconFamily="MaterialIcons"
                  name={item.isBookmarked ? 'bookmark' : 'bookmark-outline'}
                  size={24}
                  color={item.isBookmarked ? 'rgb(2, 2, 2)' : '#FFFFFF'}
                />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Content section */}
        <View style={styles.contentContainer}>
          {/* Restaurant name and rating */}
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>{item.name}</Text>
            <RatingBadge />
          </View>

          <View style={styles.headerContainer}>
            {/* Time and distance info */}
            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Icon
                  iconFamily="MaterialIcons"
                  name="schedule"
                  size={16}
                  color="#6B7280"
                />
                <Text style={styles.deliveryText}>{item.time}</Text>
              </View>
              <View style={styles.metaItem}>
                <Icon
                  iconFamily="MaterialCommunityIcons"
                  name="bike-fast"
                  size={16}
                  color="#6B7280"
                />
                <Text style={styles.deliveryText}>{item.distance}</Text>
              </View>
            </View>

            {/* Offer amount */}
            <View style={styles.offerContainer}>
              <Icon
                iconFamily="MaterialIcons"
                name="local-offer"
                size={14}
                color="#DC2626"
              />
              <Text style={styles.offerText}>
                Offers up to{' '}
                <Text style={styles.offerAmount}>{item.discountAmount}</Text>{' '}
                only
              </Text>
            </View>
          </View>
        </View>
      </ScalePress>
      <HorizontalLine />
    </>
  );
});

const {width} = Dimensions.get('window');
const imageWidth = width - 32; // Full width minus margins
const aspectRatio = 4 / 2.5; // Standard aspect ratio for food images
const imageHeight = imageWidth / aspectRatio;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  pressed: {
    opacity: 0.95,
  },
  imageContainer: {
    width: imageWidth,
    height: imageHeight,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  topOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 12,
  },
  contentContainer: {
    padding: 12,
    gap: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    color: '#92400E',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 4,
  },
  discountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    color: '#047857',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  bookmarkButton: {
    marginLeft: 'auto',
  },
  deliveryText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  offerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  offerText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '500',
  },
  offerAmount: {
    fontWeight: '700',
  },
});

RestaurantCard.displayName = 'RestaurantCard';

export default RestaurantCard;
