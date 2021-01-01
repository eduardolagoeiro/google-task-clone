import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { NamedColors } from '../../theme/Colors';
import ThemeContext from '../../theme/state/theme.context';
import TaskContext from '../state/task.context';
import BulletMenuItem from './BulletMenuItem';

export default function BulletMenuView() {
  const { state, dispatch } = useContext(TaskContext);
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
        borderTopStartRadius: 5,
        borderTopEndRadius: 5,
      }}
    >
      <BulletMenuItem onPress={changeThemMode} paddingTop={20}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={[styles.menuItemText, { color: themeState.theme.text }]}>
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
        <Text style={[styles.menuItemText, { color: themeState.theme.text }]}>
          Rename title
        </Text>
      </BulletMenuItem>
      <BulletMenuItem
        disabled={state.doneTasks.length === 0}
        onPress={() => {
          dispatch({ type: 'CLOSE_BULLET_MENU' });
          dispatch({
            type: 'REMOVE_DONE_TASK',
          });
        }}
      >
        <Text
          style={[
            styles.menuItemText,
            {
              paddingBottom: 20,
              color:
                state.doneTasks.length === 0
                  ? themeState.theme.disabled
                  : themeState.theme.text,
            },
          ]}
        >
          Remove done tasks
        </Text>
      </BulletMenuItem>
    </View>
  );
}

const styles = StyleSheet.create({
  menuItemText: {
    fontSize: 18,
  },
});
