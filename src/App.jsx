import { useState, useEffect } from 'react';
import { DzikirProvider } from './context/DzikirContext';
import Header from './components/Header';
import DzikirCarousel from './components/DzikirCarousel';
import SettingsDialog from './components/SettingsDialog';
import AboutDialog from './components/AboutDialog';

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load Arabic font
  useEffect(() => {
    // Create a link element for the Arabic font
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;700&display=swap';
    document.head.appendChild(fontLink);

    // Set fonts as loaded
    fontLink.onload = () => setFontsLoaded(true);

    // Cleanup
    return () => {
      document.head.removeChild(fontLink);
    };
  }, []);

  const openSettings = () => setSettingsOpen(true);
  const openAbout = () => {
    setSettingsOpen(false);
    setAboutOpen(true);
  };

  return (
    <DzikirProvider>
      <div className="h-screen max-h-screen overflow-hidden flex flex-col bg-background dark:bg-background transition-colors duration-300">
        <Header openSettings={openSettings} />

        <main className="container mx-auto px-2 py-2 flex-1 flex items-center justify-center overflow-hidden">
          {fontsLoaded ? (
            <div className="w-full max-w-3xl mx-auto h-full">
              <DzikirCarousel />
            </div>
          ) : (
            <div className="text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">Memuat...</p>
            </div>
          )}
        </main>

        <SettingsDialog
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
          openAbout={openAbout}
        />

        <AboutDialog
          open={aboutOpen}
          onOpenChange={setAboutOpen}
        />
      </div>
    </DzikirProvider>
  );
}

export default App;
