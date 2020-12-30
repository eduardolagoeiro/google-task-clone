import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomeReducer = (
  state: TaskState,
  action: TaskReducerAction
): TaskState => {
  if (action.type === 'RESTORE') {
    return {
      ...state,
      ...action.payload,
    };
  } else if (action.type === 'ADD_TASK') {
    const tasks = [action.payload, ...state.tasks];
    AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    return {
      ...state,
      tasks,
    };
  } else if (action.type === 'REMOVE_TASK') {
    const tasks = state.tasks.filter((el) => el.id !== action.payload.id);
    AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    return {
      ...state,
      tasks,
    };
  } else {
    return state;
  }
};

export function addTask(task: Task): TaskReducerAction {
  return {
    type: 'ADD_TASK',
    payload: task,
  };
}

export function removeTask(task: Task): TaskReducerAction {
  return {
    type: 'REMOVE_TASK',
    payload: task,
  };
}

export function restoreState(task: Task[]): TaskReducerAction {
  return {
    type: 'RESTORE',
    payload: {
      tasks: task,
    },
  };
}

export const HOME_INITIAL_STATE: TaskState = {
  tasks: [],
};
