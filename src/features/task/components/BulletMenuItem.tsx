import React, { useContext } from 'react';
import { TouchableHighlight } from 'react-native';
import ThemeContext from '../../theme/state/theme.context';

export default function BulletMenuItem(props: {
  children: JSX.Element;
  paddingTop?: number;
  onPress?: () => void;
  disabled?: boolean;
}) {
  const { state: themeState } = useContext(ThemeContext);
  return (
    <TouchableHighlight
      disabled={props.disabled}
      style={{
        paddingHorizontal: 40,
        justifyContent: 'center',
        paddingTop: props.paddingTop || 7,
        paddingBottom: 7,
      }}
      underlayColor={themeState.theme.highlightGrayUnderlay}
      onPress={props.onPress}
    >
      {props.children}
    </TouchableHighlight>
  );
}
