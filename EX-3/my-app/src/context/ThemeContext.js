import React, { createContext, useState, useMemo } from "react";
import { lightTheme, darkTheme } from "../theme/colors";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const value = useMemo(
    () => ({
      isDark,
      colors: isDark ? darkTheme : lightTheme,
      toggleTheme,
    }),
    [isDark],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
