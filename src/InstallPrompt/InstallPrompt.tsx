import { useState, useEffect } from 'react';
import './InstallPrompt.css';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; }>;
}

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    // Check device type
    const checkDevice = () => {
      const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      setIsIOS(isIOSDevice);
      
      const standalone = window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone ||
        document.referrer.includes('android-app://');
      setIsStandalone(standalone);
      console.log('PWA Debug - iOS:', isIOSDevice, 'Standalone:', standalone);
    };

    checkDevice();

    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Only show prompt if not already standalone, user has interacted, and after a delay
      if (!isStandalone && hasUserInteracted) {
        setTimeout(() => {
          setShowInstallPrompt(true);
        }, 2000);
      }
    };

    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      setIsStandalone(true);
    };

    // Listen for display mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = () => {
      checkDevice();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    mediaQuery.addEventListener('change', handleDisplayModeChange);

    // Track user interaction
    const handleUserInteraction = () => {
      setHasUserInteracted(true);
    };

    // Add event listeners for user interaction
    window.addEventListener('click', handleUserInteraction, { once: true });
    window.addEventListener('touchstart', handleUserInteraction, { once: true });
    window.addEventListener('keydown', handleUserInteraction, { once: true });

    // For iOS devices, show manual install prompt after delay and user interaction
    if (isIOS && !isStandalone && hasUserInteracted) {
      const timer = setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }

    // Debug: Check PWA requirements
    console.log('PWA Debug Info:', {
      hasServiceWorker: 'serviceWorker' in navigator,
      hasManifest: !!document.querySelector('link[rel="manifest"]'),
      isSecure: location.protocol === 'https:' || location.hostname === 'localhost',
      standalone: isStandalone,
      isIOS: isIOS
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      mediaQuery.removeEventListener('change', handleDisplayModeChange);
    };
  }, [isStandalone, isIOS, hasUserInteracted]);

  const handleInstallClick = async () => {
    if (isIOS) {
      // For iOS, we can't programmatically install, so just hide the prompt
      setShowInstallPrompt(false);
      return;
    }

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
  };

  // Don't show prompt if standalone
  if (!showInstallPrompt || isStandalone) return null;
  
  // For non-iOS devices, also require deferred prompt
  if (!isIOS && !deferredPrompt) return null;

  return (
    <div className="install-prompt">
      <div className="install-prompt-content">
        <div className="install-prompt-icon">📱</div>
        <div className="install-prompt-text">
          <h3>Install Memory Game</h3>
          {isIOS ? (
            <p>Tap the Share button <span style={{display: 'inline-block', fontSize: '16px'}}>⬆️</span> and select "Add to Home Screen" to install this game!</p>
          ) : (
            <p>Add this game to your home screen for quick access and offline play!</p>
          )}
        </div>
        <div className="install-prompt-buttons">
          <button className="install-button" onClick={handleInstallClick}>
            {isIOS ? 'Got it!' : 'Install'}
          </button>
          <button className="dismiss-button" onClick={handleDismiss}>
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstallPrompt;