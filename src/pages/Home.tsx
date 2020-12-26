import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Platform,
  ScrollView,
  TouchableHighlight,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import SimpleModal from '../components/SimpleModal';
import TodoItem from '../components/TodoItem';
import MenuBullet from '../icons/MenuBullet';
import MenuBurger from '../icons/MenuBurger';

export default function Home() {
  const [addModalVisible, setAddModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.wrapper}>
      <SimpleModal
        closeFunction={() => setAddModalVisible(false)}
        visible={addModalVisible}
      >
        <View style={styles.addModal}>
          <Text>Modal</Text>
        </View>
      </SimpleModal>
      <ScrollView>
        <Text style={styles.headerText}>Todo List Title</Text>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((el, i) => (
          <TodoItem key={i} name={`Todo ${i + 1}`} />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <MenuBurger height={22} width={22} color="gray" />
        <MenuBullet height={24} width={24} color="gray" />
      </View>
      <TouchableHighlight
        underlayColor="#EEF8FC"
        style={styles.addIcon}
        onPress={() => setAddModalVisible(true)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.addIconText}>+</Text>
      </TouchableHighlight>
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
    color: '#25A0D0',
  },
  addModal: {
    height: 132,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
  },
});
