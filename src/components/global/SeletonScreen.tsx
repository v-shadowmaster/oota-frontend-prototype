import {resetAndNavigate} from '@utils/NavigationUtils';
import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SeletonScreen: React.FC = () => {
  // Shared animated value for shimmer effect
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      resetAndNavigate('UserBottomTab');
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // Loop the animation continuously
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [shimmerAnim]);

  // Interpolate translateX from -SCREEN_WIDTH to +SCREEN_WIDTH
  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-SCREEN_WIDTH, SCREEN_WIDTH],
  });

  // Helper component to render a shimmer overlay on a placeholder
  const renderShimmer = () => (
    <Animated.View style={[styles.shimmerOverlay, {transform: [{translateX}]}]}>
      <LinearGradient
        colors={['transparent', 'rgba(255,255,255,0.7)', 'transparent']}
        style={StyleSheet.absoluteFill}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
      />
    </Animated.View>
  );

  // Render a single skeleton card for list items
  const renderSkeletonItem = () => (
    <View style={styles.skeletonItem}>
      <View style={styles.imagePlaceholder}>{renderShimmer()}</View>
      <View style={styles.textContainer}>
        <View style={[styles.textPlaceholder, {width: '70%'}]}>
          {renderShimmer()}
        </View>
        <View style={[styles.textPlaceholder, {width: '50%'}]}>
          {renderShimmer()}
        </View>
      </View>
    </View>
  );

  // Create an array of placeholder items (you can adjust count as needed)
  const skeletonData = Array.from({length: 6});

  return (
    <View style={styles.container}>
      {/* Header Banner Skeleton */}
      <View style={styles.headerSkeleton}>{renderShimmer()}</View>
      {/* List of Skeleton Items */}
      <FlatList
        data={skeletonData}
        keyExtractor={(_, index) => String(index)}
        renderItem={renderSkeletonItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SeletonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerSkeleton: {
    height: 200,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  skeletonItem: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    padding: 16,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#cfcfcf',
    borderRadius: 8,
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  textPlaceholder: {
    height: 15,
    backgroundColor: '#cfcfcf',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 100,
  },
  listContainer: {
    paddingBottom: 16,
  },
});
