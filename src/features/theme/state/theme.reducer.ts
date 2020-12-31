const themes: Record<ThemeMode, Theme> = {
  light: {
    backgroundColor: '#FFFFFF',
    contrast: '#000000',
    primary: '#2373E6',
    disabled: '#B7B7B7',
    text: '#000000',
  },
  dark: {
    backgroundColor: '#000000',
    contrast: '#FFFFFF',
    primary: '#2373E6',
    disabled: '#B7B7B7',
    text: '#FFFFFF',
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
