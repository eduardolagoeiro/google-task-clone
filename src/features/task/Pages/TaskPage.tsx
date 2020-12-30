import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import AddTaskModal from '../components/AddTaskModal';
import HomeFooter from '../components/HomeFooter';
import TaskList from '../components/TaskList';
import UndoRemoveToast from '../components/UndoRemoveToast';
import TaskContext from '../state/task.context';
import { restoreState } from '../state/task.reducer';

export default function TaskPage() {
  const { state, dispatch } = useContext(TaskContext);
  useEffect(() => {
    AsyncStorage.getItem('tasks').then((taskStr) => {
      dispatch(restoreState(JSON.parse(taskStr || '[]')));
    });
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <AddTaskModal />
      <ScrollView>
        <Text style={styles.headerText}>Todo List Title</Text>
        <TaskList />
      </ScrollView>
      <HomeFooter />
      {state.isUndoModalOpen && <UndoRemoveToast />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  headerText: {
    paddingLeft: 64,
    paddingTop: 14,
    paddingBottom: 20,
    fontSize: 32,
  },
});
