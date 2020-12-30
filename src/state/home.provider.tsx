import React, { useReducer } from 'react';
import HomeContext from './home.context';
import { HomeReducer, HOME_INITIAL_STATE } from './home.reducer';

const HomeProvier = (props: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(HomeReducer, HOME_INITIAL_STATE);

  return (
    <HomeContext.Provider value={{ state, dispatch }}>
      {props.children}
    </HomeContext.Provider>
  );
};

export default HomeProvier;
