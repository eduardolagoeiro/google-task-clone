import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import TaskContext from '../state/task.context';
import TaskItem from './TaskItem';

export default function TaskList() {
  const addTaskEffectTime = 150;

  const { state } = useContext(TaskContext);

  return state.tasks.length > 0 ? (
    <View>
      {state.tasks.map((el) => (
        <TaskItem doneEffectTime={addTaskEffectTime} key={el.id} task={el} />
      ))}
    </View>
  ) : (
    <Text>Sem items</Text>
  );
}
