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
import AddTodoModal from '../components/AddTodoModal';
import HomeFooter from '../components/HomeFooter';
import TodoList from '../components/TodoList';
import UndoAddToast from '../components/UndoAddToast';
import HomeContext from '../state/home.context';
import { addTodo, removeTodo, restoreState } from '../state/home.reducer';

export default function Home() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [undoModalVisible, setUndoModalVisible] = useState(false);
  const { state, dispatch } = useContext(HomeContext);
  useEffect(() => {
    AsyncStorage.getItem('todos').then((todosStr) => {
      dispatch(restoreState(JSON.parse(todosStr || '[]')));
    });
  }, []);

  function createTodo(value: string): void {
    setAddModalVisible(false);
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      dispatch(
        addTodo({
          value: value,
          done: false,
          id: parseInt(Math.random().toFixed(10).substring(2)),
        })
      );
    }, 200);
  }
  useEffect(() => {
    if (undoModalVisible) {
      setUndoModalVisible(true);
    }
  }, [undoModalVisible]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <AddTodoModal
        createTodo={createTodo}
        addModalVisible={addModalVisible}
        closeModal={() => setAddModalVisible(false)}
      />
      <ScrollView>
        <Text style={styles.headerText}>Todo List Title</Text>
        <TodoList
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
