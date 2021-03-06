interface Task {
  value: string;
  done: boolean;
  createdAt: Date;
  doneAt: Date | null;
  id: number;
}

type TaskReducerActionType =
  | 'RESTORE'
  | 'OPEN_ADD_MODAL'
  | 'CLOSE_ADD_MODAL'
  | 'OPEN_UNDO_MODAL'
  | 'CLOSE_UNDO_MODAL'
  | 'ADD_TASK'
  | 'DONE_TASK'
  | 'UNDO_DONE_TASK'
  | 'OPEN_BULLET_MENU'
  | 'CLOSE_BULLET_MENU'
  | 'OPEN_BURGER_MENU'
  | 'CLOSE_BURGER_MENU'
  | 'OPEN_RENAME_TITLE'
  | 'CLOSE_RENAME_TITLE'
  | 'UPDATE_TITLE'
  | 'REMOVE_DONE_TASK'
  | 'CHANGE_LIST'
  | 'CREATE_NEW_LIST'
  | 'RESET'
  | 'DELETE_LIST'
  | 'REORDER_TASK_LIST';

interface TaskReducerAction {
  type: TaskReducerActionType;
  payload?: {
    task?: Task;
    title?: string;
    undoHideTimeout?: NodeJS.Timeout;
    lastState?: TaskState;
    fromIndex?: number;
    toIndex?: number;
  };
}

interface TaskState {
  title: string;
  taskListMap: Record<
    string,
    {
      tasks: Task[];
      doneTasks: Task[];
    }
  >;
  tasks: Task[];
  undoTasks: Task[] | null;
  doneTasks: Task[];
  undoDoneTasks: Task[] | null;
  toDoneTasks: Task[];
  isAddModalOpen: boolean;
  isUndoModalOpen: boolean;
  undoHideTimeout: NodeJS.Timeout | null;
  isBulletMenuOpen: boolean;
  isRenameModalOpen: boolean;
  isBurgerMenuOpen: boolean;
}

type TaskReducerHandler = (
  state: TaskState,
  action: TaskReducerAction
) => TaskState;
