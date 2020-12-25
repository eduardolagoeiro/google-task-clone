import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Platform,
  ScrollView,
} from 'react-native';
import MenuBullet from '../icons/MenuBullet';
import MenuBurger from '../icons/MenuBurger';

export default function Home() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Todo List Title</Text>
      </View>
      <ScrollView>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((el, i) => (
          <Text key={i}>
            {el} Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Temporibus at esse labore quidem. At adipisci ipsum maiores sunt
            libero dolorem provident dolores nulla, ullam, ab placeat est
            doloribus nostrum quam.
          </Text>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <MenuBurger height={30} width={30} />
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
  header: {
    paddingLeft: 64,
    paddingTop: 14,
  },
  headerText: {
    fontSize: 32,
  },
  footer: {
    backgroundColor: Platform.OS === 'ios' ? 'white' : 'transparent',
    height: 64,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    elevation: 1,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.4,
  },
});
