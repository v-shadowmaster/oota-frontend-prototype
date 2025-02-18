// MainList.tsx
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  SectionList,
  ViewToken,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import ExploreSection1 from '@components/home/ExploreSection1';
import RestaurantLIst from './RestaurantLIst';
import {useSharedState} from '@features/tabs/SharedContext';
import {useAnimatedStyle, withTiming} from 'react-native-reanimated';

const MainList1 = () => {
  const {scrollY, scrollToTop, scrollYGlobal} = useSharedState();
  const previousScrollY = useRef(0);
  const sectionListRef = useRef<SectionList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event?.nativeEvent?.contentOffset?.y;
    scrollYGlobal.value = currentScrollY;
    previousScrollY.current = currentScrollY;
  };

  const renderItem = ({section}: any) => {
    if (section.title === 'Explore') {
      return <ExploreSection1 />;
    }
    return <RestaurantLIst />;
  };

  return (
    <SectionList
      ref={sectionListRef}
      sections={[
        {title: 'Explore', data: [{}]},
        {title: 'Restaurant', data: [{}]},
      ]}
      renderItem={renderItem}
      renderSectionHeader={() => null}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingTop: 230}} // Adjust this value based on your header height
      stickySectionHeadersEnabled={false}
    />
  );
};

export default MainList1;
