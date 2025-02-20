import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Animated,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Icon from '@components/ui/Icon';
import CustomText from '@components/global/CustomText';

interface SortingAndFiltersProps {
  menuTitle: string;
  options: string[];
  onSelectFilter?: (filter: string) => void;
  onSort?: () => void;
}

const SortingAndFilters: React.FC<SortingAndFiltersProps> = ({
  menuTitle,
  options,
  onSelectFilter,
  onSort,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = (filter: string) => {
    setSelectedFilter(filter === selectedFilter ? '' : filter);
    onSelectFilter?.(filter);

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.97,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterBar}>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={onSort}
          activeOpacity={0.7}>
          <Icon
            name="sort"
            iconFamily="MaterialIcons"
            size={18}
            color="#0F1419"
          />
          <CustomText style={styles.sortText} fontFamily="Poppins-Medium">
            {menuTitle}
          </CustomText>
          <Icon
            name="arrow-drop-down"
            iconFamily="MaterialIcons"
            size={18}
            color="#0F1419"
          />
        </TouchableOpacity>

        {options?.map((filter: string, index: number) => {
          const isSelected = selectedFilter === filter;
          return (
            <Animated.View
              key={index}
              style={[{transform: [{scale: scaleAnim}]}]}>
              <TouchableOpacity
                onPress={() => handlePress(filter)}
                style={[
                  styles.filterItem,
                  isSelected && styles.filterItemSelected,
                ]}
                activeOpacity={0.7}>
                {isSelected && (
                  <View style={styles.checkIcon}>
                    <Icon
                      name="check"
                      iconFamily="MaterialIcons"
                      size={16}
                      color="#FFFFFF"
                    />
                  </View>
                )}
                //filterTextSelected
                <CustomText
                  style={[
                    isSelected ? styles.filterTextSelected : styles.filterText,
                  ]}
                  fontFamily="Poppins-Regular">
                  {filter}
                </CustomText>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>
      {selectedFilter && <View style={styles.selectedBar} />}
    </View>
  );
};

export default SortingAndFilters;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  filterBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  sortText: {
    marginHorizontal: 6,
    fontSize: 14,
    color: '#0F1419',
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  filterItemSelected: {
    backgroundColor: '#0F1419',
    borderColor: '#0F1419',
  },
  filterText: {
    fontSize: 14,
    color: '#0F1419',
  },
  filterTextSelected: {
    color: '#FFFFFF',
  },
  checkIcon: {
    marginRight: 6,
  },
  selectedBar: {
    height: 2,

    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
