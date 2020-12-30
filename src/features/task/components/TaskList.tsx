import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import TaskContext from '../state/task.context';
import TaskItem from './TaskItem';

export default function TodoList() {
  const addTodoEffectTime = 150;

  const { state } = useContext(TaskContext);

  return state.todos.length > 0 ? (
    <View>
      {state.todos.map((el, i) => (
        <TaskItem doneEffectTime={addTodoEffectTime} key={el.id} todo={el} />
      ))}
    </View>
  ) : (
    <Text>Sem items</Text>
  );
}
