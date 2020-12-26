import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Platform,
  ScrollView,
} from 'react-native';
import TodoItem from '../components/TodoItem';
import MenuBullet from '../icons/MenuBullet';
import MenuBurger from '../icons/MenuBurger';

export default function Home() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView>
        <Text style={styles.headerText}>Todo List Title</Text>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((el, i) => (
          <TodoItem key={i} name={`Todo ${i + 1}`} />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <MenuBurger height={30} width={30} />
        <View style={styles.addIcon}>
          <Text style={styles.addIconText}>+</Text>
        </View>
        <MenuBullet height={34} width={34} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  headerText: {
    paddingLeft: 64,
    paddingTop: 14,
    paddingBottom: 20,
    fontSize: 32,
  },
  footer: {
    backgroundColor: 'white',
    height: 64,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    elevation: 20,
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
    bottom: 32,
    elevation: 10,
  },
  addIconText: {
    fontSize: 40,
    lineHeight: 60,
    bottom: 2,
  },
});
