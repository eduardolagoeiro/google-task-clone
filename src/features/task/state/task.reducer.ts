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
    const todos = [action.payload, ...state.todos];
    AsyncStorage.setItem('todos', JSON.stringify(todos));
    return {
      ...state,
      todos,
    };
  } else if (action.type === 'REMOVE_TASK') {
    const todos = state.todos.filter((el) => el.id !== action.payload.id);
    AsyncStorage.setItem('todos', JSON.stringify(todos));
    return {
      ...state,
      todos,
    };
  } else {
    return state;
  }
};

export function addTodo(task: Task): TaskReducerAction {
  return {
    type: 'ADD_TASK',
    payload: task,
  };
}

export function removeTodo(task: Task): TaskReducerAction {
  return {
    type: 'REMOVE_TASK',
    payload: task,
  };
}

export function restoreState(task: Task[]): TaskReducerAction {
  return {
    type: 'RESTORE',
    payload: {
      todos: task,
    },
  };
}

export const HOME_INITIAL_STATE: TaskState = {
  todos: [],
};
