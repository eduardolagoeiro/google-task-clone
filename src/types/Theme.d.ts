interface Theme {
  backgroundColor: string;
  backgroundColorLight: string;
  contrast: string;
  primary: string;
  primaryLight: string;
  primaryAccent: string;
  disabled: string;
  text: string;
  highlightGrayUnderlay: string;
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
