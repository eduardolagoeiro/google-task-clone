import React, { useState } from 'react';
import { Animated, Easing } from 'react-native';

interface ExplosionParticleProps {
  translateXTo?: number;
  translateXFrom?: number;
  translateYTo?: number;
  translateYFrom?: number;
  explosionTime?: number;
  particleColor?: string;
  style: object;
}

export default function ExplosionParticle(props: ExplosionParticleProps) {
  const [translateX] = useState(new Animated.Value(props.translateXFrom || 0));
  const [translateY] = useState(new Animated.Value(props.translateYFrom || 0));
  const [opacity] = useState(new Animated.Value(1));
  const animation = Animated.sequence([
    Animated.parallel([
      Animated.timing(translateX, {
        duration: props.explosionTime || 0,
        useNativeDriver: true,
        toValue: props.translateXTo || 0,
        easing: Easing.quad,
      }),
      Animated.timing(translateY, {
        duration: props.explosionTime || 0,
        useNativeDriver: true,
        toValue: props.translateYTo || 0,
        easing: Easing.quad,
      }),
    ]),
    Animated.timing(opacity, {
      duration: 0,
      useNativeDriver: true,
      toValue: 0,
    }),
  ]);
  animation.start();
  return (
    <Animated.View
      style={[
        props.style,
        {
          opacity,
          borderRadius: 10,
          alignSelf: 'center',
          width: 2,
          height: 2,
          backgroundColor: props.particleColor || 'blue',
          transform: [{ translateY }, { translateX }],
        },
      ]}
    />
  );
}
