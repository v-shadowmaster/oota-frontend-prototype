import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { useAppDispatch } from '@states/reduxHook';

const AddButton: React.FC<{item: any; restaurant: any}> = ({
  item,
  restaurant,
}) => {

    const dispatch = useAppDispatch();
  return (
      <>
          <View>
              
      </View>
      </>
  );
};

export default AddButton;

const styles = StyleSheet.create({});
