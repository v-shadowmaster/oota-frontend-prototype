import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import LoactionBar from '@components/global/LoactionBar';
import DraggableMap from '@components/global/DraggableMap';
import {screenHeight} from '@unistyles/Constants';
import GetLocation from 'react-native-get-location';
import {reverseGeocode} from '@utils/mapUtils';

const androidHeight = [screenHeight * 0.12, screenHeight * 0.42];

const iosHeight = [screenHeight * 0.2, screenHeight * 0.5];

const ProfileScreen = () => {
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasValidAddress, setHasValidAddress] = useState(false);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;

    const getLocationAddress = async () => {
      try {
        console.log('Fetching location...');
        const currentLocation = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 30000,
        });

        console.log('Location received:', currentLocation);
        setLatitude(currentLocation.latitude);
        setLongitude(currentLocation.longitude);

        const address = await reverseGeocode(
          currentLocation.latitude,
          currentLocation.longitude,
        );
        console.log('Received address:', address);

        if (address) {
          setLocation(address);
          setHasValidAddress(true);
          setIsLoading(false);
        } else if (retryCount < maxRetries) {
          retryCount++;
          console.log(`Retrying... Attempt ${retryCount}`);
          setTimeout(getLocationAddress, 2000);
        } else {
          setError('Unable to fetch address');
          setIsLoading(false);
        }
      } catch (error: any) {
        console.error('Error:', error);
        setError(error.message || 'Location service error');
        setIsLoading(false);
      }
    };

    getLocationAddress();

    return () => {
      setIsLoading(false);
    };
  }, []);

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
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="orange"
          translucent={false}
        />
        {isLoading ? (
          <Text style={styles.loadingText}>Fetching your location...</Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <Text style={styles.addressText}>
            {location || 'No address found'}
          </Text>
        )}
      </View>

      <LoactionBar
        address={hasValidAddress ? location : ''}
        isLoading={isLoading}
      />
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingText: {
    padding: 10,
    fontSize: 16,
    color: '#666',
  },
  addressText: {
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    padding: 10,
    fontSize: 16,
    color: 'red',
  },
});
