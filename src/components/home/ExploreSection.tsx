// ExploreSection.tsx
import {View, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles';
import CustomText from '@components/global/CustomText';
import {Colors} from '@unistyles/Constants';
import Icon from '@components/ui/Icon';
import RecommendedList from '@components/List/RecommendedList';

const ExploreSection = () => {
  const [tabSelected, setTabSelected] = useState(1);
  const {styles} = useStyles(homeStyles);

  return (
    <View style={styles.exploreSectionContainer}>
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, styles.leftTab]}
          onPress={() => setTabSelected(1)}>
          <CustomText
            color={tabSelected === 1 ? Colors.text : Colors.lightText}
            fontFamily="Poppins-Medium">
            Recommended
          </CustomText>
        </Pressable>
        <Pressable
          style={[styles.tab, styles.rightTab]}
          onPress={() => setTabSelected(2)}>
          <Icon
            name="bookmark"
            iconFamily="Ionicons"
            color={tabSelected === 2 ? Colors.text : Colors.lightText}
            size={14}
          />
          <CustomText
            color={tabSelected === 2 ? Colors.text : Colors.lightText}
            fontFamily="Poppins-Medium">
            Collection
          </CustomText>
        </Pressable>
      </View>

      {tabSelected === 1 ? <RecommendedList /> : null}
    </View>
  );
};

export default ExploreSection;
