import React, { useContext } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import ThemeContext from '../../theme/state/theme.context';
import TaskContext from '../state/task.context';

export default function BulletMenuItem(props: {
  children: JSX.Element;
  onPress: () => void;
}) {
  const { state: themeState } = useContext(ThemeContext);
  return (
    <TouchableHighlight
      style={{
        paddingHorizontal: 40,
        justifyContent: 'center',
        paddingVertical: 7,
      }}
      underlayColor={themeState.theme.highlightGrayUnderlay}
      onPress={props.onPress}
    >
      {props.children}
    </TouchableHighlight>
  );
}
