import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const lightTheme = {
  primary: '#2563eb',
  secondary: '#10b981',
  accent: '#f59e0b',
  background: '#ffffff',
  backgroundSecondary: '#f8fafc',
  text: '#1f2937',
  textSecondary: '#6b7280',
  border: '#e5e7eb',
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowLg: 'rgba(0, 0, 0, 0.1)',
};

export const darkTheme = {
  primary: '#3b82f6',
  secondary: '#34d399',
  accent: '#fbbf24',
  background: '#111827',
  backgroundSecondary: '#1f2937',
  text: '#c96d05',
  textSecondary: '#d1d5db',
  border: '#374151',
  shadow: 'rgba(0, 0, 0, 0.3)',
  shadowLg: 'rgba(0, 0, 0, 0.3)',
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    setTheme(isDark ? darkTheme : lightTheme);
  }, [isDark]);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme === 'dark') {
        setIsDark(true);
      }
    } catch (error) {
      console.log('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};