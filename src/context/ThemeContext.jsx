import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the Theme Context
const ThemeContext = createContext();

// Create a custom hook to use the theme context easily
export const useTheme = () => useContext(ThemeContext);

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to 'dark'
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? storedTheme : 'dark';
  });

  // Effect to apply the 'dark' or 'light' class to the HTML element
  // and update localStorage whenever the theme changes
  useEffect(() => {
    const root = window.document.documentElement; // Get the HTML element
    const oldTheme = theme === 'dark' ? 'light' : 'dark'; // Determine the previous theme class

    root.classList.remove(oldTheme); // Remove the old theme class
    root.classList.add(theme); // Add the new theme class to the HTML element

    localStorage.setItem('theme', theme); // Store the current theme in localStorage
  }, [theme]); // Rerun this effect whenever 'theme' state changes

  // Function to toggle between 'light' and 'dark'
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
