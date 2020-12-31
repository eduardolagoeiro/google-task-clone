import ProviderFactory from '../../../util/ProviderFactory';
import ThemeContext from './theme.context';
import { ThemeReducer, THEME_INITIAL_STATE } from './theme.reducer';

const ThemeProvider = ProviderFactory.create<ThemeState, ThemeReducerAction>(
  ThemeContext.Provider,
  ThemeReducer,
  THEME_INITIAL_STATE
);

export default ThemeProvider;
