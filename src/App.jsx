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

  // Load Arabic fonts
  useEffect(() => {
    // Create link elements for the Arabic fonts
    const fontLinks = [
      'https://fonts.googleapis.com/css2?family=Amiri+Quran&display=swap',
      'https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Playpen+Sans:wght@400;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Lateef:wght@400;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Harmattan:wght@400;700&display=swap'
    ].map(href => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      return link;
    });

    // Add all font links to head
    fontLinks.forEach(link => document.head.appendChild(link));

    // Set fonts as loaded when all fonts are loaded
    Promise.all(fontLinks.map(link => {
      return new Promise((resolve) => {
        link.onload = resolve;
      });
    })).then(() => setFontsLoaded(true));

    // Cleanup
    return () => {
      fontLinks.forEach(link => document.head.removeChild(link));
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
