import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDzikir } from "@/context/DzikirContext";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const DzikirCard = ({ dzikir }) => {
  const { settings } = useDzikir();
  const { showTranslation, showLatin, showSource } = settings;

  const progress = (dzikir.counter / dzikir.count) * 100;
  const isComplete = dzikir.counter >= dzikir.count;

  // Animasi untuk elemen yang muncul
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUpVariants}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-3xl mx-auto shadow-xl border-0 dark:bg-card relative rounded-xl overflow-hidden border border-transparent dark:border-gray-800 transition-all duration-300 hover:shadow-2xl dark:hover:border-primary/30 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 flex flex-col" style={{ maxHeight: 'calc(100vh - 220px)' }}>
        {/* Completion animation above the card */}
        <AnimatePresence mode="wait">
          {isComplete && (
            <motion.div
              className="absolute top-0 left-0 right-0 z-10 flex justify-center"
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 25
              }}
              key={`completion-${dzikir.id}-${dzikir.counter}`}
            >
              <div className="bg-green-100 dark:bg-sky-900/80 text-green-800 dark:text-sky-100 px-4 py-1.5 rounded-b-lg shadow-md flex items-center backdrop-blur-sm">
                <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                <span className="text-sm font-medium">Selesai</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modern Progress indicator at the top of the card - Enhanced visibility */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gray-200 dark:bg-gray-800/40">
          <AnimatePresence initial={false}>
            <motion.div
              className="h-full bg-primary dark:bg-sky-900/80 relative overflow-hidden"
              style={{ width: `${progress}%` }}
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 1
              }}
              key={`progress-${dzikir.id}`}
            >
              {/* No light effect in dark mode */}
              {progress > 0 && settings.theme !== 'dark' && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-xl font-bold text-primary-600 dark:text-white flex justify-between items-center">
            <span>{dzikir.title}</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${isComplete
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
              : 'bg-primary-100 text-primary-800 dark:bg-gray-800 dark:text-primary'
              }`}>
              <span className="text-gray-600 dark:text-gray-400 mr-1">Dibaca:</span>
              {dzikir.counter}/{dzikir.count}
            </span>
          </CardTitle>
        </CardHeader>

        {/* Content area - scrollable with padding for floating button */}
        <div className="flex-1 overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
          <CardContent className="space-y-4">
            {/* Arabic text with improved styling */}
            <motion.div
              className="text-right rtl bg-gray-50/90 dark:bg-gray-900/60 p-5 rounded-lg shadow-inner border border-gray-100 dark:border-gray-800 backdrop-blur-sm"
              whileHover={{
                scale: 1.01,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }
              }}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.2
              }}
            >
              <p
                className="leading-[2.2] tracking-[0.02em] text-gray-900 dark:text-gray-50"
                style={{
                  fontFamily: settings.arabicFont,
                  fontSize: `${settings.arabicFontSize}px`,
                  textShadow: settings.theme === 'dark' ? '0 0 1px rgba(255,255,255,0.1)' : 'none'
                }}
              >
                {dzikir.arabic}
              </p>
            </motion.div>

            {/* Latin text */}
            {showLatin && (
              <motion.div
                className="text-gray-700 dark:text-gray-200 italic px-1 mt-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <p>{dzikir.latin}</p>
              </motion.div>
            )}

            {/* Translation */}
            {showTranslation && (
              <motion.div
                className="text-gray-700 dark:text-gray-100 border-l-4 border-primary dark:border-sky-500 pl-4 py-1 mt-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <p>{dzikir.translation}</p>
              </motion.div>
            )}

            {/* Source */}
            {showSource && dzikir.source && (
              <motion.div
                className="text-xs text-gray-500 dark:text-gray-400 italic bg-gray-50/50 dark:bg-gray-900/40 p-3 rounded-lg mt-4 border border-transparent dark:border-gray-800"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <p>{dzikir.source}</p>
              </motion.div>
            )}
            {/* Spacer for floating button */}
            <div className="h-24"></div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
};

export default DzikirCard;
