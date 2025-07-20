import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { theme } = useTheme();
  const { language } = useLanguage();

  return (
    <footer
      style={{
        backgroundColor: theme === 'light' ? '#eee' : '#444',
        color: theme === 'light' ? '#333' : '#fff',
        padding: '1rem',
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      <p>{language === 'ko' ? '© 2023 내 웹사이트. 모든 권리 보유.' : '© 2023 My Website. All rights reserved.'}</p>
    </footer>
  );
}
