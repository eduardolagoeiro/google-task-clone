import { NamedColors } from '../Colors';

const themes: Record<ThemeMode, Theme> = {
  light: {
    backgroundColor: '#FFFFFF',
    backgroundColorLight: '#FFFFFF',
    contrast: '#000000',
    primary: '#2373E6',
    primaryLight: '#EEF8FC',
    primaryAccent: '#93AFEF',
    disabled: '#B7B7B7',
    text: '#000000',
    highlightGrayUnderlay: NamedColors.Gray050,
  },
  dark: {
    backgroundColor: '#212121',
    backgroundColorLight: '#303135',
    contrast: '#EEEEEE',
    primary: '#2373E6',
    primaryLight: '#082349',
    primaryAccent: '#0E3E81',
    disabled: '#B7B7B7',
    text: '#FFFFFF',
    highlightGrayUnderlay: NamedColors.Gray500,
  },
};

const themeReducerHandlerMap: ThemeReducerHandlerMap = {
  SET_THEME_MODE: (state, action) => {
    return {
      ...state,
      mode: action.payload?.mode || state.mode,
      theme: themes[action.payload?.mode || state.mode],
    };
  },
};

export const ThemeReducer: ThemeReducerHandler = (state, action) => {
  const themeReducerHandler = themeReducerHandlerMap[action.type];
  if (themeReducerHandler) return themeReducerHandler(state, action);
  return state;
};
export const THEME_INITIAL_STATE: ThemeState = {
  mode: 'light',
  theme: themes.light,
};
