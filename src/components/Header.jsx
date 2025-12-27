import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faCog, faRotate, faMosque } from "@fortawesome/free-solid-svg-icons";
import { useDzikir } from "@/context/DzikirContext";
import { motion } from "framer-motion";

const Header = ({ openSettings, activeTab }) => {
  const { currentTab, switchTab, toggleTheme, settings, resetProgress } = useDzikir();

  // Only show dzikir tabs when on dzikir tab
  const showDzikirTabs = activeTab === 'dzikir';

  return (
    <header className="relative bg-gray-100 dark:bg-sky-700/10 shadow-md z-10">
      {/* Header with improved spacing */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.h1
          className="text-xl font-bold text-gray-800 dark:text-white flex items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FontAwesomeIcon icon={faMosque} className="mr-2 text-gray-800 dark:text-white" />
          <span>Daily Dzikr</span>
        </motion.h1>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title="Ubah Tema"
            className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 h-9 w-9"
          >
            {settings.theme === 'dark' ? (
              <FontAwesomeIcon icon={faSun} className="text-yellow-400" />
            ) : (
              <FontAwesomeIcon icon={faMoon} className="text-gray-600" />
            )}
          </Button>

          {showDzikirTabs && (
            <Button
              variant="ghost"
              size="icon"
              onClick={resetProgress}
              title="Reset Progress"
              className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 h-9 w-9"
            >
              <FontAwesomeIcon icon={faRotate} className="text-gray-600 dark:text-gray-300" />
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={openSettings}
            title="Pengaturan"
            className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 h-9 w-9"
          >
            <FontAwesomeIcon icon={faCog} className="text-gray-600 dark:text-gray-300" />
          </Button>
        </div>
      </div>

      {/* Tabs - Only show for dzikir */}
      {showDzikirTabs && (
        <div className="px-4 pb-3 flex justify-center">
          <Tabs
            defaultValue={currentTab}
            value={currentTab}
            onValueChange={switchTab}
            className="w-auto"
          >
            <TabsList className="grid grid-cols-2 gap-1 bg-gray-200/80 dark:bg-gray-800/50 p-0.5 rounded-lg">
              <TabsTrigger
                value="pagi"
                className="flex items-center justify-center gap-1.5 font-medium text-sm py-1 px-4 rounded-md transition-all duration-200
                  data-[state=active]:bg-white dark:data-[state=active]:bg-sky-600
                  data-[state=active]:text-gray-800 dark:data-[state=active]:text-white
                  data-[state=active]:shadow-sm
                  data-[state=inactive]:text-gray-600 dark:data-[state=inactive]:text-gray-400
                  data-[state=inactive]:hover:text-gray-800 dark:data-[state=inactive]:hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
                <span>Pagi</span>
              </TabsTrigger>
              <TabsTrigger
                value="petang"
                className="flex items-center justify-center gap-1.5 font-medium text-sm py-1 px-4 rounded-md transition-all duration-200
                  data-[state=active]:bg-white dark:data-[state=active]:bg-sky-600
                  data-[state=active]:text-gray-800 dark:data-[state=active]:text-white
                  data-[state=active]:shadow-sm
                  data-[state=inactive]:text-gray-600 dark:data-[state=inactive]:text-gray-400
                  data-[state=inactive]:hover:text-gray-800 dark:data-[state=inactive]:hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                <span>Petang</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}
    </header>
  );
};

export default Header;
