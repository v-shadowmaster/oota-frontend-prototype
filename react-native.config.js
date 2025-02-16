module.exports = {
  project: {
    ios: {},
    android: {},
  },
  'react-native-vector-icons': {
    platforms: {
      ios: null,
      android: {}, // Add Android configuration
    },
  },
  assets: ['./src/assets/fonts/'],
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
        android: {},
      },
    },
  },
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer');
  },
  getSourceExts() {
    return ['ts', 'tsx', 'js', 'jsx', 'json']; // Added additional extensions
  },
};
