import React, { useContext, useState } from 'react';
import { LayoutAnimation, View } from 'react-native';
import TaskContext from '../state/task.context';
import TaskItem from './TaskItem';

export default function TaskList() {
  const { state } = useContext(TaskContext);
  const [reorder, setReorder] = useState<{
    indexTo: number;
    indexFrom: number;
  } | null>(null);
  return (
    <View
      style={
        {
          // borderColor: 'red',
          // borderWidth: 1,
        }
      }
    >
      {state.tasks.map((el, i) => (
        <TaskItem
          key={'task-not-done-' + el.id}
          doneEffectTime={100}
          task={el}
          index={i}
          total={state.tasks.length}
          reorderTo={(index) => {
            console.log(i, ' => ', index);
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            setReorder({
              indexTo: index,
              indexFrom: i,
            });
          }}
        />
      ))}
    </View>
  );
}
