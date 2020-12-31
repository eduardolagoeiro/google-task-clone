import React from 'react';
import { Platform, UIManager } from 'react-native';
import TaskProvider from './src/features/task/state/task.provider';
import TaskPage from './src/features/task/pages/TaskPage';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default function App() {
  return (
    <TaskProvider>
      <TaskPage />
    </TaskProvider>
  );
}
