import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Animated,
  PanResponder,
  Dimensions,
  PanResponderGestureState,
  LayoutRectangle,
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
  reorderTo?: (index: number, animate?: boolean) => void;
  index?: number;
  total?: number;
  downOne?: boolean;
  offset?: 1 | 0 | -1;
}

export default function TaskItem(props: TaskItemProps) {
  const [doneEffect, setDoneEffect] = useState(false);
  const { dispatch } = useContext(TaskContext);
  const { state: themeState } = useContext(ThemeContext);
  const [xTransformAnim] = useState(new Animated.Value(0));
  const [yTransformAnim] = useState(new Animated.Value(0));

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

  let isHorizontalMoving: boolean | null = null;

  const [layout, setLayout] = useState<LayoutRectangle | null>(null);

  let reorder: { newIndex: number | null } = {
    newIndex: null,
  };

  function moveVertical(gestureState: PanResponderGestureState) {
    if (layout && props.index !== undefined && props.total !== undefined) {
      const minYTo = -layout.y;
      const maxYTo = layout.height * (props.total - props.index - 1);
      const dy =
        gestureState.dy > maxYTo || gestureState.dy < minYTo
          ? gestureState.dy > maxYTo
            ? maxYTo
            : minYTo
          : gestureState.dy;
      Animated.timing(yTransformAnim, {
        toValue: dy,
        duration: 0,
        useNativeDriver: true,
      }).start();

      const newIndex = Math.ceil(
        ((dy - minYTo) / (maxYTo - minYTo)) * (props.total - 1)
      );
      if (reorder.newIndex !== newIndex) {
        reorder.newIndex = newIndex;
        props.reorderTo && props.reorderTo(newIndex);
      }
    }
  }

  const [isHorizontalMovingState, setIsHorizontalMoving] = useState<
    boolean | null
  >(null);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => {
          return !props.task.done;
        },
        onPanResponderMove: (_, gestureState) => {
          if (isHorizontalMoving === null) {
            isHorizontalMoving = gestureState.dx > 0;
            setIsHorizontalMoving(isHorizontalMoving);
          }
          if (isHorizontalMoving) {
            if (gestureState.dx > 0 && gestureState.dx < maxWidth) {
              Animated.timing(xTransformAnim, {
                toValue: gestureState.dx,
                duration: 0,
                useNativeDriver: true,
              }).start();
            }
          } else {
            moveVertical(gestureState);
          }
        },
        onPanResponderRelease: (_, gestureState) => {
          let isReordering = false;
          if (props.index !== undefined && reorder.newIndex !== null) {
            if (reorder.newIndex !== props.index) {
              isReordering = true;
              dispatch({
                type: 'REORDER_TASK_LIST',
                payload: {
                  fromIndex: props.index,
                  toIndex: reorder.newIndex,
                },
              });
            }
            reorder.newIndex = null;
            props.reorderTo && props.reorderTo(props.index, false);
          }
          const isDone = !!(
            isHorizontalMoving && getPercentageFromLength(gestureState.dx) > 50
          );
          isHorizontalMoving = null;
          setIsHorizontalMoving(null);
          setPercentageDone(isDone);
          if (!isDone) {
            Animated.timing(xTransformAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }).start();
            Animated.timing(yTransformAnim, {
              toValue: 0,
              duration: isHorizontalMoving ? 0 : isReordering ? 0 : 150,
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
      }),
    [props.index, props.total, layout]
  );

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

  const offset = useMemo(() => {
    return (
      (props.offset && layout && layout.height * props.offset) || undefined
    );
  }, [props.offset, layout]);
  return (
    <View
      onLayout={(evt) => {
        setLayout(evt.nativeEvent.layout);
      }}
      style={{
        top: offset,
        backgroundColor: isHorizontalMovingState
          ? themeState.theme.primary
          : 'transparent',
      }}
    >
      <Animated.View
        style={{
          transform: [
            { translateX: xTransformAnim },
            { translateY: yTransformAnim },
          ],
          backgroundColor: isHorizontalMovingState
            ? themeState.theme.backgroundColor
            : 'transparent',
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
