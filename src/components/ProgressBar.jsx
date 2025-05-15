import { useEffect, useState, useRef } from 'react';
import { useDzikir } from '@/context/DzikirContext';
import { motion } from 'framer-motion';

const ProgressBar = () => {
  const { data, currentTab, settings } = useDzikir();
  const [progress, setProgress] = useState(0);
  const prevProgressRef = useRef({ value: 0, tab: currentTab });

  // Calculate progress whenever data or tab changes
  useEffect(() => {
    // Calculate progress percentage
    const dzikirList = data[currentTab];
    let completedCount = 0;
    let totalCount = dzikirList.length;

    // Check if all counters are zero (reset state)
    let allZero = true;

    dzikirList.forEach(dzikir => {
      // Check if this dzikir has been completed
      if (settings.countingMethod === 'marker') {
        if (dzikir.counter > 0) completedCount++;
      } else {
        if (dzikir.counter >= dzikir.count) completedCount++;
      }

      // Check if any counter is not zero
      if (dzikir.counter > 0) {
        allZero = false;
      }
    });

    const progressPercentage = (completedCount / totalCount) * 100;

    // Always update progress regardless of whether it increases or decreases
    // This ensures the progress bar updates correctly when unmarking items
    setProgress(progressPercentage);
    prevProgressRef.current = { value: progressPercentage, tab: currentTab };
  }, [data, currentTab, settings.countingMethod]);

  return (
    <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800/40 relative overflow-hidden">
      <motion.div
        className="h-full bg-neutral-800 dark:bg-primary relative overflow-hidden"
        initial={false}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* No light effect in dark mode */}
        {progress > 0 && settings.theme !== 'dark' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
        )}
      </motion.div>
    </div>
  );
};

export default ProgressBar;
