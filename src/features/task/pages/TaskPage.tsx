import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  ScrollView,
  LayoutAnimation,
  View,
  LayoutRectangle,
  Dimensions,
} from 'react-native';
import ThemeContext from '../../theme/state/theme.context';
import AddTaskModal from '../components/AddTaskModal';
import DoneTaskView from '../components/DoneTaskView';
import EmptyList from '../components/EmptyList';
import RenameTitleModal from '../components/RenameTitleModal';
import TaskFooter from '../components/TaskFooter';
import TaskList from '../components/TaskList';
import TaskTitle from '../components/TaskTitle';
import UndoRemoveToast from '../components/UndoRemoveToast';
import TaskContext from '../state/task.context';
import { restoreState } from '../state/task.reducer';

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

  const [completeLayout, setCompleteLayout] = useState<LayoutRectangle | null>(
    null
  );
  const scrollView = useRef<ScrollView>(null);

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
        ref={scrollView}
        style={{
          backgroundColor: themeState.theme.backgroundColor,
        }}
      >
        <TaskTitle />
        {listIsEmpty && state.doneTasks.length === 0 ? (
          <EmptyList />
        ) : (
          <TaskList />
        )}
        {state.doneTasks.length > 0 && (
          <>
            <View
              style={{
                borderBottomColor: themeState.theme.disabled,
                borderBottomWidth: 1,
              }}
            />
            <View
              onLayout={(event) => setCompleteLayout(event.nativeEvent.layout)}
            >
              <DoneTaskView
                onOpen={() =>
                  completeLayout &&
                  Dimensions.get('window').height / 2 < completeLayout.y &&
                  scrollView.current?.scrollTo({
                    x: 0,
                    y: completeLayout.y - Dimensions.get('window').height / 2,
                    animated: true,
                  })
                }
              />
            </View>
          </>
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
