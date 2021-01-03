import React, { useContext } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SimpleModal from '../../common/components/SimpleModal';
import MenuBullet from '../../icons/components/MenuBullet';
import MenuBurger from '../../icons/components/MenuBurger';
import { NamedColors } from '../../theme/Colors';
import ThemeContext from '../../theme/state/theme.context';
import TaskContext from '../state/task.context';
import BulletMenuItem from './BulletMenuItem';
import BulletMenuView from './BulletMenuView';

export default function TaskFooter() {
  const { state, dispatch } = useContext(TaskContext);
  const { state: themeState } = useContext(ThemeContext);
  return (
    <>
      <SimpleModal
        closeFunction={() => {
          dispatch({ type: 'CLOSE_BULLET_MENU' });
        }}
        visible={state.isBulletMenuOpen}
      >
        <BulletMenuView />
      </SimpleModal>
      <SimpleModal
        closeFunction={() => {
          dispatch({ type: 'CLOSE_BURGER_MENU' });
        }}
        visible={state.isBurgerMenuOpen}
      >
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
            <Text
              style={[styles.menuItemText, { color: themeState.theme.text }]}
            >
              Rename list
            </Text>
          </BulletMenuItem>
          <BulletMenuItem
            onPress={() => {
              dispatch({ type: 'CREATE_NEW_LIST' });
              dispatch({ type: 'CLOSE_BURGER_MENU' });
            }}
          >
            <Text
              style={[styles.menuItemText, { color: themeState.theme.text }]}
            >
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
            <Text style={[styles.menuItemText, { color: 'red' }]}>
              Remove list
            </Text>
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
          <ScrollView
            style={{ maxHeight: Dimensions.get('window').height / 3 }}
          >
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
                  style={[
                    styles.menuItemText,
                    { color: themeState.theme.text },
                  ]}
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
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => dispatch({ type: 'OPEN_BURGER_MENU' })}
        >
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
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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
  menuItemText: {
    fontSize: 18,
  },
});
