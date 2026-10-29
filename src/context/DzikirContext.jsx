import { createContext, useContext, useState, useEffect, useRef } from 'react';
import dzikirData from '../data/dzikir';
import { recordCompletion, getStatsSummary, getToday } from '../data/statsData';
import { version as APP_VERSION } from '../../package.json';

export const DEFAULT_SETTINGS = {
  countingMethod: 'marker',
  showTranslation: true,
  showLatin: true,
  showSource: true,
  autoNext: false,
  showSwipeIndicator: true,
  arabicFont: 'Noto Naskh Arabic',
  arabicFontSize: 28,
  quranViewMode: 'page', // 'page' or 'scroll'
  autoTabByTime: true,
};

// Pagi from 03:00 until before Ashar (~15:00), petang from 15:00 onwards
const getTabForTime = (date = new Date()) => {
  const hour = date.getHours();
  return hour >= 3 && hour < 15 ? 'pagi' : 'petang';
};

// Leaving the app in the background longer than this re-picks the tab by time
const AUTO_TAB_IDLE_MS = 30 * 60 * 1000;

// Function to check if localStorage is available and working
const isLocalStorageAvailable = () => {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    console.error('localStorage is not available:', e);
    return false;
  }
};

// Quran bookmark/last read functions (module scope so references stay stable)
const saveQuranProgress = (surahId, ayatIndex) => {
  if (!isLocalStorageAvailable()) return;
  try {
    const quranProgress = JSON.parse(localStorage.getItem('quranProgress') || '{}');
    quranProgress[surahId] = {
      ayatIndex,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('quranProgress', JSON.stringify(quranProgress));
  } catch (error) {
    console.error('Error saving Quran progress:', error);
  }
};

const getQuranProgress = (surahId) => {
  if (!isLocalStorageAvailable()) return null;
  try {
    const quranProgress = JSON.parse(localStorage.getItem('quranProgress') || '{}');
    return quranProgress[surahId] || null;
  } catch (error) {
    console.error('Error getting Quran progress:', error);
    return null;
  }
};

// Saves all app state to localStorage
const saveAllData = ({ settings, data, progressDate, currentTab, currentDzikirIndex }) => {
  localStorage.setItem('dzikirSettings', JSON.stringify(settings));
  localStorage.setItem('dzikirProgress', JSON.stringify(data));
  localStorage.setItem('dzikirProgressDate', progressDate);
  localStorage.setItem('dzikirCurrentTab', currentTab);
  localStorage.setItem('dzikirCurrentIndex', currentDzikirIndex.toString());
};

const DzikirContext = createContext();

export const useDzikir = () => useContext(DzikirContext);

export const DzikirProvider = ({ children }) => {
  // Get initial theme from HTML class before React loads
  const initialTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';

  // Function to get initial settings from localStorage
  const getInitialSettings = () => {
    // Always use version from code, not from localStorage (prevents stale version display)
    const defaults = { ...DEFAULT_SETTINGS, theme: initialTheme, version: APP_VERSION };
    if (!isLocalStorageAvailable()) {
      return defaults;
    }

    try {
      const savedSettings = localStorage.getItem('dzikirSettings');
      if (savedSettings) {
        // Fill in defaults for any settings missing from older saved versions
        return { ...defaults, ...JSON.parse(savedSettings), version: APP_VERSION };
      }
    } catch (error) {
      console.error('Error loading initial settings:', error);
    }

    return defaults;
  };

  // Function to get initial data from localStorage
  const getInitialData = () => {
    if (!isLocalStorageAvailable()) {
      return dzikirData;
    }

    try {
      // Progress is per day: start fresh when the saved progress is from an earlier day
      const savedProgress = localStorage.getItem('dzikirProgressDate') === getToday()
        ? localStorage.getItem('dzikirProgress')
        : null;
      if (savedProgress) {
        const parsedProgress = JSON.parse(savedProgress);
        // Check if the parsed data has the expected structure
        const hasValidStructure =
          parsedProgress &&
          typeof parsedProgress === 'object' &&
          parsedProgress.pagi && Array.isArray(parsedProgress.pagi) &&
          parsedProgress.petang && Array.isArray(parsedProgress.petang);

        if (hasValidStructure) {
          // Create a deep copy of the default data
          const validData = JSON.parse(JSON.stringify(dzikirData));

          // Copy counters from saved data
          ['pagi', 'petang'].forEach(tab => {
            if (parsedProgress[tab] && Array.isArray(parsedProgress[tab])) {
              parsedProgress[tab].forEach((item, index) => {
                if (index < validData[tab].length && typeof item === 'object' && 'counter' in item) {
                  validData[tab][index].counter = item.counter;
                }
              });
            }
          });

          return validData;
        }
      }
    } catch (error) {
      console.error('Error loading initial data:', error);
    }

    // Return default data if no saved data or error
    return dzikirData;
  };

  // Function to get initial tab from localStorage
  const getInitialTab = (autoTabByTime) => {
    // PWA shortcuts open the app with ?tab=pagi or ?tab=petang
    const urlTab = new URLSearchParams(window.location.search).get('tab');
    if (urlTab === 'pagi' || urlTab === 'petang') {
      return urlTab;
    }

    if (autoTabByTime) {
      return getTabForTime();
    }

    if (!isLocalStorageAvailable()) {
      return 'pagi';
    }

    try {
      const savedTab = localStorage.getItem('dzikirCurrentTab');
      if (savedTab && (savedTab === 'pagi' || savedTab === 'petang')) {
        return savedTab;
      }
    } catch (error) {
      console.error('Error loading initial tab:', error);
    }

    return 'pagi';
  };

  // Function to get initial index from localStorage
  const getInitialIndex = (tab) => {
    if (!isLocalStorageAvailable() || tab !== localStorage.getItem('dzikirCurrentTab')) {
      return 0;
    }

    try {
      const savedIndex = parseInt(localStorage.getItem('dzikirCurrentIndex'));
      if (savedIndex >= 0 && savedIndex < dzikirData[tab].length) {
        return savedIndex;
      }
    } catch (error) {
      console.error('Error loading initial index:', error);
    }

    return 0;
  };

  // Initialize state with values from localStorage
  const [settings, setSettings] = useState(getInitialSettings);
  const [currentTab, setCurrentTab] = useState(() => getInitialTab(settings.autoTabByTime));
  const [currentDzikirIndex, setCurrentDzikirIndex] = useState(() => getInitialIndex(currentTab));
  const hiddenAtRef = useRef(null);
  const [data, setData] = useState(getInitialData);
  const [progressDate, setProgressDate] = useState(getToday);

  // When the app comes back from the background (e.g. PWA left open):
  // reset progress on a new day, and re-pick pagi/petang after a long break
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        hiddenAtRef.current = Date.now();
        return;
      }

      if (progressDate !== getToday()) {
        setData(JSON.parse(JSON.stringify(dzikirData)));
        setProgressDate(getToday());
        setCurrentDzikirIndex(0);
      }

      const idleTooLong = hiddenAtRef.current && Date.now() - hiddenAtRef.current >= AUTO_TAB_IDLE_MS;
      if (settings.autoTabByTime && idleTooLong && getTabForTime() !== currentTab) {
        setCurrentTab(getTabForTime());
        setCurrentDzikirIndex(0);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [progressDate, settings.autoTabByTime, currentTab]);

  // Periodically save all data as a backup
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (isLocalStorageAvailable()) {
        try {
          saveAllData({ settings, data, progressDate, currentTab, currentDzikirIndex });
        } catch (error) {
          console.error('Error during periodic save:', error);
        }
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(saveInterval);
  }, [settings, data, progressDate, currentTab, currentDzikirIndex]);

  // Save data when user leaves the page
  useEffect(() => {
    const saveBeforeLeave = () => {
      if (isLocalStorageAvailable()) {
        try {
          saveAllData({ settings, data, progressDate, currentTab, currentDzikirIndex });
        } catch (error) {
          console.error('Error saving data before unload:', error);
        }
      }
    };

    const handleBeforeUnload = () => saveBeforeLeave();
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      saveBeforeLeave(); // Also save when component unmounts
    };
  }, [settings, data, progressDate, currentTab, currentDzikirIndex]);

  // Save all data when any state changes
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (isLocalStorageAvailable()) {
        try {
          saveAllData({ settings, data, progressDate, currentTab, currentDzikirIndex });
        } catch (error) {
          console.error('Error saving data after state change:', error);
        }
      }
    }, 300); // Shorter debounce for responsiveness

    return () => clearTimeout(saveTimeout);
  }, [settings, data, progressDate, currentTab, currentDzikirIndex]);

  // Apply theme based on settings
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  // Switch tab (pagi/petang)
  const switchTab = (tab) => {
    setCurrentTab(tab);
    setCurrentDzikirIndex(0);
  };

  // Navigate to next or previous dzikir
  const navigateDzikir = (direction) => {
    const dzikirList = data[currentTab];
    let newIndex = currentDzikirIndex;

    if (direction === 'next' && currentDzikirIndex < dzikirList.length - 1) {
      newIndex = currentDzikirIndex + 1;
      setCurrentDzikirIndex(newIndex);
    } else if (direction === 'prev' && currentDzikirIndex > 0) {
      newIndex = currentDzikirIndex - 1;
      setCurrentDzikirIndex(newIndex);
    }
  };

  // Update counter for current dzikir
  const updateCounter = (index, value) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData[currentTab][index].counter = value;
    setData(newData);
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    setSettings({
      ...settings,
      theme: newTheme
    });
  };

  // Reset progress
  const resetProgress = () => {
    if (confirm('Apakah Anda yakin ingin mengatur ulang semua progress dzikir?')) {
      const resetData = JSON.parse(JSON.stringify(dzikirData));
      Object.keys(resetData).forEach(tab => {
        resetData[tab].forEach(dzikir => {
          dzikir.counter = 0;
        });
      });
      setData(resetData);
    }
  };

  // Update settings
  const updateSettings = (newSettings) => {
    setSettings({ ...settings, ...newSettings });
  };

  // Check if all dzikir in current tab are complete and record to stats
  const checkAndRecordCompletion = (tabName, tabData) => {
    const allComplete = tabData.every(dzikir => dzikir.counter >= dzikir.count);
    if (allComplete) {
      recordCompletion(tabName);
    }
  };

  // Get current stats summary
  const getStats = () => {
    return getStatsSummary();
  };

  return (
    <DzikirContext.Provider
      value={{
        currentTab,
        currentDzikirIndex,
        settings,
        data,
        switchTab,
        navigateDzikir,
        updateCounter,
        toggleTheme,
        resetProgress,
        updateSettings,
        setCurrentDzikirIndex,
        checkAndRecordCompletion,
        getStats,
        saveQuranProgress,
        getQuranProgress,
      }}
    >
      {children}
    </DzikirContext.Provider>
  );
};
