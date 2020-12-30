import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomeReducer = (
  state: HomeState,
  action: HomeReducerAction
): HomeState => {
  if (action.type === 'RESTORE') {
    return {
      ...state,
      ...action.payload,
    };
  } else if (action.type === 'ADD_TODO') {
    const todos = [action.payload, ...state.todos];
    AsyncStorage.setItem('todos', JSON.stringify(todos));
    return {
      ...state,
      todos,
    };
  } else if (action.type === 'REMOVE_TODO') {
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

export function addTodo(todo: Todo): HomeReducerAction {
  return {
    type: 'ADD_TODO',
    payload: todo,
  };
}

export function removeTodo(todo: Todo): HomeReducerAction {
  return {
    type: 'REMOVE_TODO',
    payload: todo,
  };
}

export function restoreState(todos: Todo[]): HomeReducerAction {
  return {
    type: 'RESTORE',
    payload: {
      todos,
    },
  };
}

export const HOME_INITIAL_STATE: HomeState = {
  todos: [],
};
