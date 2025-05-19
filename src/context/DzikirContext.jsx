import { createContext, useContext, useState, useEffect } from 'react';
import dzikirData from '../data/dzikir';

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

const DzikirContext = createContext();

export const useDzikir = () => useContext(DzikirContext);

export const DzikirProvider = ({ children }) => {
  // Get initial theme from HTML class before React loads
  const initialTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';

  // Function to get initial settings from localStorage
  const getInitialSettings = () => {
    if (!isLocalStorageAvailable()) {
      return {
        theme: initialTheme,
        countingMethod: 'marker',
        showTranslation: true,
        showLatin: true,
        showSource: true,
        autoNext: false,
        showSwipeIndicator: true,
        version: '2.0.0'
      };
    }

    try {
      const savedSettings = localStorage.getItem('dzikirSettings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        // Ensure all required settings exist with defaults if missing
        const defaultSettings = {
          theme: initialTheme,
          countingMethod: 'marker',
          showTranslation: true,
          showLatin: true,
          showSource: true,
          autoNext: false,
          showSwipeIndicator: true,
          version: '2.0.0'
        };
        // Create a complete settings object with defaults for any missing properties
        return { ...defaultSettings, ...parsedSettings };
      }
    } catch (error) {
      console.error('Error loading initial settings:', error);
    }

    // Return defaults if no saved settings or error
    return {
      theme: initialTheme,
      countingMethod: 'marker',
      showTranslation: true,
      showLatin: true,
      showSource: true,
      autoNext: false,
      showSwipeIndicator: true,
      arabicFont: 'Noto Naskh Arabic',
      arabicFontSize: 28,
      version: '2.0.0'
    };
  };

  // Function to get initial data from localStorage
  const getInitialData = () => {
    if (!isLocalStorageAvailable()) {
      return dzikirData;
    }

    try {
      const savedProgress = localStorage.getItem('dzikirProgress');
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
  const getInitialTab = () => {
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
  const getInitialIndex = () => {
    if (!isLocalStorageAvailable()) {
      return 0;
    }

    try {
      const savedIndex = localStorage.getItem('dzikirCurrentIndex');
      if (savedIndex && !isNaN(parseInt(savedIndex))) {
        return parseInt(savedIndex);
      }
    } catch (error) {
      console.error('Error loading initial index:', error);
    }

    return 0;
  };

  // Initialize state with values from localStorage
  const [currentTab, setCurrentTab] = useState(getInitialTab());
  const [currentDzikirIndex, setCurrentDzikirIndex] = useState(getInitialIndex());
  const [settings, setSettings] = useState(getInitialSettings());
  const [data, setData] = useState(getInitialData());

  // Periodically save all data as a backup
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (isLocalStorageAvailable()) {
        try {
          localStorage.setItem('dzikirSettings', JSON.stringify(settings));
          localStorage.setItem('dzikirProgress', JSON.stringify(data));
          localStorage.setItem('dzikirCurrentTab', currentTab);
          localStorage.setItem('dzikirCurrentIndex', currentDzikirIndex.toString());
        } catch (error) {
          console.error('Error during periodic save:', error);
        }
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(saveInterval);
  }, [settings, data, currentTab, currentDzikirIndex]);

  // Save data when user leaves the page
  useEffect(() => {
    const saveAllData = () => {
      if (isLocalStorageAvailable()) {
        try {
          localStorage.setItem('dzikirSettings', JSON.stringify(settings));
          localStorage.setItem('dzikirProgress', JSON.stringify(data));
          localStorage.setItem('dzikirCurrentTab', currentTab);
          localStorage.setItem('dzikirCurrentIndex', currentDzikirIndex.toString());
        } catch (error) {
          console.error('Error saving data before unload:', error);
        }
      }
    };

    const handleBeforeUnload = () => saveAllData();
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      saveAllData(); // Also save when component unmounts
    };
  }, [settings, data, currentTab, currentDzikirIndex]);

  // Save all data when any state changes
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (isLocalStorageAvailable()) {
        try {
          localStorage.setItem('dzikirSettings', JSON.stringify(settings));
          localStorage.setItem('dzikirProgress', JSON.stringify(data));
          localStorage.setItem('dzikirCurrentTab', currentTab);
          localStorage.setItem('dzikirCurrentIndex', currentDzikirIndex.toString());
        } catch (error) {
          console.error('Error saving data after state change:', error);
        }
      }
    }, 300); // Shorter debounce for responsiveness

    return () => clearTimeout(saveTimeout);
  }, [settings, data, currentTab, currentDzikirIndex]);

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
      }}
    >
      {children}
    </DzikirContext.Provider>
  );
};
