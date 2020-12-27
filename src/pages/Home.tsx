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
  Animated,
  Pressable,
} from 'react-native';
import SimpleModal from '../components/SimpleModal';
import TodoItem from '../components/TodoItem';
import MenuBullet from '../icons/MenuBullet';
import MenuBurger from '../icons/MenuBurger';

export default function Home(props: {
  todos: Todo[];
  persistTodos: (todos: Todo[]) => Promise<void>;
}) {
  const addTodoEffectTime = 150;
  const [newTodoText, setNewTodoText] = useState('');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const modalInput = useRef<TextInput>(null);
  const [todos, setTodos] = useState(props.todos);

  const [fadeInValue] = useState(new Animated.Value(0));
  const [translateValue] = useState(new Animated.Value(0));

  const [undoModalVisible, setUndoModalVisible] = useState(false);
  const [fadeInUndoModal] = useState(new Animated.Value(0));
  const [
    undoModalVisibleTimeout,
    setUndoModalVisibleTimeout,
  ] = useState<NodeJS.Timeout>();

  function toggleDone(todoId: number) {
    setUndoModalVisible(true);
    if (undoModalVisibleTimeout) clearTimeout(undoModalVisibleTimeout);
    setUndoModalVisibleTimeout(
      setTimeout(() => {
        // setTodos(
        //   todos.map((todo) => ({
        //     ...todo,
        //     done: todo.id === todoId ? !todo.done : todo.done,
        //   }))
        // );
        setUndoModalVisible(false);
      }, 2000)
    );
    Animated.sequence([
      Animated.timing(fadeInUndoModal, {
        duration: 0,
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(fadeInUndoModal, {
        duration: 200,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
    setTodos(
      todos.map((todo) => ({
        ...todo,
        doneEffect: todo.id === todoId || false,
      }))
    );
  }

  function animateAddTodos() {
    Animated.sequence([
      Animated.timing(fadeInValue, {
        duration: 0,
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(fadeInValue, {
        duration: 500,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
    Animated.sequence([
      Animated.timing(translateValue, {
        duration: 0,
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(translateValue, {
        duration: 100,
        toValue: 60,
        useNativeDriver: true,
      }),
    ]).start();
  }

  useEffect(() => {
    props.persistTodos(todos);
  }, [todos]);

  useEffect(() => {
    if (addModalVisible) {
      setTimeout(() => {
        modalInput.current?.focus();
      }, 100);
    }
  }, [addModalVisible]);

  function notDoneFilter(todos: Todo[]): Todo[] {
    return todos.filter((el) => !el.done);
  }

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
              setTodos([
                {
                  value: newTodoText,
                  done: false,
                  id: parseInt(Math.random().toFixed(10).substring(2)),
                  doneEffect: false,
                },
                ...todos.map((el) => ({ ...el })),
              ]);
              animateAddTodos();
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
        {notDoneFilter(todos).length > 0 ? (
          <>
            <Animated.View
              style={{
                opacity: fadeInValue,
              }}
            >
              <TodoItem
                doneEffectTime={addTodoEffectTime}
                todo={notDoneFilter(todos)[0]}
                toggleDone={() => toggleDone(0)}
              />
            </Animated.View>
            {notDoneFilter(todos).length > 1 ? (
              <Animated.View
                style={{
                  transform: [
                    { translateY: -60 },
                    { translateY: translateValue },
                  ],
                }}
              >
                {notDoneFilter(todos)
                  .slice(1, notDoneFilter(todos).length)
                  .map((el, i) => (
                    <TodoItem
                      doneEffectTime={addTodoEffectTime}
                      key={i}
                      todo={el}
                      toggleDone={() => toggleDone(el.id)}
                    />
                  ))}
              </Animated.View>
            ) : null}
          </>
        ) : (
          <Text>Clique para adicionar tarefas</Text>
        )}
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
      {undoModalVisible && (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 108,
            width: '100%',
            backgroundColor: 'black',
            borderColor: 'transparent',
            borderWidth: 0,
            height: 50,
            borderRadius: 3,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            alignItems: 'center',
            opacity: fadeInUndoModal,
          }}
        >
          <Text
            style={{
              color: 'white',
            }}
          >
            1 completed
          </Text>
          <Pressable onPress={() => {}}>
            <Text
              style={{
                color: '#93AFEF',
                fontWeight: 'bold',
              }}
            >
              Undo
            </Text>
          </Pressable>
        </Animated.View>
      )}
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
