import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeTest: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{
      padding: '20px',
      backgroundColor: theme === 'light' ? '#f0f0f0' : '#555',
      color: theme === 'light' ? '#333' : '#eee',
      border: '1px solid ' + (theme === 'light' ? '#ccc' : '#777')
    }}>
      <h2>Theme Test Page</h2>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

export default ThemeTest;
