import React, { useContext } from 'react';
import { View, Text, Switch } from 'react-native';
import { NamedColors } from '../../theme/Colors';
import ThemeContext from '../../theme/state/theme.context';
import TaskContext from '../state/task.context';
import BulletMenuItem from './BulletMenuItem';

export default function BulletMenuView() {
  const { dispatch } = useContext(TaskContext);
  const { state: themeState, dispatch: themeDispatch } = useContext(
    ThemeContext
  );
  function changeThemMode() {
    themeDispatch({
      type: 'SET_THEME_MODE',
      payload: {
        mode: themeState.mode === 'light' ? 'dark' : 'light',
      },
    });
  }
  return (
    <View
      style={{
        backgroundColor: themeState.theme.backgroundColor,
        paddingBottom: 100,
        borderTopStartRadius: 5,
        borderTopEndRadius: 5,
      }}
    >
      <BulletMenuItem onPress={changeThemMode}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ color: themeState.theme.text, fontSize: 18 }}>
            Dark mode
          </Text>
          <Switch
            trackColor={{
              false: NamedColors.Gray500,
              true: themeState.theme.primaryAccent,
            }}
            thumbColor={
              themeState.mode === 'dark'
                ? themeState.theme.primary
                : NamedColors.Gray100
            }
            ios_backgroundColor={NamedColors.Gray500}
            onValueChange={changeThemMode}
            value={themeState.mode === 'dark'}
          />
        </View>
      </BulletMenuItem>
      <BulletMenuItem
        onPress={() => {
          dispatch({ type: 'CLOSE_BULLET_MENU' });
          dispatch({ type: 'OPEN_RENAME_TITLE' });
        }}
      >
        <Text
          style={{
            color: themeState.theme.text,
            fontSize: 18,
          }}
        >
          Rename title
        </Text>
      </BulletMenuItem>
    </View>
  );
}
