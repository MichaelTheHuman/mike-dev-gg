import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './base';
import { StylesProvider } from '@mui/styles';

export const ThemeContext = React.createContext(
  (themeName: string): void => {}
);

const ThemeProviderWrapper: React.FC = (props) => {
  // const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme';
  const defaultTheme = 'NebulaFighterTheme';
  if (!localStorage.getItem('appTheme')) {
    localStorage.setItem('appTheme', defaultTheme);
  }
  const curThemeName = localStorage.getItem('appTheme');
  // console.log("Theme: " + curThemeName);
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = (newThemeName: string): void => {
    if (newThemeName === '') {
      newThemeName = 'NebulaFighterTheme';
      if (themeName === 'NebulaFighterTheme') {
        newThemeName = 'PureLightTheme';
      }
    }
    localStorage.setItem('appTheme', newThemeName);
    _setThemeName(newThemeName);
  };

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
