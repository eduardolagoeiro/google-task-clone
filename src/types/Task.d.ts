interface Task {
  value: string;
  done: boolean;
  id: number;
}

type TaskReducerActionType =
  | 'RESTORE'
  | 'OPEN_ADD_MODAL'
  | 'CLOSE_ADD_MODAL'
  | 'OPEN_UNDO_MODAL'
  | 'CLOSE_UNDO_MODAL'
  | 'ADD_TASK'
  | 'REMOVE_TASK'
  | 'UNDO_REMOVE_TASK';

interface TaskReducerAction {
  type: TaskReducerActionType;
  payload?: any;
}

interface TaskState {
  tasks: Task[];
  isAddModalOpen: boolean;
  isUndoModalOpen: boolean;
  undoHideTimeout: NodeJS.Timeout | null;
  removedTasks: Task[];
  undoTasks: Task[] | null;
}

type TaskReducerHandler = (
  state: TaskState,
  action: TaskReducerAction
) => TaskState;
