import AsyncStorage from '@react-native-async-storage/async-storage';
import { LayoutAnimation } from 'react-native';

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
    undoHideTimeout: null,
  }),
  ADD_TASK: (state, action) => {
    const tasks = [action.payload, ...state.tasks];
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const undoTasks = state.undoTasks
      ? [action.payload, ...state.undoTasks]
      : null;
    return {
      ...state,
      tasks,
      undoTasks,
    };
  },
  REMOVE_TASK: (state, action) => {
    const tasks = state.tasks.filter((el) => el.id !== action.payload.task.id);
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
  UNDO_REMOVE_TASK: (state) => {
    if (state.undoHideTimeout) clearTimeout(state.undoHideTimeout);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return {
      ...state,
      tasks: state.undoTasks || [],
      removedTasks: [],
      undoTasks: null,
      undoHideTimeout: null,
      isUndoModalOpen: false,
    };
  },
  CLOSE_BULLET_MENU: (state) => ({ ...state, isBulletMenuOpen: false }),
  OPEN_BULLET_MENU: (state) => ({ ...state, isBulletMenuOpen: true }),
  UPDATE_TITLE: (state, action) => ({ ...state, title: action.payload }),
  OPEN_RENAME_TITLE: (state) => ({ ...state, isRenameModalOpen: true }),
  CLOSE_RENAME_TITLE: (state) => {
    return { ...state, isRenameModalOpen: false };
  },
};

export const TaskReducer = (
  state: TaskState,
  action: TaskReducerAction
): TaskState => {
  const taskReducerHandler = taskReducerHandlerMap[action.type];
  if (taskReducerHandler) {
    const newState = taskReducerHandler(state, action);
    AsyncStorage.setItem('last_task_state', JSON.stringify(newState)).catch(
      console.error
    );
    return newState;
  }
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

export function restoreState(lastState: TaskState): TaskReducerAction {
  return {
    type: 'RESTORE',
    payload: lastState,
  };
}

export function updateTilte(newTitle: string): TaskReducerAction {
  return {
    type: 'UPDATE_TITLE',
    payload: newTitle,
  };
}

export const TASK_INITIAL_STATE: TaskState = {
  tasks: [],
  title: '',
  isAddModalOpen: false,
  isUndoModalOpen: false,
  undoHideTimeout: null,
  removedTasks: [],
  undoTasks: null,
  isBulletMenuOpen: false,
  isRenameModalOpen: false,
};
