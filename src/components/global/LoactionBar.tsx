import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useStyles} from 'react-native-unistyles';
import {uiStyles} from '@unistyles/uiStyles';
import Icon from '@components/ui/Icon';
import {RFValue} from 'react-native-responsive-fontsize';
import {navigate} from '@utils/NavigationUtils';
import CustomText from './CustomText';
import {screenHeight} from '@unistyles/Constants';

const androidHeight = [screenHeight * 0.12, screenHeight * 0.42];

const iosHeight = [screenHeight * 0.2, screenHeight * 0.5];

interface LocationBarProps {
  address: string;
  isLoading?: boolean;
}

const LoactionBar: React.FC<LocationBarProps> = ({
  address,
  isLoading = false,
}) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(
    () => (Platform.OS == 'ios' ? iosHeight : androidHeight),
    [],
  );

  useEffect(() => {
    setLocation(address);
  }, [address]);
  const [mapHeight, setMapHeight] = useState(snapPoints[0]);

  const handleSheetChanges = useCallback((index: number) => {
    let height = screenHeight * 0.8;
    if (index == 1) {
      height = screenHeight * 0.5;
    }
    setMapHeight(height);
  }, []);

  const [location, setLocation] = useState('');
  const {styles} = useStyles(uiStyles);

  return (
    <View style={uiStyles.absoluteTop}>
      <SafeAreaView />
      <View style={uiStyles.container}>
        <TouchableOpacity style={uiStyles.btn}>
          <Icon
            name="menu-outline"
            iconFamily="Ionicons"
            color="orange"
            size={RFValue(18)}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={uiStyles.locationBar}
          onPress={() => navigate('SelectLocation')}>
          <View style={uiStyles.dot} />

          {isLoading ? (
            <Text style={styles.loadingText}>Fetching location...</Text>
          ) : address ? (
            <Text style={styles.addressText}>{address}</Text>
          ) : (
            <Text style={styles.placeholderText}>No location available</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoactionBar;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
  },
  addressText: {
    fontSize: 16,
    color: '#333',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
});
