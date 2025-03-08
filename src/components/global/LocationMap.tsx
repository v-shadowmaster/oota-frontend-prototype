import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MapView, {Marker, Region} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

// Define the interface for the coordinates returned by Geolocation
interface Coordinates {
  latitude: number;
  longitude: number;
  altitude?: number | null;
  accuracy?: number;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
}

// Define the interface for the response returned by Geolocation.getCurrentPosition
interface GeolocationResponse {
  coords: Coordinates;
  timestamp: number;
}

// Define a local interface for the error object returned in the error callback.
interface GeolocationError {
  code: number;
  message: string;
}

const LocationMap: React.FC = () => {
  // State to store the user's location and loading status.
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Requests location permission on Android.
   * iOS permissions must be configured in Info.plist.
   */
  const requestLocationPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message:
              'This app needs access to your location to show your current position on the map.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission error:', err);
        return false;
      }
    }
    return true; // iOS automatically handles permission if properly configured.
  };

  /**
   * useEffect hook runs once when the component mounts to fetch the user's location.
   */
  useEffect(() => {
    const fetchLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setLoading(false);
        return;
      }

      // Use high accuracy settings to get the current position.
      Geolocation.getCurrentPosition(
        (position: GeolocationResponse) => {
          // Update state with the fetched coordinates.
          setLocation(position.coords);
          setLoading(false);
        },
        (error: GeolocationError) => {
          // Log any errors and stop the loader.
          console.warn('Location error:', error);
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000, // Timeout after 15 seconds.
          maximumAge: 10000, // Accept cached location up to 10 seconds old.
        },
      );
    };

    fetchLocation();
  }, []);

  // Display an activity indicator while the location is being fetched.
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // If the location is unavailable, display an error message.
  if (!location) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Unable to fetch location</Text>
      </View>
    );
  }

  // Define the region for the map based on the fetched location.
  const region: Region = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.01, // Smaller delta zooms in more.
    longitudeDelta: 0.01,
  };

  // Render the map with a marker at the user's location.
  return (
    <MapView style={styles.map} initialRegion={region} showsUserLocation={true}>
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        title="Your Location"
        description="You are here"
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
});

export default LocationMap;
