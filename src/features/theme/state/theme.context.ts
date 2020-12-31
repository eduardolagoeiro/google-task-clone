import { createContext } from 'react';
import { THEME_INITIAL_STATE } from './theme.reducer';

const ThemeContext = createContext<
  StateProvider<ThemeState, ThemeReducerAction>
>({
  state: THEME_INITIAL_STATE,
  dispatch: () => null,
});

export default ThemeContext;
