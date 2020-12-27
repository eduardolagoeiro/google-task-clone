import React, { useState } from 'react';
import { Text, Animated, Pressable } from 'react-native';

export default function UndoAddToast() {
  const [fadeInUndoModal] = useState(new Animated.Value(0));
  return (
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
  );
}