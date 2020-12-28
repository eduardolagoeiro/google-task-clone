import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import AddTodoModal from '../components/AddTodoModal';
import HomeFooter from '../components/HomeFooter';
import TodoList from '../components/TodoList';
import UndoAddToast from '../components/UndoAddToast';

export default function Home() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [undoModalVisible, setUndoModalVisible] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    AsyncStorage.getItem('todos').then((todosStr) => {
      setTodos(JSON.parse(todosStr || '[]'));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <AddTodoModal
        createTodo={(value) => {
          setTodos([
            {
              value: value,
              done: false,
              id: parseInt(Math.random().toFixed(10).substring(2)),
              doneEffect: false,
            },
            ...todos.map((el) => ({ ...el })),
          ]);
          setAddModalVisible(false);
        }}
        addModalVisible={addModalVisible}
        closeModal={() => setAddModalVisible(false)}
      />
      <ScrollView>
        <Text style={styles.headerText}>Todo List Title</Text>
        <TodoList
          todos={todos}
          removeTodo={(todoId) => {
            setTodos(
              todos.map((todo) => ({
                ...todo,
                doneEffect: todo.id === todoId || false,
              }))
            );
            setUndoModalVisible(true);
          }}
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
