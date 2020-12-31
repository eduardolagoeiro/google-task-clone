import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  ScrollView,
  LayoutAnimation,
} from 'react-native';
import ThemeContext from '../../theme/state/theme.context';
import AddTaskModal from '../components/AddTaskModal';
import EmptyList from '../components/EmptyList';
import RenameTitleModal from '../components/RenameTitleModal';
import TaskFooter from '../components/TaskFooter';
import TaskItem from '../components/TaskItem';
import TaskTitle from '../components/TaskTitle';
import UndoRemoveToast from '../components/UndoRemoveToast';
import TaskContext from '../state/task.context';
import {
  restoreState,
  TASK_INITIAL_STATE,
  updateTilte,
} from '../state/task.reducer';

export default function TaskPage() {
  const { state, dispatch } = useContext(TaskContext);
  const { state: themeState } = useContext(ThemeContext);
  useEffect(() => {
    AsyncStorage.getItem('last_task_state').then(async (lastTaskState) => {
      try {
        if (lastTaskState) {
          dispatch(restoreState(JSON.parse(lastTaskState)));
        }
      } catch (error) {
        console.error(error);
      }
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

  return (
    <SafeAreaView style={styles.wrapper}>
      <AddTaskModal />
      <RenameTitleModal />
      <ScrollView
        style={{
          backgroundColor: themeState.theme.backgroundColor,
        }}
      >
        <TaskTitle />
        {!listIsEmpty ? (
          state.tasks.map((el) => (
            <TaskItem doneEffectTime={100} key={el.id} task={el} />
          ))
        ) : (
          <EmptyList />
        )}
      </ScrollView>
      <TaskFooter />
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
});
