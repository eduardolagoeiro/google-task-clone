import React, { useContext, useState } from 'react';
import { Text, Animated, Pressable } from 'react-native';
import ThemeContext from '../../theme/state/theme.context';
import TaskContext from '../state/task.context';

export default function UndoRemoveToast() {
  const [fadeInUndoModal] = useState(new Animated.Value(0));
  const { state: themeState } = useContext(ThemeContext);
  const { state, dispatch } = useContext(TaskContext);
  Animated.timing(fadeInUndoModal, {
    duration: 200,
    toValue: 1,
    useNativeDriver: true,
  }).start();
  return (
    <Animated.View
      style={{
        alignSelf: 'center',
        position: 'absolute',
        bottom: 108,
        width: '95%',
        backgroundColor: themeState.theme.contrast,
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
          color: themeState.theme.backgroundColor,
        }}
      >
        {state.removedTasks.length} task(s) done
      </Text>
      <Pressable
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        onPress={() => dispatch({ type: 'UNDO_REMOVE_TASK' })}
      >
        <Text
          style={{
            color: themeState.theme.primaryAccent,
            fontWeight: 'bold',
          }}
        >
          Undo
        </Text>
      </Pressable>
    </Animated.View>
  );
}
