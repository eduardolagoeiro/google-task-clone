import AsyncStorage from '@react-native-async-storage/async-storage';
import { LayoutAnimation } from 'react-native';

const INITIAL_TASKS: Task[] = [];

const INITIAL_TITLE = 'New task list';

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
  isBurgerMenuOpen: false,
};

function getTitle(
  titles: string[],
  oldTitle: string,
  newTitle: string,
  rename?: boolean
) {
  let t = newTitle;
  let i = 2;
  while (titles.includes(t) && (rename ? t !== oldTitle : true)) {
    t = `${newTitle} (${i})`;
    i++;
  }
  return t;
}

const taskReducerHandlerMap: Record<
  TaskReducerActionType,
  TaskReducerHandler
> = {
  CLOSE_BURGER_MENU: (state) => ({
    ...state,
    isBurgerMenuOpen: false,
  }),
  OPEN_BURGER_MENU: (state) => ({
    ...state,
    isBurgerMenuOpen: true,
  }),
  RESET: () => TASK_INITIAL_STATE,
  RESTORE: (state, action) => ({
    ...state,
    ...action.payload?.lastState,
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
    if (action.payload?.task) {
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
    }
    return state;
  },
  DONE_TASK: (state, action) => {
    if (action.payload?.task) {
      const tasks = state.tasks.filter(
        (el) => el.id !== action.payload?.task?.id
      );
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
        undoHideTimeout: action.payload?.undoHideTimeout || null,
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
    }
    return state;
  },
  UNDO_DONE_TASK: (state, action) => {
    if (action.payload?.task?.id) {
      const doneTasks = state.doneTasks.filter(
        (el) => el.id !== action.payload?.task?.id
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
    const payloadTitle = action.payload?.title;
    if (payloadTitle && payloadTitle !== state.title) {
      const newTitle = getTitle(
        Object.keys(state.taskListMap),
        state.title,
        payloadTitle,
        true
      );
      const taskListMap: Record<
        string,
        { tasks: Task[]; doneTasks: Task[] }
      > = {};
      Object.keys(state.taskListMap).forEach((key) => {
        if (state.title === key) taskListMap[newTitle] = state.taskListMap[key];
        else taskListMap[key] = state.taskListMap[key];
      });
      return { ...state, title: newTitle, taskListMap };
    }
    return state;
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
  CHANGE_LIST: (state, action) => {
    const title = action.payload?.title;
    if (
      title &&
      title !== state.title &&
      Object.keys(state.taskListMap).includes(title)
    ) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const { doneTasks, tasks } = state.taskListMap[title];
      return {
        ...state,
        title: title,
        doneTasks,
        tasks,
      };
    }
    return state;
  },
  CREATE_NEW_LIST: (state, action) => {
    const payloadTitle = action.payload?.title || INITIAL_TITLE;
    const newTitle = getTitle(
      Object.keys(state.taskListMap),
      state.title,
      payloadTitle
    );
    return {
      ...TASK_INITIAL_STATE,
      title: newTitle,
      taskListMap: {
        ...state.taskListMap,
        [newTitle]: {
          doneTasks: [],
          tasks: [],
        },
      },
    };
  },
  DELETE_LIST: (state, action) => {
    const title = action.payload?.title;
    if (title) {
      const taskListMap = { ...state.taskListMap };
      delete taskListMap[title];
      const firstTitle = Object.keys(taskListMap)[0] || INITIAL_TITLE;
      taskListMap[firstTitle] = taskListMap[firstTitle] || {
        tasks: [],
        doneTasks: [],
      };
      const t = taskListMap[firstTitle];
      return {
        ...state,
        title: firstTitle,
        tasks: t.tasks,
        doneTasks: t.doneTasks,
        taskListMap,
      };
    }
    return state;
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
    payload: {
      lastState,
    },
  };
}

export function updateTilte(newTitle: string): TaskReducerAction {
  return {
    type: 'UPDATE_TITLE',
    payload: {
      title: newTitle,
    },
  };
}
