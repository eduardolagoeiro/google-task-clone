import React, { useContext, useState } from 'react';
import { View, Text, Dimensions, Platform, Animated } from 'react-native';
import { NamedColors } from '../../theme/Colors';
import ThemeContext from '../../theme/state/theme.context';
import EmptyListSvg from './EmptyListSvg';

export default function EmptyList() {
  const [opacity] = useState(new Animated.Value(0));
  const { state: themeState } = useContext(ThemeContext);
  Animated.timing(opacity, {
    duration: 500,
    useNativeDriver: true,
    toValue: 1,
  }).start();
  return (
    <Animated.View
      style={{
        opacity,
        alignItems: 'center',
        justifyContent: 'center',
        height:
          Dimensions.get('window').height -
          64 -
          14 -
          20 -
          43 -
          (Platform.OS === 'android' ? 25 : 0),
      }}
    >
      <View style={{}}>
        <EmptyListSvg />
      </View>
      <Text
        style={{
          fontWeight: '700',
          fontSize: 16,
          color: themeState.theme.text,
          paddingVertical: 14,
        }}
      >
        A fresh start
      </Text>
      <Text
        style={{
          fontWeight: '700',
          fontSize: 16,
          color: themeState.mode === 'light' ? 'gray' : NamedColors.Gray200,
        }}
      >
        Anything to add?
      </Text>
    </Animated.View>
  );
}
