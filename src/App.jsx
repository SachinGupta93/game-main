import { useState, useEffect, useCallback, useRef } from 'react';
import IntroScreen from './components/IntroScreen';
import GameScreen from './components/GameScreen';
import TutorialScreen from './components/TutorialScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('intro');
  const [userName, setUserName] = useState('');
  const [cheatDetected, setCheatDetected] = useState(false);
  const [cheatReason, setCheatReason] = useState('');
  const [screenshotWarning, setScreenshotWarning] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [currentWarningMessage, setCurrentWarningMessage] = useState('');
  const screenshotTimerRef = useRef(null);
  const windowSizeRef = useRef({ w: window.innerWidth, h: window.innerHeight });
  const gameStartedRef = useRef(false);
  const warningCooldownRef = useRef(false); // Prevents multiple warnings from one action

  const handleStart = (name) => {
    setUserName(name);
    setCurrentScreen('tutorial');
  };

  const enterFullscreen = useCallback(() => {
    const el = document.documentElement;

    // Try standard fullscreen API
    if (el.requestFullscreen) {
      el.requestFullscreen().catch((err) => {
        console.error('Fullscreen request failed:', err);
        // Fallback: try webkit
        if (el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen();
        }
      });
    }
    // Try webkit (Safari)
    else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
    // Try webkit with ALLOW_KEYBOARD_INPUT (older Safari)
    else if (el.webkitRequestFullScreen) {
      el.webkitRequestFullScreen();
    }
    // Try MS (IE11)
    else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    }
    // Try Mozilla
    else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    }
  }, []);

  const handleTutorialComplete = () => {
    setCurrentScreen('game');
    // Request fullscreen immediately
    setTimeout(() => {
      enterFullscreen();
      // Set flag after fullscreen transition
      setTimeout(() => {
        gameStartedRef.current = true;
      }, 1500);
    }, 100);
  };

  const triggerCheat = useCallback((reason) => {
    setCheatReason(reason);
    setCheatDetected(true);
    setWarningCount(0); // Reset warnings when game terminates
  }, []);

  const triggerWarning = useCallback((reason) => {
    // Cooldown: ignore multiple events from the same user action (e.g. fullscreen exit fires blur + visibilitychange + fullscreenchange)
    if (warningCooldownRef.current) return;
    warningCooldownRef.current = true;
    setTimeout(() => { warningCooldownRef.current = false; }, 3000); // 3s cooldown

    setWarningCount(prev => {
      const newCount = prev + 1;

      if (newCount > 3) {
        // Terminate game after 3 warnings
        setCheatReason(`Game Terminated: ${reason} (3 warnings exceeded)`);
        setCheatDetected(true);
        return 0;
      } else {
        // Show warning
        setCurrentWarningMessage(reason);
        setScreenshotWarning(true);

        // Re-enter fullscreen if not in fullscreen
        setTimeout(() => {
          const isFullscreen = document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement;

          if (!isFullscreen) {
            const el = document.documentElement;
            if (el.requestFullscreen) {
              el.requestFullscreen().catch((err) => {
                console.error('Fullscreen re-entry failed:', err);
              });
            } else if (el.webkitRequestFullscreen) {
              el.webkitRequestFullscreen();
            } else if (el.webkitRequestFullScreen) {
              el.webkitRequestFullScreen();
            } else if (el.msRequestFullscreen) {
              el.msRequestFullscreen();
            } else if (el.mozRequestFullScreen) {
              el.mozRequestFullScreen();
            }
          }
        }, 100);

        if (screenshotTimerRef.current) clearTimeout(screenshotTimerRef.current);
        screenshotTimerRef.current = setTimeout(() => {
          setScreenshotWarning(false);
          setCurrentWarningMessage('');
        }, 2000); // Show warning for 2 seconds

        return newCount;
      }
    });
  }, []);

  const triggerScreenshotWarning = useCallback(() => {
    triggerWarning('Screenshot attempt detected');
    // Also clear clipboard
    if (navigator.clipboard) navigator.clipboard.writeText('⚠️ Screenshot blocked by Fantasy Quest').catch(() => { });
  }, [triggerWarning]);

  useEffect(() => {
    if (currentScreen !== 'game') return;

    // --- VISIBILITY (Tab Switch / Minimize) ---
    const onVisibility = () => {
      if (document.hidden) {
        triggerWarning('Tab switching or minimizing detected');
      }
    };

    // --- RIGHT-CLICK ---
    const onContextMenu = (e) => e.preventDefault();

    // --- BLOCK ALL DANGEROUS HOTKEYS ---
    const onKeyDown = (e) => {
      // PrintScreen
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        e.stopImmediatePropagation();
        triggerScreenshotWarning();
        return false;
      }

      // F1-F12 (block all function keys)
      if (/^F\d{1,2}$/.test(e.key)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (e.key === 'F12') triggerScreenshotWarning();
        return false;
      }

      // Ctrl combos
      if (e.ctrlKey) {
        // Ctrl+Shift combos (DevTools, Snipping, etc.)
        if (e.shiftKey) {
          e.preventDefault();
          e.stopImmediatePropagation();
          triggerScreenshotWarning();
          return false;
        }
        // Ctrl+key combos (copy, paste, save, print, view-source, etc.)
        const blockedKeys = ['c', 'v', 'u', 's', 'p', 'a', 'x', 'j', 'g', 'f', 'h', 'l', 'k', 'd', 'e', 'r', 'w', 'n', 't'];
        if (blockedKeys.includes(e.key.toLowerCase())) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return false;
        }
      }

      // Alt combos (Alt+Tab can't be blocked, but Alt+F4 etc.)
      if (e.altKey) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
      }

      // Meta/Win key combos
      if (e.metaKey) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (e.shiftKey) triggerScreenshotWarning();
        return false;
      }

      // Escape key (prevent exiting fullscreen silently)
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        // Don't trigger warning here - let fullscreenchange handle it
        return false;
      }
    };

    // Also block on keyup (PrintScreen fires on keyup in some browsers)
    const onKeyUp = (e) => {
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (navigator.clipboard) navigator.clipboard.writeText('').catch(() => { });
        triggerScreenshotWarning();
        return false;
      }
    };

    // --- FULLSCREEN EXIT DETECTION ---
    const onFullscreenChange = () => {
      const isFullscreen = document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;

      if (!isFullscreen && currentScreen === 'game' && gameStartedRef.current) {
        triggerWarning('Exited fullscreen mode');
      }
    };

    // --- COPY/CUT/PASTE/DRAG PREVENTION ---
    const prevent = (e) => e.preventDefault();

    // --- WINDOW RESIZE (Snipping Tool detection) ---
    const onResize = () => {
      const { w, h } = windowSizeRef.current;
      const dw = Math.abs(window.innerWidth - w);
      const dh = Math.abs(window.innerHeight - h);
      // Only trigger for significant resizes after game has started (not fullscreen toggle or initial load)
      if ((dw > 200 || dh > 200) && w > 0 && h > 0 && gameStartedRef.current) {
        triggerScreenshotWarning();
      }
      windowSizeRef.current = { w: window.innerWidth, h: window.innerHeight };
    };

    // --- WINDOW BLUR (Alt+Tab / clicking outside) ---
    const onBlur = () => {
      if (document.fullscreenElement && gameStartedRef.current) {
        triggerWarning('Window lost focus (Alt+Tab or external activity)');
      }
    };

    // --- PRINT ---
    const onBeforePrint = () => triggerScreenshotWarning();

    // Attach all listeners (useCapture=true for key events)
    document.addEventListener('visibilitychange', onVisibility);
    document.addEventListener('contextmenu', onContextMenu);
    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('keyup', onKeyUp, true);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);
    document.addEventListener('mozfullscreenchange', onFullscreenChange);
    document.addEventListener('MSFullscreenChange', onFullscreenChange);
    document.addEventListener('copy', prevent);
    document.addEventListener('cut', prevent);
    document.addEventListener('paste', prevent);
    document.addEventListener('dragstart', prevent);
    document.addEventListener('selectstart', prevent);
    window.addEventListener('resize', onResize);
    window.addEventListener('blur', onBlur);
    window.addEventListener('beforeprint', onBeforePrint);

    // CSS-level protection: hide content from screenshots
    document.body.style.setProperty('-webkit-user-select', 'none');
    document.body.style.setProperty('user-select', 'none');

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('contextmenu', onContextMenu);
      document.removeEventListener('keydown', onKeyDown, true);
      document.removeEventListener('keyup', onKeyUp, true);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
      document.removeEventListener('mozfullscreenchange', onFullscreenChange);
      document.removeEventListener('MSFullscreenChange', onFullscreenChange);
      document.removeEventListener('copy', prevent);
      document.removeEventListener('cut', prevent);
      document.removeEventListener('paste', prevent);
      document.removeEventListener('dragstart', prevent);
      document.removeEventListener('selectstart', prevent);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('beforeprint', onBeforePrint);
    };
  }, [currentScreen, enterFullscreen, triggerScreenshotWarning, triggerWarning]);

  // CHEAT SCREEN
  if (cheatDetected) {
    return (
      <div className="cheat-detected-screen">
        <div className="cheat-icon">🚫</div>
        <h1 className="cheat-title">GAME TERMINATED</h1>
        <div className="cheat-divider"></div>
        <p className="cheat-reason">{cheatReason || 'Suspicious activity detected'}</p>
        <p className="cheat-sub">Your game progress has been forfeited.</p>
        <button
          className="cheat-btn"
          onClick={() => {
            setCheatDetected(false);
            setCheatReason('');
            setCurrentScreen('intro');
            setWarningCount(0);
            gameStartedRef.current = false;
            if (document.exitFullscreen && document.fullscreenElement) {
              document.exitFullscreen().catch(() => { });
            }
          }}
        >
          Return to Start
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Screenshot Warning Overlay */}
      {screenshotWarning && (
        <div className="screenshot-warning-overlay">
          <div className="screenshot-warning-content">
            <div className="warning-pulse-ring"></div>
            <div className="warning-icon">⚠️</div>
            <h1>WARNING {warningCount}/3</h1>
            <p className="warning-reason">{currentWarningMessage}</p>
            <p className="warning-sub">You have {3 - warningCount} warning{3 - warningCount !== 1 ? 's' : ''} remaining.</p>
            {warningCount >= 2 && <p className="warning-sub-critical">Next violation will terminate the game!</p>}
          </div>
        </div>
      )}

      {currentScreen === 'intro' && <IntroScreen onStart={handleStart} />}
      {currentScreen === 'tutorial' && <TutorialScreen userName={userName} onComplete={handleTutorialComplete} />}
      {currentScreen === 'game' && <GameScreen userName={userName} warningCount={warningCount} enterFullscreen={enterFullscreen} onGameOver={() => {
        // Stay in fullscreen — do NOT exit
      }} />}
    </>
  );
}
