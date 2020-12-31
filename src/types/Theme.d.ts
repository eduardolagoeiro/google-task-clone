interface Theme {
  backgroundColor: string;
  contrast: string;
  primary: string;
  disabled: string;
  text: string;
}

type ThemeReducerActionType = 'SET_THEME_MODE';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
  theme: Theme;
}

interface ThemeReducerAction {
  type: ThemeReducerActionType;
  payload?: {
    mode?: ThemeMode;
  };
}

type ThemeReducerHandler = (
  state: ThemeState,
  action: ThemeReducerAction
) => ThemeState;

type ThemeReducerHandlerMap = Record<
  ThemeReducerActionType,
  ThemeReducerHandler
>;
