import {View, Text, Pressable, TextInput} from 'react-native';
import React, {FC, useState, useRef} from 'react';
import {useStyles} from 'react-native-unistyles';
import {phoneStyles} from '@unistyles/phoneStyles';
import CustomText from '@components/global/CustomText';
import {Colors} from '@unistyles/Constants';
import Icon from './Icon';

interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const PhoneInput: FC<PhoneInputProps> = ({
  value,
  onChangeText,
  onBlur,
  onFocus,
}) => {
  const {styles} = useStyles(phoneStyles);
  const inputRef = useRef<TextInput>(null);

  return (
    <Pressable
      style={styles.container}
      onPress={() => inputRef.current?.focus()}>
      <View style={styles.countryPickerContainer}>
        <CustomText variant="h5">📞</CustomText>
        <Icon
          iconFamily="Ionicons"
          name="caret-down-sharp"
          color={Colors.lightText}
          size={18}
        />
      </View>
      <View style={styles.phoneInputContainer}>
        <CustomText
          fontFamily="Poppins-Bold"
          style={{fontFamily: 'Poppins-Bold'}}>
          +91
        </CustomText>
        <TextInput
          ref={inputRef}
          placeholder="Enter Mobile Number"
          keyboardType="phone-pad"
          value={value}
          placeholderTextColor={Colors.lightText}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          style={[
            styles.input,
            {
              flex: 1,
              padding: 10,
              fontSize: 16,
              color: Colors.text,
            },
          ]}
        />
      </View>
    </Pressable>
  );
};

export default PhoneInput;
