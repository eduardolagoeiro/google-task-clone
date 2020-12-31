import React, { useContext } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MenuBullet from '../../icons/components/MenuBullet';
import MenuBurger from '../../icons/components/MenuBurger';
import ThemeContext from '../../theme/state/theme.context';
import TaskContext from '../state/task.context';

export default function HomeFooter() {
  const { dispatch } = useContext(TaskContext);
  const { state: themeState, dispatch: themeDispatch } = useContext(
    ThemeContext
  );
  return (
    <>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() =>
            themeDispatch({ type: 'SET_THEME_MODE', payload: { mode: 'dark' } })
          }
        >
          <MenuBurger height={22} width={22} color="#646567" />
        </TouchableOpacity>
        <MenuBullet height={24} width={24} color="#646567" />
      </View>
      <TouchableHighlight
        underlayColor="#EEF8FC"
        style={styles.addIcon}
        onPress={() => dispatch({ type: 'OPEN_ADD_MODAL' })}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.addIconText}>+</Text>
      </TouchableHighlight>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'white',
    height: 64,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.4,
  },
  addIcon: {
    backgroundColor: 'white',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      height: 5,
      width: 0,
    },
    shadowOpacity: 0.4,
    left: Dimensions.get('window').width / 2 - 30,
    bottom: 32,
    position: 'absolute',
    elevation: 6,
  },
  addIconText: {
    fontSize: 40,
    lineHeight: 60,
    bottom: 2,
    color: '#2373E6',
  },
});
