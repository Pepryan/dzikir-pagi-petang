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

  return (
    <Card className="w-full h-full max-w-3xl mx-auto overflow-hidden shadow-xl border-0 dark:bg-card relative rounded-xl border border-transparent dark:border-gray-800">
      {/* Completion animation above the card */}
      <AnimatePresence mode="wait">
        {isComplete && (
          <motion.div
            className="absolute top-0 left-0 right-0 z-10 flex justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            key={`completion-${dzikir.id}-${dzikir.counter}`}
          >
            <div className="bg-green-100 dark:bg-primary/90 text-green-800 dark:text-black px-4 py-1.5 rounded-b-lg shadow-md flex items-center">
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
            className="h-full bg-primary dark:bg-primary relative overflow-hidden"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            key={`progress-${dzikir.id}-${dzikir.counter}`}
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
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            isComplete
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
              : 'bg-primary-100 text-primary-800 dark:bg-gray-800 dark:text-primary'
          }`}>
            {dzikir.counter}/{dzikir.count}
          </span>
        </CardTitle>
      </CardHeader>

      {/* Make the content scrollable if it's too long - Adjusted to fit viewport */}
      <div className="overflow-y-auto flex-1 pb-6" style={{ maxHeight: 'calc(100vh - 240px)' }}>
        <CardContent className="space-y-4">
          {/* Arabic text with improved styling */}
          <div className="text-right rtl bg-gray-50 dark:bg-gray-900/60 p-5 rounded-lg shadow-inner border border-gray-100 dark:border-gray-800">
            <p className="text-2xl font-arabic leading-loose dark:text-white">{dzikir.arabic}</p>
          </div>

          {/* Latin text */}
          {showLatin && (
            <div className="text-gray-700 dark:text-gray-200 italic px-1 mt-4">
              <p>{dzikir.latin}</p>
            </div>
          )}

          {/* Translation */}
          {showTranslation && (
            <div className="text-gray-700 dark:text-gray-100 border-l-4 border-primary-200 dark:border-primary/30 pl-4 py-1 mt-4">
              <p>{dzikir.translation}</p>
            </div>
          )}

          {/* Source */}
          {showSource && dzikir.source && (
            <div className="text-xs text-gray-500 dark:text-gray-400 italic bg-gray-50/50 dark:bg-gray-900/40 p-3 rounded-lg mt-4 border border-transparent dark:border-gray-800">
              <p>{dzikir.source}</p>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default DzikirCard;
