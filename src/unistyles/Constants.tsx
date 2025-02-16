import {Dimensions} from 'react-native';

export const BOTTOM_TAB_HEIGHT = 90;
export const screenHeight = Dimensions.get('screen').height;
export const screenWidth = Dimensions.get('screen').width;
export const isBannerHeight = screenHeight * 0.4;

export const Colors = {
  primary: '#E23744',
  primary_light: '#EF4F5F',
  text: '#222',
  active_light: '#ecfaf1',
  secondary: '#2d2d2d',
  tertiary: '#f4f4f2',
  background: '#fff',
  background_light: '#f4f6fc',
  border: '#e5e9ef',
  lightText: '#9197a6',
  active: '#019a51',
  dark: '#18171c',
};

export enum Fonts {
  Regular = 'Poppins-Regular',
  Medium = 'Poppins-Medium',
  Light = 'Poppins-Light',
  SemiBold = 'Poppins-Bold',
  Bold = 'Poppins-ExtraBold',
}

export const lightColors = [
  'rgba(255,255,255,1)',
  'rgba(255,255,255,0.9)',
  'rgba(255,255,255,0.7)',
  'rgba(255,255,255,0.6)',
  'rgba(255,255,255,0.5)',
  'rgba(255,255,255,0.4)',
  'rgba(255,255,255,0.003)',
];

export const darkWeatherColors = [
  'rgba(54,67,92,1)',
  'rgba(54, 67, 92, 0.9)',
  'rgba(54,67,92,0.8)',
  'rgba(54,67,92,0.2)',
  'rgba(54,67,92,0.0)',
];
