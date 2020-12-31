import { createContext } from 'react';
import { TASK_INITIAL_STATE } from './task.reducer';

const TaskContext = createContext<StateProvider<TaskState, TaskReducerAction>>({
  state: TASK_INITIAL_STATE,
  dispatch: () => null,
});

export default TaskContext;
