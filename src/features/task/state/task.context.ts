import React, { createContext } from 'react';
import { TASK_INITIAL_STATE } from './task.reducer';

const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<TaskReducerAction>;
}>({
  state: TASK_INITIAL_STATE,
  dispatch: () => null,
});

export default TaskContext;
