interface StateProvider<State, ReducerAction> {
  state: State;
  dispatch: React.Dispatch<ReducerAction>;
}
