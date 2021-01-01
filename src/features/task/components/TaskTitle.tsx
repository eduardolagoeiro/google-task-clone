import React, { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import ThemeContext from '../../theme/state/theme.context';
import TaskContext from '../state/task.context';

export default function TaskTitle() {
  const { state, dispatch } = useContext(TaskContext);
  const { state: themeState } = useContext(ThemeContext);
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          dispatch({ type: 'OPEN_RENAME_TITLE' });
        }}
      >
        <Text
          style={{
            paddingLeft: 64,
            paddingTop: 14,
            paddingRight: 24,
            paddingBottom: 20,
            fontSize: 32,
            color: themeState.theme.contrast,
          }}
        >
          {state.title}
        </Text>
      </TouchableOpacity>
    </>
  );
}
