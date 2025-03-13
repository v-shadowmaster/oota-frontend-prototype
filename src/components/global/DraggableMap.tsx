import {StyleSheet, Text, View} from 'react-native';
import React, {FC, memo, useRef, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import MapView, {Marker, Region} from 'react-native-maps';
import {customMapStyle, indiaIntialRegion} from '@utils/CustomMap';
import {reverseGeocode} from '@utils/mapUtils';

const DraggableMap: FC<{ height: number }> = ({ height }) => {
    
    const [latitude,setLatitude] = useIs
  const isFocused = useIsFocused();
  const [markers, setMarkers] = useState<any>([]);
  const mapRef = useRef<MapView>(null);
  const Max_distance_threshold = 100000;

  const handleRegionChangeComplete = async (newRegion: Region) => {
    const address = await reverseGeocode(
      newRegion.latitude,
      newRegion.longitude,
      );
      
      const userlocation = {
          latitude : 
      }
  };

  return (
    <View style={{height: height, width: '100%'}}>
      <MapView
        ref={mapRef}
        maxZoomLevel={16}
        minZoomLevel={12}
        pitchEnabled={false}
        onRegionChangeComplete={handleRegionChangeComplete}
        style={{flex: 1}}
        initialRegion={indiaIntialRegion}
        provider="google"
        showsMyLocationButton={false}
        showsCompass={false}
        showsIndoors={false}
        showsIndoorLevelPicker={false}
        showsTraffic={false}
        showsScale={false}
        showsBuildings={false}
        showsPointsOfInterest={false}
        customMapStyle={customMapStyle}
        showsUserLocation={true}></MapView>
    </View>
  );
};

export default memo(DraggableMap);

const styles = StyleSheet.create({});
