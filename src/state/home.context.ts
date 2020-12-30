import React, { createContext } from 'react';
import { HOME_INITIAL_STATE } from './home.reducer';

const HomeContext = createContext<{
  state: HomeState;
  dispatch: React.Dispatch<any>;
}>({
  state: HOME_INITIAL_STATE,
  dispatch: () => null,
});

export default HomeContext;
