import React, { useState } from 'react';
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
  return (
    <SafeAreaView style={styles.wrapper}>
      <AddTodoModal
        addModalVisible={addModalVisible}
        closeModal={() => setAddModalVisible(false)}
      />
      <ScrollView>
        <Text style={styles.headerText}>Todo List Title</Text>
        <TodoList />
      </ScrollView>
      <HomeFooter addHandler={() => setAddModalVisible(true)} />
      {false && <UndoAddToast />}
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
