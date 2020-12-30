import React, { memo, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Check from '../icons/Check';
import HomeContext from '../state/home.context';
import { removeTodo } from '../state/home.reducer';
import ExplosionEffect from './ExplosionEffect';

interface TodoItemProps {
  todo: Todo;
  doneEffectTime: number;
}

function TodoItem(props: TodoItemProps) {
  const [doneEffect, setDoneEffect] = useState(false);
  const { dispatch } = useContext(HomeContext);
  useEffect(() => {
    if (doneEffect) {
      setTimeout(() => dispatch(removeTodo(props.todo)), props.doneEffectTime);
    }
  }, [doneEffect]);
  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback
        onPress={() => {
          setDoneEffect(true);
        }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <View
          style={{
            marginHorizontal: 24,
          }}
        >
          {doneEffect ? (
            <ExplosionEffect
              explosionRadius={10}
              explosionTime={props.doneEffectTime}
              innerRadius={15}
            >
              <Check width={20} height={20} color="#2373E6"></Check>
            </ExplosionEffect>
          ) : (
            <View style={styles.checkbox} />
          )}
        </View>
      </TouchableWithoutFeedback>
      <Text style={styles.text}>{props.todo.value}</Text>
    </View>
  );
}

export default memo(TodoItem, (prevProps, nextProps) => {
  return prevProps.todo.id !== nextProps.todo.id;
});

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 12,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 12,
  },
  text: {
    fontSize: 18,
  },
});
