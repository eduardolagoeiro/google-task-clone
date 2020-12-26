import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface TodoItemProps {
  name: string;
}

export default function TodoItem(props: TodoItemProps) {
  const [fadeAnim] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(fadeAnim, {
      duration: 500,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  });

  return (
    <Animated.View style={[styles.wrapper, { opacity: fadeAnim }]}>
      <View style={styles.checkbox} />
      <Text style={styles.text}>{props.name}</Text>
    </Animated.View>
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
