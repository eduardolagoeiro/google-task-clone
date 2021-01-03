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
    toDoneTasks: [],
    undoTasks: null,
    undoDoneTasks: null,
    undoHideTimeout: null,
  }),
  ADD_TASK: (state, action) => {
    const tasks = [action.payload.task, ...state.tasks];
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const undoTasks = state.undoTasks
      ? [action.payload.task, ...state.undoTasks]
      : null;
    return {
      ...state,
      tasks,
      undoTasks,
      taskListMap: {
        ...state.taskListMap,
        [state.title]: {
          tasks,
          doneTasks: state.doneTasks,
        },
      },
    };
  },
  DONE_TASK: (state, action) => {
    const tasks = state.tasks.filter((el) => el.id !== action.payload.task.id);
    if (state.undoHideTimeout) clearTimeout(state.undoHideTimeout);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const doneTasks = [
      { ...action.payload.task, doneAt: new Date(), done: true },
      ...state.doneTasks,
    ];
    const undoDoneTasks = state.undoDoneTasks
      ? state.undoDoneTasks
      : [...state.doneTasks];
    return {
      ...state,
      tasks,
      doneTasks,
      isUndoModalOpen: true,
      undoHideTimeout: action.payload.undoHideTimeout,
      toDoneTasks: [...state.toDoneTasks, action.payload.task],
      undoTasks: state.undoTasks || state.tasks,
      undoDoneTasks,
      taskListMap: {
        ...state.taskListMap,
        [state.title]: {
          tasks,
          doneTasks,
        },
      },
    };
  },
  UNDO_DONE_TASK: (state, action) => {
    if (action.payload?.task?.id) {
      const doneTasks = state.doneTasks.filter(
        (el) => el.id !== action.payload.task.id
      );
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const tasks = [{ ...action.payload.task, done: false }, ...state.tasks];
      return {
        ...state,
        doneTasks,
        tasks,
        taskListMap: {
          ...state.taskListMap,
          [state.title]: {
            tasks,
            doneTasks,
          },
        },
      };
    }
    if (state.undoHideTimeout) clearTimeout(state.undoHideTimeout);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const tasks = state.undoTasks || [];
    const doneTasks = state.undoDoneTasks || [];
    return {
      ...state,
      tasks,
      doneTasks,
      toDoneTasks: [],
      undoTasks: null,
      undoDoneTasks: null,
      undoHideTimeout: null,
      isUndoModalOpen: false,
      taskListMap: {
        ...state.taskListMap,
        [state.title]: {
          tasks,
          doneTasks,
        },
      },
    };
  },
  CLOSE_BULLET_MENU: (state) => ({ ...state, isBulletMenuOpen: false }),
  OPEN_BULLET_MENU: (state) => ({ ...state, isBulletMenuOpen: true }),
  UPDATE_TITLE: (state, action) => {
    const newTitle = action.payload;
    const taskListMap = {
      ...state.taskListMap,
    };
    taskListMap[newTitle] = taskListMap[state.title];
    delete taskListMap[state.title];
    return { ...state, title: newTitle, taskListMap };
  },
  OPEN_RENAME_TITLE: (state) => ({ ...state, isRenameModalOpen: true }),
  CLOSE_RENAME_TITLE: (state) => {
    return { ...state, isRenameModalOpen: false };
  },
  REMOVE_DONE_TASK: (state) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return {
      ...state,
      doneTasks: [],
      taskListMap: {
        ...state.taskListMap,
        [state.title]: {
          tasks: state.tasks,
          doneTasks: [],
        },
      },
    };
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
    payload: {
      task,
    },
  };
}

export function removeTask(
  task: Task,
  undoHideTimeout: NodeJS.Timeout
): TaskReducerAction {
  return {
    type: 'DONE_TASK',
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

const INITIAL_TASKS: Task[] = [];

const INITIAL_TITLE = 'Task List';

export const TASK_INITIAL_STATE: TaskState = {
  taskListMap: {
    [INITIAL_TITLE]: {
      tasks: INITIAL_TASKS,
      doneTasks: [],
    },
  },
  tasks: INITIAL_TASKS,
  undoTasks: null,
  doneTasks: [],
  undoDoneTasks: null,
  toDoneTasks: [],
  title: INITIAL_TITLE,
  isAddModalOpen: false,
  isUndoModalOpen: false,
  undoHideTimeout: null,
  isBulletMenuOpen: false,
  isRenameModalOpen: false,
};
