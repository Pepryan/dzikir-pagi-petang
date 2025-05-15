import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faCog, faRotate, faMosque } from "@fortawesome/free-solid-svg-icons";
import { useDzikir } from "@/context/DzikirContext";
import { motion } from "framer-motion";

const Header = ({ openSettings }) => {
  const { currentTab, switchTab, toggleTheme, settings, resetProgress } = useDzikir();

  return (
    <header className="relative bg-background shadow-md z-10">
      {/* Header with improved spacing */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.h1
          className="text-2xl font-bold text-primary dark:text-primary flex items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FontAwesomeIcon icon={faMosque} className="mr-2" />
          <span>Daily Dzikr</span>
        </motion.h1>

        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title="Ubah Tema"
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {settings.theme === 'dark' ? (
              <FontAwesomeIcon icon={faSun} className="text-yellow-400" />
            ) : (
              <FontAwesomeIcon icon={faMoon} className="text-primary" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={resetProgress}
            title="Reset Progress"
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FontAwesomeIcon icon={faRotate} className="text-primary dark:text-primary" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={openSettings}
            title="Pengaturan"
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FontAwesomeIcon icon={faCog} className="text-primary dark:text-primary" />
          </Button>
        </div>
      </div>

      {/* Tabs with improved spacing */}
      <div className="px-4 pb-4 pt-1 flex justify-center">
        <Tabs
          defaultValue={currentTab}
          value={currentTab}
          onValueChange={switchTab}
          className="w-full max-w-md mx-auto"
        >
          <TabsList className="w-full grid grid-cols-2 bg-gray-100 dark:bg-gray-900/80 p-1.5 rounded-2xl shadow-inner border border-gray-200 dark:border-gray-700 dark:shadow-lg">
            <TabsTrigger
              value="pagi"
              className="font-medium text-sm py-2.5 rounded-xl transition-all duration-300
                data-[state=active]:bg-white dark:data-[state=active]:bg-primary
                data-[state=active]:text-primary dark:data-[state=active]:text-black
                data-[state=active]:shadow-md dark:data-[state=active]:shadow-lg dark:data-[state=active]:shadow-primary/30
                data-[state=active]:font-semibold data-[state=active]:border-0
                data-[state=inactive]:text-gray-600 dark:data-[state=inactive]:text-gray-300
                data-[state=inactive]:hover:bg-gray-200/70 dark:data-[state=inactive]:hover:bg-gray-800/70
                relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10 dark:opacity-20 data-[state=active]:opacity-0">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-300/30 dark:from-yellow-400/30 dark:to-orange-300/30"></div>
              </div>
              <span className="flex items-center justify-center relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
                <span>Dzikir Pagi</span>
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="petang"
              className="font-medium text-sm py-2.5 rounded-xl transition-all duration-300
                data-[state=active]:bg-white dark:data-[state=active]:bg-primary
                data-[state=active]:text-primary dark:data-[state=active]:text-black
                data-[state=active]:shadow-md dark:data-[state=active]:shadow-lg dark:data-[state=active]:shadow-primary/30
                data-[state=active]:font-semibold data-[state=active]:border-0
                data-[state=inactive]:text-gray-600 dark:data-[state=inactive]:text-gray-300
                data-[state=inactive]:hover:bg-gray-200/70 dark:data-[state=inactive]:hover:bg-gray-800/70
                relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10 dark:opacity-20 data-[state=active]:opacity-0">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/30 to-blue-300/30 dark:from-indigo-400/30 dark:to-blue-300/30"></div>
              </div>
              <span className="flex items-center justify-center relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                <span>Dzikir Petang</span>
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </header>
  );
};

export default Header;
