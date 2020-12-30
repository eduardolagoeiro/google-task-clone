import React, { useContext, useState } from 'react';
import { Text, Animated, Pressable } from 'react-native';
import TaskContext from '../state/task.context';

export default function UndoAddToast() {
  const [fadeInUndoModal] = useState(new Animated.Value(0));

  const { state } = useContext(TaskContext);
  Animated.timing(fadeInUndoModal, {
    duration: 200,
    toValue: 1,
    useNativeDriver: true,
  }).start();
  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 108,
        width: '100%',
        backgroundColor: 'black',
        borderColor: 'transparent',
        borderWidth: 0,
        height: 50,
        borderRadius: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
        opacity: fadeInUndoModal,
      }}
    >
      <Text
        style={{
          color: 'white',
        }}
      >
        {state.removedTasks.length} task done
      </Text>
      <Pressable onPress={() => {}}>
        <Text
          style={{
            color: '#93AFEF',
            fontWeight: 'bold',
          }}
        >
          Undo
        </Text>
      </Pressable>
    </Animated.View>
  );
}
