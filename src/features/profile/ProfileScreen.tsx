import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import LoactionBar from '@components/global/LoactionBar';
import DraggableMap from '@components/global/DraggableMap';
import {screenHeight} from '@unistyles/Constants';

const androidHeight = [screenHeight * 0.12, screenHeight * 0.42];

const iosHeight = [screenHeight * 0.2, screenHeight * 0.5];

const ProfileScreen = () => {
  const [location, setLocation] = useState('');

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(
    () => (Platform.OS == 'ios' ? iosHeight : androidHeight),
    [],
  );

  const [mapHeight, setMapHeight] = useState(snapPoints[0]);

  const handleSheetChanges = useCallback((index: number) => {
    let height = screenHeight * 0.8;
    if (index == 1) {
      height = screenHeight * 0.5;
    }
    setMapHeight(height);
  }, []);

  return (
    <>
      <View>
        <StatusBar
          barStyle="light-content"
          backgroundColor="orange"
          translucent={false}
        />
        <LoactionBar />
        <DraggableMap height={mapHeight} />
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
