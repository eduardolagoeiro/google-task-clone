import React, { createContext } from 'react';
import { HOME_INITIAL_STATE } from './task.reducer';

const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<any>;
}>({
  state: HOME_INITIAL_STATE,
  dispatch: () => null,
});

export default TaskContext;
