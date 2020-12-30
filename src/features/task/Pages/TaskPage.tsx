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
import AddTaskModal from '../components/AddTaskModal';
import HomeFooter from '../components/HomeFooter';
import TaskList from '../components/TaskList';
import UndoAddToast from '../components/UndoAddToast';
import TaskContext from '../state/task.context';
import { addTask, removeTask, restoreState } from '../state/task.reducer';

export default function TaskPage() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [undoModalVisible, setUndoModalVisible] = useState(false);
  const { state, dispatch } = useContext(TaskContext);
  useEffect(() => {
    AsyncStorage.getItem('tasks').then((taskStr) => {
      dispatch(restoreState(JSON.parse(taskStr || '[]')));
    });
  }, []);

  // function createTodo(value: string): void {
  //   setAddModalVisible(false);
  //   setTimeout(() => {
  //     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   }, 200);
  // }
  useEffect(() => {
    if (undoModalVisible) {
      setUndoModalVisible(true);
    }
  }, [undoModalVisible]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <AddTaskModal
        addModalVisible={addModalVisible}
        closeModal={() => setAddModalVisible(false)}
      />
      <ScrollView>
        <Text style={styles.headerText}>Todo List Title</Text>
        <TaskList
        // removeTodo={(todo) => {
        //   setUndoModalVisible(true);
        //   dispatch(removeTodo(todo));
        //   LayoutAnimation.configureNext(
        //     LayoutAnimation.Presets.easeInEaseOut
        //   );
        // }}
        />
      </ScrollView>
      <HomeFooter addHandler={() => setAddModalVisible(true)} />
      {undoModalVisible && (
        <UndoAddToast close={() => setUndoModalVisible(false)} />
      )}
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
