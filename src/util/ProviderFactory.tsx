import React, { useReducer } from 'react';

function create<State, ReducerAction>(
  Provider: React.Provider<StateProvider<State, ReducerAction>>,
  reducer: (state: State, action: ReducerAction) => State,
  initialState: State
) {
  function ProviderComponent(props: { children: JSX.Element }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <Provider value={{ state, dispatch }}>{props.children}</Provider>;
  }
  return ProviderComponent;
}

const ProviderFactory = {
  create,
};

export default ProviderFactory;
