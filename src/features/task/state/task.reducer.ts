import AsyncStorage from '@react-native-async-storage/async-storage';
import { LayoutAnimation } from 'react-native';

// taskReducerHandlerMap[TaskReducerActionType.ADD_TASK] = () => {};

const taskReducerHandlerMap: Record<
  TaskReducerActionType,
  TaskReducerHandler
> = {
  RESTORE: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  OPEN_ADD_MODAL: (state) => ({
    ...state,
    isAddModalOpen: true,
  }),
  CLOSE_ADD_MODAL: (state) => ({
    ...state,
    isAddModalOpen: false,
  }),
  OPEN_UNDO_MODAL: (state) => ({
    ...state,
    isUndoModalOpen: true,
  }),
  CLOSE_UNDO_MODAL: (state) => ({
    ...state,
    isUndoModalOpen: false,
    removedTasks: [],
    undoTasks: null,
  }),
  ADD_TASK: (state, action) => {
    const tasks = [action.payload, ...state.tasks];
    AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return {
      ...state,
      tasks,
    };
  },
  REMOVE_TASK: (state, action) => {
    const tasks = state.tasks.filter((el) => el.id !== action.payload.task.id);
    AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    if (state.undoHideTimeout) clearTimeout(state.undoHideTimeout);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return {
      ...state,
      tasks,
      isUndoModalOpen: true,
      undoHideTimeout: action.payload.undoHideTimeout,
      removedTasks: [...state.removedTasks, action.payload.task],
      undoTasks: state.undoTasks || state.tasks,
    };
  },
};

export const HomeReducer = (
  state: TaskState,
  action: TaskReducerAction
): TaskState => {
  const taskReducerHandler = taskReducerHandlerMap[action.type];
  console.log(action.type);
  if (taskReducerHandler) return taskReducerHandler(state, action);
  return state;
};

export function addTask(task: Task): TaskReducerAction {
  return {
    type: 'ADD_TASK',
    payload: task,
  };
}

export function removeTask(
  task: Task,
  undoHideTimeout: NodeJS.Timeout
): TaskReducerAction {
  return {
    type: 'REMOVE_TASK',
    payload: {
      task,
      undoHideTimeout,
    },
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
  isAddModalOpen: false,
  isUndoModalOpen: false,
  undoHideTimeout: null,
  removedTasks: [],
  undoTasks: null,
};
