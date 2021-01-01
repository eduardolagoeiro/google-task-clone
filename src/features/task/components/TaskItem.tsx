import React, { memo, useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import Check from '../../icons/components/Check';
import TaskContext from '../state/task.context';
import { removeTask } from '../state/task.reducer';
import ExplosionEffect from '../../common/components/ExplosionEffect';
import ThemeContext from '../../theme/state/theme.context';
import { NamedColors } from '../../theme/Colors';

interface TaskItemProps {
  task: Task;
  doneEffectTime: number;
}

function TaskItem(props: TaskItemProps) {
  const [doneEffect, setDoneEffect] = useState(false);
  const { dispatch } = useContext(TaskContext);
  const { state: themeState } = useContext(ThemeContext);

  useEffect(() => {
    if (doneEffect) {
      setTimeout(() => {
        dispatch(
          removeTask(
            props.task,
            setTimeout(() => dispatch({ type: 'CLOSE_UNDO_MODAL' }), 4000)
          )
        );
      }, props.doneEffectTime);
    }
  }, [doneEffect]);
  return (
    <TouchableHighlight
      underlayColor={themeState.theme.highlightGrayUnderlay}
      onPress={() => {}}
    >
      <View style={styles.wrapper}>
        {!props.task.done ? (
          <TouchableWithoutFeedback
            onPress={() => {
              setDoneEffect(true);
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <View style={{ marginRight: 18 }}>
              {doneEffect ? (
                <ExplosionEffect
                  explosionRadius={10}
                  explosionTime={props.doneEffectTime}
                  innerRadius={15}
                >
                  <Check width={20} height={20} color="#2373E6"></Check>
                </ExplosionEffect>
              ) : (
                <View
                  style={[
                    styles.checkbox,
                    {
                      borderColor: NamedColors.Gray500,
                    },
                  ]}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <View style={{ marginRight: 18 }}>
            <Check width={20} height={20} color="#2373E6"></Check>
          </View>
        )}
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
                textDecorationLine: props.task.done ? 'line-through' : 'none',
              },
            ]}
          >
            {props.task.value}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
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
    height: 20,
    width: 20,
    borderWidth: 2,
    borderRadius: 12,
  },
  text: {
    fontSize: 18,
    marginRight: 24,
  },
});
