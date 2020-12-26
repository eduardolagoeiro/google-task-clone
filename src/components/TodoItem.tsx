import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TodoItemProps {
  name: string;
}

export default function TodoItem(props: TodoItemProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.checkbox} />
      <Text style={styles.text}>{props.name}</Text>
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
    marginHorizontal: 24,
  },
  text: {
    fontSize: 18,
  },
});
