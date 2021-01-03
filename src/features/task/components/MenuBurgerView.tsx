import React, { useContext } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import ThemeContext from '../../theme/state/theme.context';
import TaskContext from '../state/task.context';
import BulletMenuItem from './BulletMenuItem';

export default function MenuBurgerView() {
  const { state, dispatch } = useContext(TaskContext);
  const { state: themeState } = useContext(ThemeContext);
  return (
    <View
      style={{
        backgroundColor: themeState.theme.backgroundColor,
        borderTopStartRadius: 5,
        borderTopEndRadius: 5,
      }}
    >
      <BulletMenuItem
        onPress={() => {
          dispatch({ type: 'CLOSE_BURGER_MENU' });
          dispatch({ type: 'OPEN_RENAME_TITLE' });
        }}
      >
        <Text style={[styles.menuItemText, { color: themeState.theme.text }]}>
          Rename list
        </Text>
      </BulletMenuItem>
      <BulletMenuItem
        onPress={() => {
          dispatch({ type: 'CREATE_NEW_LIST' });
          dispatch({ type: 'CLOSE_BURGER_MENU' });
        }}
      >
        <Text style={[styles.menuItemText, { color: themeState.theme.text }]}>
          Create new list
        </Text>
      </BulletMenuItem>
      <BulletMenuItem
        onPress={() => {
          dispatch({
            type: 'DELETE_LIST',
            payload: { title: state.title },
          });
          dispatch({ type: 'CLOSE_BURGER_MENU' });
        }}
      >
        <Text style={[styles.menuItemText, { color: 'red' }]}>Remove list</Text>
      </BulletMenuItem>
      <View
        style={{
          borderWidth: 1,
          borderColor: themeState.theme.highlightGrayUnderlay,
        }}
      ></View>
      <Text
        style={{
          paddingTop: 10,
          paddingLeft: 15,
          fontSize: 14,
          color: themeState.theme.text,
        }}
      >
        Lists:
      </Text>
      <ScrollView style={{ maxHeight: Dimensions.get('window').height / 3 }}>
        {Object.keys(state.taskListMap).map((title, i) => (
          <BulletMenuItem
            key={'buger-menu-title-list-' + i + '-' + title}
            onPress={() => {
              dispatch({
                type: 'CHANGE_LIST',
                payload: { title },
              });
              dispatch({ type: 'CLOSE_BURGER_MENU' });
            }}
          >
            <Text
              style={[styles.menuItemText, { color: themeState.theme.text }]}
            >
              {title}
            </Text>
          </BulletMenuItem>
        ))}
      </ScrollView>
      <View
        style={{
          paddingBottom: 40,
        }}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuItemText: {
    fontSize: 18,
  },
});
