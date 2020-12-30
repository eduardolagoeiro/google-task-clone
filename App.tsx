import React from 'react';
import { Platform, UIManager } from 'react-native';
import HomeProvider from './src/state/home.provider';
import Home from './src/pages/Home';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default function App() {
  return (
    <HomeProvider>
      <Home />
    </HomeProvider>
  );
}
