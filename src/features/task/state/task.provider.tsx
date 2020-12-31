import React, { useReducer } from 'react';
import TaskContext from './task.context';
import { TaskReducer, TASK_INITIAL_STATE } from './task.reducer';

const TaskProvider = (props: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(TaskReducer, TASK_INITIAL_STATE);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
