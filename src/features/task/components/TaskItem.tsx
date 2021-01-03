import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import Check from '../../icons/components/Check';
import TaskContext from '../state/task.context';
import { removeTask } from '../state/task.reducer';
import ExplosionEffect from '../../common/components/ExplosionEffect';
import ThemeContext from '../../theme/state/theme.context';
import { NamedColors } from '../../theme/Colors';
import MagicCheck from '../../icons/components/MagicCheck';
import { findColorBetween } from '../../../util/Color';

interface TaskItemProps {
  task: Task;
  doneEffectTime: number;
}

function TaskItem(props: TaskItemProps) {
  const [doneEffect, setDoneEffect] = useState(false);
  const { dispatch } = useContext(TaskContext);
  const { state: themeState } = useContext(ThemeContext);
  const [xTransformAnim] = useState(new Animated.Value(0));

  const maxWidth = (Dimensions.get('window').width / 5) * 3;

  const initColor = NamedColors.Gray500;
  const finalColor = themeState.theme.primary;
  const [iconColor, setIconColor] = useState<string>(initColor);
  const [percentageDone, setPercentageDone] = useState(false);

  const [swipePercentage, setSwipePercentage] = useState(
    props.task.done ? 100 : 0
  );

  function getPercentageFromLength(value: number) {
    return parseInt(((value / maxWidth) * 100).toFixed(0));
  }

  xTransformAnim.addListener(({ value }) => {
    if (!percentageDone) {
      const newSwipePercentage = getPercentageFromLength(value);
      if (swipePercentage !== newSwipePercentage) {
        setSwipePercentage(newSwipePercentage);
      }
    }
  });

  useEffect(() => {
    if (props.task.done && doneEffect) {
      if (swipePercentage > 0) {
        setTimeout(() => {
          setSwipePercentage(swipePercentage - 20);
        }, 5);
      } else {
        dispatch({
          type: 'UNDO_DONE_TASK',
          payload: { task: props.task },
        });
      }
    }
    const newColor = findColorBetween(
      initColor,
      finalColor,
      swipePercentage * 2 < 100 ? swipePercentage * 2 : 100
    );
    setIconColor(newColor);
  }, [swipePercentage]);

  useEffect(() => {
    if (percentageDone) {
      setDoneEffect(true);
    }
  }, [percentageDone]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => {
        return !props.task.done;
      },
      onPanResponderGrant: () => {
        Animated.timing(xTransformAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }).start();
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0 && gestureState.dx < maxWidth) {
          Animated.timing(xTransformAnim, {
            toValue: gestureState.dx,
            duration: 0,
            useNativeDriver: true,
          }).start();
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const isDone = getPercentageFromLength(gestureState.dx) > 50;
        setPercentageDone(isDone);
        if (!isDone) {
          Animated.timing(xTransformAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.timing(xTransformAnim, {
            toValue: Dimensions.get('window').width,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (doneEffect && !props.task.done) {
      setTimeout(() => {
        dispatch(
          removeTask(
            props.task,
            setTimeout(() => dispatch({ type: 'CLOSE_UNDO_MODAL' }), 4000)
          )
        );
      }, props.doneEffectTime);
    } else if (doneEffect && props.task.done) {
      setSwipePercentage(swipePercentage - 1);
    }
  }, [doneEffect]);
  return (
    <View
      style={{
        backgroundColor: themeState.theme.primary,
      }}
    >
      <Animated.View
        style={{
          transform: [{ translateX: xTransformAnim }],
          backgroundColor: themeState.theme.backgroundColor,
        }}
        {...panResponder.panHandlers}
      >
        <TouchableHighlight
          underlayColor={themeState.theme.highlightGrayUnderlay}
          onPress={() => {}}
        >
          <View style={styles.wrapper}>
            <TouchableWithoutFeedback
              onPress={() => {
                setDoneEffect(true);
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <View style={{ marginRight: 18 }}>
                {doneEffect && !props.task.done ? (
                  <ExplosionEffect
                    explosionRadius={10}
                    explosionTime={props.doneEffectTime}
                    innerRadius={15}
                  >
                    <Check width={20} height={20} color="#2373E6"></Check>
                  </ExplosionEffect>
                ) : (
                  <MagicCheck
                    color={iconColor}
                    percentage={
                      props.task.done
                        ? swipePercentage
                        : swipePercentage * 2 < 100
                        ? swipePercentage * 2
                        : 100
                    }
                    height={24}
                    width={24}
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color: themeState.theme.contrast,
                    textDecorationLine: props.task.done
                      ? 'line-through'
                      : 'none',
                  },
                ]}
              >
                {props.task.value}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </Animated.View>
    </View>
  );
}

export default memo(TaskItem, (prevProps, nextProps) => {
  return prevProps.task.id !== nextProps.task.id;
});

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 12,
    alignItems: 'center',
    paddingLeft: 24,
  },
  checkbox: {
    borderWidth: 2,
    borderRadius: 12,
  },
  text: {
    fontSize: 18,
    marginRight: 24,
  },
});
