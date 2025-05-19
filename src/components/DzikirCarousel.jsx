import { useEffect, useState } from 'react';
import { useDzikir } from '@/context/DzikirContext';
import DzikirCard from './DzikirCard';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// Import required modules
import { Keyboard, Pagination, A11y, EffectCreative } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowsLeftRight,
  faCheck,
  faPlus,
  faMinus,
  faCheckCircle,
  faCircleCheck,
  faHandPointUp,
  faBookmark,
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

const DzikirCarousel = () => {
  const {
    currentTab,
    currentDzikirIndex,
    data,
    settings,
    setCurrentDzikirIndex,
    updateCounter
  } = useDzikir();
  const [swiper, setSwiper] = useState(null);
  const dzikirList = data[currentTab];

  // Update swiper when currentDzikirIndex changes from outside
  useEffect(() => {
    if (swiper && swiper.activeIndex !== currentDzikirIndex) {
      swiper.slideTo(currentDzikirIndex);
    }
  }, [currentDzikirIndex, swiper]);

  // Update swiper when tab changes
  useEffect(() => {
    if (swiper) {
      swiper.slideTo(0);
    }
  }, [currentTab, swiper]);

  // Handle slide change
  const handleSlideChange = (swiper) => {
    setCurrentDzikirIndex(swiper.activeIndex);
  };

  // Custom pagination with dots
  const renderCustomPagination = () => {
    return (
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-center space-x-2 pt-1.5">
        {dzikirList.map((dzikir, index) => {
          const isComplete = dzikir.counter >= dzikir.count;
          const isActive = index === currentDzikirIndex;

          return (
            <motion.button
              key={index}
              onClick={() => swiper?.slideTo(index)}
              className={`nav-dot flex items-center justify-center ${
                isActive
                  ? 'nav-dot-active'
                  : isComplete
                    ? 'nav-dot-completed'
                    : 'nav-dot-inactive'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          );
        })}
      </div>
    );
  };

  // Get current dzikir
  const currentDzikir = dzikirList[currentDzikirIndex];
  const isComplete = currentDzikir && currentDzikir.counter >= currentDzikir.count;

  // Handle mark/unmark
  const handleMarkClick = () => {
    if (!currentDzikir) return;

    const wasComplete = currentDzikir.counter > 0;
    const newValue = wasComplete ? 0 : currentDzikir.count;

    // Toggle between 0 and full count
    updateCounter(currentDzikirIndex, newValue);

    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    // Auto-navigate to next dzikir if setting is enabled and dzikir was just completed
    if (settings.autoNext && !wasComplete && newValue > 0 && currentDzikirIndex < dzikirList.length - 1) {
      setTimeout(() => {
        if (swiper) {
          swiper.slideNext();
        }
      }, 500);
    }
  };

  // Handle increment
  const handleIncrementClick = () => {
    if (!currentDzikir || currentDzikir.counter >= currentDzikir.count) return;

    const newValue = currentDzikir.counter + 1;
    updateCounter(currentDzikirIndex, newValue);

    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }

    // Auto-navigate to next dzikir if setting is enabled and dzikir was just completed
    if (settings.autoNext && newValue >= currentDzikir.count && currentDzikirIndex < dzikirList.length - 1) {
      setTimeout(() => {
        if (swiper) {
          swiper.slideNext();
        }
      }, 500);
    }
  };

  // Handle decrement
  const handleDecrementClick = () => {
    if (!currentDzikir || currentDzikir.counter <= 0) return;

    updateCounter(currentDzikirIndex, currentDzikir.counter - 1);

    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      {/* Custom pagination */}
      {renderCustomPagination()}

      {/* Swiper */}
      <Swiper
        effect={'creative'}
        creativeEffect={{
          prev: {
            translate: ['-100%', 0, 0],
            opacity: 0,
          },
          next: {
            translate: ['100%', 0, 0],
            opacity: 0,
          },
        }}
        grabCursor={true}
        modules={[EffectCreative, Keyboard, Pagination, A11y]}
        keyboard={{
          enabled: true,
        }}
        onSwiper={setSwiper}
        onSlideChange={handleSlideChange}
        className="w-full h-full mt-4"
      >
        {dzikirList.map((dzikir, index) => (
          <SwiperSlide key={dzikir.id} className="px-2 py-2">
            <DzikirCard dzikir={dzikir} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swipe indicator - only shown on first card */}
      {settings.showSwipeIndicator && currentDzikirIndex === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-sky-900/80 rounded-full px-3 py-1 shadow-md text-xs flex items-center backdrop-blur-sm z-20"
        >
          <FontAwesomeIcon icon={faArrowsLeftRight} className="mr-2 text-primary dark:text-sky-300" />
          <span className="dark:text-sky-100">Swipe untuk navigasi</span>
        </motion.div>
      )}

      {/* Action buttons at bottom - Improved UI */}
      <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center items-center">
        <div className="flex space-x-4">
          {settings.countingMethod === 'marker' ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleMarkClick}
              className={`px-6 py-3.5 rounded-full shadow-lg text-white flex items-center ${
                isComplete
                  ? 'bg-green-500 dark:bg-green-500'
                  : 'bg-neutral-800 dark:bg-sky-700'
              }`}
            >
              {isComplete ? (
                <>
                  <FontAwesomeIcon icon={faCircleCheck} className="mr-2 text-lg" />
                  <span className="font-medium">Selesai</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faBookmark} className="mr-2 text-lg" />
                  <span className="font-medium">Tandai Selesai</span>
                </>
              )}
            </motion.button>
          ) : (
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDecrementClick}
                disabled={!currentDzikir || currentDzikir.counter <= 0}
                className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center ${
                  !currentDzikir || currentDzikir.counter <= 0
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    : 'bg-neutral-800 dark:bg-sky-800 text-white'
                }`}
              >
                <FontAwesomeIcon icon={faMinus} className="text-lg" />
              </motion.button>

              <div className="flex flex-col items-center justify-center">
                <span className="text-sm font-medium mb-1 text-gray-600 dark:text-sky-200">
                  {currentDzikir ? `${currentDzikir.counter}/${currentDzikir.count}` : '0/0'}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleIncrementClick}
                  disabled={!currentDzikir || currentDzikir.counter >= currentDzikir.count}
                  className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center ${
                    isComplete
                      ? 'bg-green-500 dark:bg-green-500 text-white'
                      : !currentDzikir || currentDzikir.counter >= currentDzikir.count
                        ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                        : 'bg-neutral-800 dark:bg-sky-600 text-white'
                  }`}
                >
                  {isComplete ? (
                    <FontAwesomeIcon icon={faCircleCheck} className="text-xl" />
                  ) : (
                    <FontAwesomeIcon icon={faPlus} className="text-xl" />
                  )}
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (!currentDzikir || isComplete) return;

                  updateCounter(currentDzikirIndex, currentDzikir.count);

                  // Auto-navigate to next dzikir if setting is enabled
                  if (settings.autoNext && currentDzikirIndex < dzikirList.length - 1) {
                    setTimeout(() => {
                      if (swiper) {
                        swiper.slideNext();
                      }
                    }, 500);
                  }
                }}
                disabled={!currentDzikir || isComplete}
                className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center ${
                  !currentDzikir || isComplete
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    : 'bg-neutral-800 dark:bg-sky-800 text-white'
                }`}
              >
                <FontAwesomeIcon icon={faCircleCheck} className="text-lg" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DzikirCarousel;
