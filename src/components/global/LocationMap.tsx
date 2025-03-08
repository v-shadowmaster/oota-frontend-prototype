// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   ActivityIndicator,
//   StyleSheet,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';
// import MapView, {Marker} from 'react-native-maps';
// // Importing react-native-geolocation-service which offers improved performance and accuracy
// import Geolocation from 'react-native-geolocation-service';

// const LocationMap = () => {
//   // State to store user's location and loading status
//   const [location, setLocation] = useState(null);
//   const [loading, setLoading] = useState(true);

//   /*
//    * Function to request location permission on Android.
//    * iOS handles location permissions automatically (with proper Info.plist configuration).
//    */
//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Access Required',
//             message:
//               'This app needs access to your location to show your current position on the map.',
//             buttonPositive: 'OK',
//             buttonNegative: 'Cancel',
//           },
//         );
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn('Permission error:', err);
//         return false;
//       }
//     }
//     return true; // iOS automatically grants permission if configured properly
//   };

//   /**
//    * useEffect hook runs on component mount to fetch the user's current location.
//    */
//   useEffect(() => {
//     const fetchLocation = async () => {
//       const hasPermission = await requestLocationPermission();
//       if (!hasPermission) {
//         // If permission is not granted, stop the loader and you can add additional error handling here.
//         setLoading(false);
//         return;
//       }

//       // Get the current position with high accuracy settings.
//       Geolocation.getCurrentPosition(
//         position => {
//           // Successfully obtained the user's location; update state.
//           setLocation(position.coords);
//           setLoading(false);
//         },
//         error => {
//           // Log any errors and stop the loader.
//           console.warn('Location error:', error);
//           setLoading(false);
//         },
//         {
//           enableHighAccuracy: true, // Use GPS for high accuracy
//           timeout: 15000, // Wait up to 15 seconds
//           maximumAge: 10000, // Accept cached location up to 10 seconds old
//         },
//       );
//     };

//     fetchLocation();
//   }, []);

//   // If still loading, show an activity indicator (spinner)
//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   // If location is not available after loading, display an error message
//   if (!location) {
//     return (
//       <View style={styles.loaderContainer}>
//         <Text>Unable to fetch location</Text>
//       </View>
//     );
//   }

//   // Once location is fetched, render a MapView with a marker at the user's current location.
//   return (
//     <MapView
//       style={styles.map}
//       initialRegion={{
//         latitude: location.latitude,
//         longitude: location.longitude,
//         latitudeDelta: 0.01, // Smaller delta values zoom in more
//         longitudeDelta: 0.01,
//       }}
//       showsUserLocation={true} // Automatically shows the blue dot for the user's location
//     >
//       <Marker
//         coordinate={{
//           latitude: location.latitude,
//           longitude: location.longitude,
//         }}
//         title="Your Location"
//         description="You are here"
//       />
//     </MapView>
//   );
// };

// const styles = StyleSheet.create({
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   map: {
//     flex: 1,
//   },
// });

// export default LocationMap;
