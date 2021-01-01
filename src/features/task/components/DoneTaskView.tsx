import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  LayoutAnimation,
  Animated,
  DeviceEventEmitter,
} from 'react-native';
import ArrowDown from '../../icons/components/ArrowDown';
import { NamedColors } from '../../theme/Colors';
import ThemeContext from '../../theme/state/theme.context';
import TaskContext from '../state/task.context';
import TaskItem from './TaskItem';

export default function DoneTaskView(props: { onOpen: () => void }) {
  const { state } = useContext(TaskContext);
  const { state: themeState } = useContext(ThemeContext);
  const [listIsOpen, setListIsOpen] = useState(false);

  const [rotateAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(rotateAnimation, {
      toValue: listIsOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    if (listIsOpen) {
      setTimeout(props.onOpen, 310);
    }
  }, [listIsOpen]);
  return (
    <>
      <TouchableHighlight
        underlayColor={NamedColors.Gray050}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setListIsOpen(!listIsOpen);
        }}
        style={{
          paddingHorizontal: 24,
          paddingVertical: 14,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: themeState.theme.contrast,
              fontWeight: 'bold',
            }}
          >
            Completed ({state.doneTasks.length})
          </Text>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: rotateAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                  }),
                },
              ],
            }}
          >
            <ArrowDown
              width={15}
              height={10}
              color={NamedColors.Gray500}
            ></ArrowDown>
          </Animated.View>
        </View>
      </TouchableHighlight>
      {listIsOpen &&
        state.doneTasks.map((el) => (
          <TaskItem doneEffectTime={100} key={'done-' + el.id} task={el} />
        ))}
    </>
  );
}
