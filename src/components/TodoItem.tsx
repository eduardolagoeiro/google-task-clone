import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Check from '../icons/Check';
import ExplosionEffect from './ExplosionEffect';

interface TodoItemProps {
  todo: Todo;
  doneEffectTime: number;
  toggleDone: () => void;
}

export default function TodoItem(props: TodoItemProps) {
  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback
        onPress={props.toggleDone}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <View
          style={{
            marginHorizontal: 24,
          }}
        >
          {props.todo.doneEffect ? (
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
