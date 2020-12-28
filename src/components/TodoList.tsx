import React, { memo, useState } from 'react';
import { Animated, Text } from 'react-native';
import TodoItem from './TodoItem';

function TodoList(props: { todos: Todo[]; removeTodo: (id: number) => void }) {
  const [fadeInValue] = useState(new Animated.Value(0));
  const [translateValue] = useState(new Animated.Value(0));
  const addTodoEffectTime = 150;

  if (!props.todos.find((todo) => todo.doneEffect)) {
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

  function toggleDone(id: number) {
    props.removeTodo(id);
  }

  return props.todos.length > 0 ? (
    <>
      <Animated.View
        style={{
          opacity: fadeInValue,
        }}
      >
        <TodoItem
          doneEffectTime={addTodoEffectTime}
          todo={props.todos[0]}
          toggleDone={() => toggleDone(props.todos[0].id)}
        />
      </Animated.View>
      {props.todos.length > 1 && (
        <Animated.View
          style={{
            transform: [{ translateY: -60 }, { translateY: translateValue }],
          }}
        >
          {props.todos.slice(1, props.todos.length).map((el, i) => (
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

export default memo(TodoList, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.todos) === JSON.stringify(nextProps.todos);
});
