import React, { useContext } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
  Switch,
} from 'react-native';
import SimpleModal from '../../common/components/SimpleModal';
import MenuBullet from '../../icons/components/MenuBullet';
import MenuBurger from '../../icons/components/MenuBurger';
import { NamedColors } from '../../theme/Colors';
import ThemeContext from '../../theme/state/theme.context';
import TaskContext from '../state/task.context';

export default function TaskFooter() {
  const { state, dispatch } = useContext(TaskContext);
  const { state: themeState, dispatch: themeDispatch } = useContext(
    ThemeContext
  );
  return (
    <>
      <SimpleModal
        closeFunction={() => {
          dispatch({ type: 'CLOSE_BULLET_MENU' });
        }}
        visible={state.isBulletMenuOpen}
      >
        <View
          style={{
            backgroundColor: themeState.theme.backgroundColor,
            paddingTop: 30,
            paddingBottom: 100,
            paddingHorizontal: 40,
            borderTopStartRadius: 5,
            borderTopEndRadius: 5,
          }}
        >
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
              onValueChange={() =>
                themeDispatch({
                  type: 'SET_THEME_MODE',
                  payload: {
                    mode: themeState.mode === 'light' ? 'dark' : 'light',
                  },
                })
              }
              value={themeState.mode === 'dark'}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              dispatch({ type: 'CLOSE_BULLET_MENU' });
              dispatch({ type: 'OPEN_RENAME_TITLE' });
            }}
          >
            <Text
              style={{
                color: themeState.theme.text,
                fontSize: 18,
                marginTop: 14,
              }}
            >
              Rename title
            </Text>
          </TouchableOpacity>
        </View>
      </SimpleModal>
      <View
        style={[
          styles.footer,
          {
            backgroundColor: themeState.theme.backgroundColorLight,
          },
          themeState.mode === 'dark'
            ? {}
            : {
                shadowOffset: {
                  height: 0,
                  width: 0,
                },
                shadowOpacity: 0.4,
                shadowColor: themeState.theme.contrast,
                elevation: 5,
              },
        ]}
      >
        <TouchableOpacity onPress={() => {}}>
          <MenuBurger
            height={22}
            width={22}
            color={
              themeState.mode === 'light'
                ? NamedColors.Gray500
                : NamedColors.Gray100
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch({ type: 'OPEN_BULLET_MENU' })}
        >
          <MenuBullet
            height={24}
            width={24}
            color={
              themeState.mode === 'light'
                ? NamedColors.Gray500
                : NamedColors.Gray100
            }
          />
        </TouchableOpacity>
      </View>
      <TouchableHighlight
        underlayColor={themeState.theme.primaryLight}
        style={[
          styles.addIcon,
          {
            backgroundColor: themeState.theme.backgroundColorLight,
            shadowOffset: {
              height: 5,
              width: 0,
            },
            shadowOpacity: 0.4,
            shadowColor:
              themeState.mode === 'dark'
                ? themeState.theme.backgroundColor
                : themeState.theme.contrast,
          },
        ]}
        onPress={() => dispatch({ type: 'OPEN_ADD_MODAL' })}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={[styles.addIconText, { color: themeState.theme.primary }]}>
          +
        </Text>
      </TouchableHighlight>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 64,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  addIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    left: Dimensions.get('window').width / 2 - 30,
    bottom: 32,
    position: 'absolute',
    elevation: 6,
  },
  addIconText: {
    fontSize: 40,
    lineHeight: 60,
    bottom: 2,
  },
});
