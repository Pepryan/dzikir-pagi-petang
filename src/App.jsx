import { useState, useEffect, lazy, Suspense } from 'react';
import { DzikirProvider, useDzikir } from './context/DzikirContext';
import Header from './components/Header';
import DzikirCarousel from './components/DzikirCarousel';
import BottomNav from './components/BottomNav';
import QuranView from './components/QuranView';
import DoaView from './components/DoaView';

// Lazy load dialog components
const SettingsDialog = lazy(() => import('./components/SettingsDialog'));
const AboutDialog = lazy(() => import('./components/AboutDialog'));
const StatsDialog = lazy(() => import('./components/StatsDialog'));

function AppContent() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dzikir');
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load Arabic fonts
  useEffect(() => {
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

    fontLinks.forEach(link => document.head.appendChild(link));

    Promise.all(fontLinks.map(link => {
      return new Promise((resolve) => {
        link.onload = resolve;
      });
    })).then(() => setFontsLoaded(true));

    return () => {
      fontLinks.forEach(link => document.head.removeChild(link));
    };
  }, []);

  const openSettings = () => setSettingsOpen(true);
  const openAbout = () => {
    setSettingsOpen(false);
    setAboutOpen(true);
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    if (tab === 'stats') {
      setStatsOpen(true);
    } else {
      setActiveTab(tab);
    }
  };

  // Render main content based on active tab
  const renderContent = () => {
    if (!fontsLoaded) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Memuat...</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dzikir':
        return (
          <main className="container mx-auto px-2 py-2 flex-1 flex items-center justify-center overflow-hidden">
            <div className="w-full max-w-3xl mx-auto h-full">
              <DzikirCarousel />
            </div>
          </main>
        );
      case 'quran':
        return (
          <main className="flex-1 overflow-hidden">
            <QuranView />
          </main>
        );
      case 'doa':
        return (
          <main className="flex-1 overflow-hidden">
            <DoaView />
          </main>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen max-h-screen overflow-hidden flex flex-col bg-background dark:bg-background transition-colors duration-300">
      <Header
        openSettings={openSettings}
        activeTab={activeTab}
      />

      {renderContent()}

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />

      <Suspense fallback={null}>
        <SettingsDialog
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
          openAbout={openAbout}
        />

        <AboutDialog
          open={aboutOpen}
          onOpenChange={setAboutOpen}
        />

        <StatsDialog
          open={statsOpen}
          onOpenChange={setStatsOpen}
        />
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <DzikirProvider>
      <AppContent />
    </DzikirProvider>
  );
}

export default App;
