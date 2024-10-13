import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has a preference stored
    const storedPreference = localStorage.getItem('darkMode');
    if (storedPreference) {
      setIsDarkMode(storedPreference === 'true');
    } else {
      // If no preference, default to dark mode
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Update class on document element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Store user preference
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return { isDarkMode, toggleDarkMode };
};

export default useDarkMode;

