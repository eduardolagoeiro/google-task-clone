import React, { useContext, useState } from 'react';
import { LayoutAnimation, View } from 'react-native';
import TaskContext from '../state/task.context';
import TaskItem from './TaskItem';

export default function TaskList() {
  const { state } = useContext(TaskContext);

  const [reorder, setReorder] = useState<{
    fromIndex: number;
    toIndex: number;
  } | null>(null);

  function top(
    reorder: {
      fromIndex: number;
      toIndex: number;
    } | null,
    index: number
  ): 0 | 1 | -1 {
    if (reorder) {
      if (reorder.fromIndex !== index) {
        if (reorder.fromIndex > reorder.toIndex) {
          if (reorder.toIndex <= index && reorder.fromIndex > index) {
            return 1;
          }
        } else if (reorder.fromIndex < reorder.toIndex) {
          if (reorder.fromIndex < index && index <= reorder.toIndex) {
            return -1;
          }
        }
      }
    }
    return 0;
  }

  return (
    <View style={{}}>
      {state.tasks.map((el, i) => (
        <TaskItem
          key={'task-not-done-' + el.id}
          doneEffectTime={200}
          offset={top(reorder, i)}
          task={el}
          index={i}
          total={state.tasks.length}
          reorderTo={(index, animate) => {
            if (animate !== false) {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
            }
            if (index !== i) {
              setReorder({
                fromIndex: i,
                toIndex: index,
              });
            } else {
              setReorder(null);
            }
          }}
        />
      ))}
    </View>
  );
}
