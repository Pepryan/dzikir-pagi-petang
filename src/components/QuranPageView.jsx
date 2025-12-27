import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck, faHandPointLeft, faHandPointRight,
    faChevronLeft, faChevronRight, faCopy
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Page View component for Quran Reader
 * Displays one ayat at a time with navigation
 */
const QuranPageView = ({
    surah,
    currentAyat,
    currentAyatIndex,
    totalAyat,
    isCompleted,
    showSwipeHint,
    goToNext,
    goToPrev,
    handleCopy,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    getFontFamily,
    settings
}) => {
    return (
        <>
            {/* Bismillah (only at start) */}
            {currentAyatIndex === 0 && surah.bismillah && (
                <div className="text-center mb-4">
                    <p
                        className="text-2xl text-gray-800 dark:text-gray-100"
                        style={{ fontFamily: getFontFamily() }}
                        dir="rtl"
                    >
                        {surah.bismillah}
                    </p>
                </div>
            )}

            {/* Ayat Content - Swipeable area */}
            <div
                className="flex-1 min-h-0 overflow-y-auto px-2 relative touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Desktop Navigation - Previous */}
                <NavButton
                    direction="prev"
                    onClick={goToPrev}
                    disabled={currentAyatIndex === 0}
                />

                {/* Desktop Navigation - Next */}
                <NavButton
                    direction="next"
                    onClick={goToNext}
                    disabled={currentAyatIndex >= totalAyat - 1}
                />

                {/* Swipe hint - Mobile only */}
                {showSwipeHint && <SwipeHint />}

                {/* Ayat Display */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentAyatIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="text-center max-w-2xl mx-auto px-6 md:px-20 py-4"
                    >
                        {/* Arabic Text */}
                        <p
                            className="text-3xl md:text-4xl leading-loose mb-6 text-gray-900 dark:text-white"
                            style={{
                                fontFamily: getFontFamily(),
                                fontSize: `${(settings.arabicFontSize || 32) * 1.2}px`,
                                lineHeight: '2.2'
                            }}
                            dir="rtl"
                        >
                            {currentAyat.arabic}
                            <span className="inline-block mx-2 text-primary-500 text-xl">
                                ﴿{currentAyat.number}﴾
                            </span>
                        </p>

                        {/* Latin */}
                        {settings.showLatin !== false && (
                            <p
                                className="text-lg italic text-gray-600 dark:text-gray-400 mb-4"
                                style={{ fontSize: `${(settings.latinFontSize || 16)}px` }}
                            >
                                {currentAyat.latin}
                            </p>
                        )}

                        {/* Translation */}
                        {settings.showTranslation !== false && (
                            <p
                                className="text-base text-gray-700 dark:text-gray-300"
                                style={{ fontSize: `${(settings.translationFontSize || 14)}px` }}
                            >
                                {currentAyat.translation}
                            </p>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Copy Button */}
            <div className="flex justify-center py-2">
                <button
                    onClick={handleCopy}
                    onTouchStart={(e) => e.stopPropagation()}
                    onTouchEnd={(e) => e.stopPropagation()}
                    className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full transition-all"
                >
                    <FontAwesomeIcon icon={faCopy} className="mr-2" />
                    Salin Ayat
                </button>
            </div>

            {/* Bottom Status */}
            <BottomStatus
                isCompleted={isCompleted}
                surahName={surah.name}
                currentAyatIndex={currentAyatIndex}
                totalAyat={totalAyat}
                setCurrentAyatIndex={() => { }}
            />
        </>
    );
};

// Navigation Button sub-component
const NavButton = ({ direction, onClick, disabled }) => {
    const isNext = direction === 'next';
    const positionClass = isNext ? 'right-0' : 'left-0';
    const icon = isNext ? faChevronRight : faChevronLeft;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`hidden md:flex absolute ${positionClass} top-1/2 -translate-y-1/2 z-10 
                w-14 h-14 items-center justify-center rounded-full 
                bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
                border border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-200
                ${disabled
                    ? 'opacity-30 cursor-not-allowed'
                    : 'opacity-80 hover:opacity-100 hover:scale-110 hover:bg-green-50 dark:hover:bg-green-900/30 hover:border-green-500'
                }`}
            aria-label={`${isNext ? 'Next' : 'Previous'} ayat`}
        >
            <FontAwesomeIcon
                icon={icon}
                className={`text-xl ${disabled ? 'text-gray-400' : 'text-green-600 dark:text-green-400'}`}
            />
        </button>
    );
};

// Swipe Hint sub-component
const SwipeHint = () => (
    <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="md:hidden absolute top-2 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-gray-800/90 rounded-full px-3 py-1.5 shadow-md text-xs flex items-center gap-2 backdrop-blur-sm z-10"
    >
        <FontAwesomeIcon icon={faHandPointLeft} className="text-gray-500" />
        <span className="text-gray-600 dark:text-gray-300">Geser untuk navigasi</span>
        <FontAwesomeIcon icon={faHandPointRight} className="text-gray-500" />
    </motion.div>
);

// Bottom Status sub-component
const BottomStatus = ({ isCompleted, surahName, currentAyatIndex, totalAyat, setCurrentAyatIndex }) => (
    <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center">
            {isCompleted ? (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <FontAwesomeIcon icon={faCheck} />
                    <span className="text-sm font-medium">Selesai membaca {surahName}</span>
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(10, Math.ceil(totalAyat / Math.ceil(totalAyat / 10))) }).map((_, i) => {
                            const segmentSize = Math.ceil(totalAyat / 10);
                            const segmentStart = i * segmentSize;
                            const segmentEnd = Math.min((i + 1) * segmentSize - 1, totalAyat - 1);
                            const isActive = currentAyatIndex >= segmentStart && currentAyatIndex <= segmentEnd;
                            const isDone = currentAyatIndex > segmentEnd;

                            return (
                                <button
                                    key={i}
                                    onClick={() => setCurrentAyatIndex(segmentStart)}
                                    className={`w-6 h-1.5 rounded-full transition-all ${isActive ? 'bg-green-500' : isDone ? 'bg-green-300 dark:bg-green-700' : 'bg-gray-300 dark:bg-gray-600'
                                        }`}
                                    title={`Ayat ${segmentStart + 1} - ${segmentEnd + 1}`}
                                />
                            );
                        })}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {Math.round(((currentAyatIndex + 1) / totalAyat) * 100)}%
                    </span>
                </div>
            )}
        </div>
    </div>
);

export default QuranPageView;
