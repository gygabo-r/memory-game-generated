import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Try different SW paths for different deployment scenarios
    const swPaths = ['/sw.js', './sw.js'];
    
    const registerSW = async () => {
      for (const swPath of swPaths) {
        try {
          const registration = await navigator.serviceWorker.register(swPath);
          console.log('SW registered successfully:', registration);
          
          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('New SW version available');
                }
              });
            }
          });
          
          return; // Success, exit loop
        } catch (error) {
          console.log(`Failed to register SW at ${swPath}:`, error);
        }
      }
      console.error('Failed to register service worker at any path');
    };
    
    registerSW();
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
