import React, { useEffect, useState } from 'react';
import { Text, Animated, Pressable } from 'react-native';

export default function UndoAddToast(props: { close: () => void }) {
  const [fadeInUndoModal] = useState(new Animated.Value(0));
  Animated.timing(fadeInUndoModal, {
    duration: 200,
    toValue: 1,
    useNativeDriver: true,
  }).start();

  useEffect(() => {
    const timeout = setTimeout(props.close, 2000);
    return () => {
      clearTimeout(timeout);
    };
  });
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
