import React from 'react';
import {StyleSheet} from 'react-native';
import Navigation from '@navigation/Navigation';
import '@unistyles/unistyles';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from '@states/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({});
