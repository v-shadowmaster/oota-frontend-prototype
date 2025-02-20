import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Animated,
} from 'react-native';
import React from 'react';
import {goBack} from '@utils/NavigationUtils';
import Icon from '@components/ui/Icon';
import CustomText from '@components/global/CustomText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from '@unistyles/Constants';

const RestaurantHeader: React.FC<{title: string; rating: number}> = ({
  title,
  rating,
}) => {
  const insets = useSafeAreaInsets();
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const headerOpacity = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    StatusBar.setBarStyle('dark-content');
  }, []);

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: true},
  );
  return (
    <Animated.View
      style={[
        styles.headerContainer,
        {opacity: headerOpacity},
        {paddingTop: insets.top - 8},
      ]}>
      <View style={styles.headerContent}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Icon
            name="arrow-left"
            iconFamily="MaterialCommunityIcons"
            size={24}
            color="#000"
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <View style={styles.titleRow}>
            <CustomText
              fontFamily="Poppins-Bold"
              fontSize={20}
              style={styles.title}
              color={Colors.text}>
              {title}
            </CustomText>

            <Icon
              name="verified"
              iconFamily="MaterialIcons"
              size={20}
              color="rgb(11, 102, 11)"
            />
          </View>
          //rgb(15, 19, 24)
          <View style={styles.subtitleRow}>
            <CustomText
              style={{fontFamily: 'Poppins-Medium'}}
              fontFamily="Poppins-Medium"
              fontSize={14}
              color="rgb(15, 19, 24)">
              Recommended for you
            </CustomText>

            <View style={styles.dot} />
            <View style={styles.ratingContainer}>
              <CustomText
                fontFamily="Poppins-Medium"
                fontSize={14}
                color="rgb(15, 19, 24"
                style={styles.ratingText}>
                {rating}
              </CustomText>
              <Icon
                name="star"
                iconFamily="MaterialIcons"
                size={16}
                color="#FFD700"
              />
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default RestaurantHeader;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff',

    paddingHorizontal: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2F3336',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 20,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    letterSpacing: 0.25,
    fontFamily: 'Poppins-Bold',
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontFamily: 'Poppins-Medium',
    marginLeft: 2,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#71767B',
    marginHorizontal: 8,
  },
});
