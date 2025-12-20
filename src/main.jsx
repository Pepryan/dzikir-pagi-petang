import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Verify theme is correctly applied before React renders
// This is a backup to the inline script in index.html
function verifyThemeBeforeRender() {
  try {
    // Check what theme is currently applied to the document
    const isDarkMode = document.documentElement.classList.contains('dark');
    const currentTheme = isDarkMode ? 'dark' : 'light';
    // Check what theme should be applied according to localStorage
    const savedSettings = localStorage.getItem('dzikirSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      const savedTheme = parsedSettings && parsedSettings.theme;

      // If there's a mismatch, fix it
      if (savedTheme === 'dark' && !isDarkMode) {
        document.documentElement.classList.add('dark');
      } else if (savedTheme === 'light' && isDarkMode) {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // If no saved settings, use system preference
      const prefersDarkMode = window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (prefersDarkMode && !isDarkMode) {
        document.documentElement.classList.add('dark');
      } else if (!prefersDarkMode && isDarkMode) {
        document.documentElement.classList.remove('dark');
      }
    }

    // Store the final theme
    window.__VERIFIED_THEME__ = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  } catch (error) {
    console.error('Error verifying theme before render:', error);
  }
}

// Verify theme before rendering
verifyThemeBeforeRender();

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Use relative path for service worker to work in both dev and production
    const swPath = import.meta.env.BASE_URL + 'sw.js';
    navigator.serviceWorker.register(swPath)
      .then(() => {
        // Service worker registered successfully
      })
      .catch(() => {
        // Service worker registration failed - silent fail for production
      });
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
