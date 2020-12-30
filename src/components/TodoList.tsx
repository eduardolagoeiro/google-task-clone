import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import HomeContext from '../state/home.context';
import TodoItem from './TodoItem';

export default function TodoList() {
  const addTodoEffectTime = 150;

  const { state } = useContext(HomeContext);

  return state.todos.length > 0 ? (
    <View>
      {state.todos.map((el, i) => (
        <TodoItem doneEffectTime={addTodoEffectTime} key={el.id} todo={el} />
      ))}
    </View>
  ) : (
    <Text>Sem items</Text>
  );
}
