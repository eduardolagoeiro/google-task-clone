import React from 'react';
import { Platform, UIManager } from 'react-native';
import HomeProvider from './src/features/task/state/task.provider';
import TodoPage from './src/features/task/Pages/TaskPage';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default function App() {
  return (
    <HomeProvider>
      <TodoPage />
    </HomeProvider>
  );
}
