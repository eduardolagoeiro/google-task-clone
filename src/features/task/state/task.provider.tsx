import ProviderFactory from '../../../util/ProviderFactory';
import TaskContext from './task.context';
import { TaskReducer, TASK_INITIAL_STATE } from './task.reducer';

const TaskProvider = ProviderFactory.create<TaskState, TaskReducerAction>(
  TaskContext.Provider,
  TaskReducer,
  TASK_INITIAL_STATE
);

export default TaskProvider;
