import React, { useEffect, useState } from 'react';
import { Animated, Text } from 'react-native';
import TodoItem from './TodoItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TodoList() {
  const [fadeInValue] = useState(new Animated.Value(0));
  const [translateValue] = useState(new Animated.Value(0));
  const addTodoEffectTime = 150;

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

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   AsyncStorage.setItem('todo', JSON.stringify(todos));
  // }, [todos]);

  // useEffect(() => {
  //   console.log('useEffect', loaded);
  //   // if (!loaded) {
  //   //   AsyncStorage.getItem('todo').then((todosStr) => {
  //   //     setTodos(JSON.parse(todosStr) || []);
  //   //     setLoaded(true);
  //   //   });
  //   // }
  // }, []);

  function toggleDone(id: number) {}
  return todos.length > 0 ? (
    <>
      <Animated.View
        style={{
          opacity: fadeInValue,
        }}
      >
        <TodoItem
          doneEffectTime={addTodoEffectTime}
          todo={todos[0]}
          toggleDone={() => toggleDone(todos[0].id)}
        />
      </Animated.View>
      {todos.length > 1 && (
        <Animated.View
          style={{
            transform: [{ translateY: -60 }, { translateY: translateValue }],
          }}
        >
          {todos.slice(1, todos.length).map((el, i) => (
            <TodoItem
              doneEffectTime={addTodoEffectTime}
              key={i}
              todo={el}
              toggleDone={() => toggleDone(el.id)}
            />
          ))}
        </Animated.View>
      )}
    </>
  ) : (
    <Text>Sem items</Text>
  );
}
