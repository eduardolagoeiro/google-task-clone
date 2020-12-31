import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  LayoutAnimation,
} from 'react-native';
import ThemeContext from '../../theme/state/theme.context';
import AddTaskModal from '../components/AddTaskModal';
import EmptyList from '../components/EmptyList';
import HomeFooter from '../components/HomeFooter';
import TaskItem from '../components/TaskItem';
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

  const [listIsEmpty, setlistIsEmpty] = useState(true);

  useEffect(() => {
    const newListIsEmptyValue = state.tasks.length === 0;
    if (!newListIsEmptyValue) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    setlistIsEmpty(newListIsEmptyValue);
  }, [state.tasks]);

  const { state: themeState } = useContext(ThemeContext);

  return (
    <SafeAreaView style={styles.wrapper}>
      <AddTaskModal />
      <ScrollView>
        <Text style={styles.headerText}>Todo List Title</Text>
        {!listIsEmpty ? (
          state.tasks.map((el) => (
            <TaskItem doneEffectTime={100} key={el.id} task={el} />
          ))
        ) : (
          <EmptyList />
        )}
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
