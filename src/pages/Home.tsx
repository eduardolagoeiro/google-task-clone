import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Platform,
  ScrollView,
  TouchableHighlight,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import SimpleModal from '../components/SimpleModal';
import TodoItem from '../components/TodoItem';
import MenuBullet from '../icons/MenuBullet';
import MenuBurger from '../icons/MenuBurger';

export default function Home() {
  const [newTodoText, setNewTodoText] = useState('');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const modalInput = useRef<TextInput>(null);

  useEffect(() => {
    if (addModalVisible) {
      setTimeout(() => {
        modalInput.current?.focus();
      }, 100);
    }
  }, [addModalVisible]);

  const [todos, setTodos] = useState([
    {
      value: 'Lorem ipsum',
    },
  ]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <SimpleModal
        closeFunction={() => setAddModalVisible(false)}
        visible={addModalVisible}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          contentContainerStyle={styles.addModal}
          style={styles.addModal}
        >
          <TextInput
            placeholder="New task"
            ref={modalInput}
            style={styles.modalInput}
            onChangeText={(text) => setNewTodoText(text)}
            value={newTodoText}
          />
          <TouchableOpacity
            style={styles.saveButtonWrapper}
            disabled={!newTodoText}
            onPress={() => {
              setTodos([{ value: newTodoText }, ...todos]);
              setNewTodoText('');
              setAddModalVisible(false);
            }}
          >
            <Text
              style={[
                styles.saveButton,
                newTodoText ? {} : styles.saveButtonDisabled,
              ]}
            >
              Save
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SimpleModal>
      <ScrollView>
        <Text style={styles.headerText}>Todo List Title</Text>
        {todos.map((el, i) => (
          <TodoItem key={i} name={el.value} />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <MenuBurger height={22} width={22} color="#646567" />
        <MenuBullet height={24} width={24} color="#646567" />
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
    color: '#2373E6',
  },
  addModal: {
    height: 132,
    width: '100%',
    backgroundColor: 'white',
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    position: 'absolute',
    bottom: 0,
  },
  modalInput: {
    color: 'black',
    fontSize: 16,
    padding: 20,
  },
  saveButtonWrapper: {
    backgroundColor: 'white',
    paddingRight: 25,
    paddingBottom: 40,
  },
  saveButton: {
    color: '#2373E6',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  saveButtonDisabled: {
    color: '#B7B7B7',
  },
});
