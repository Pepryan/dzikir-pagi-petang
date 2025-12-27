import { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBookOpen, faHandPointLeft, faHandPointRight, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useDzikir } from "@/context/DzikirContext";

const QuranReader = ({ surah }) => {
    const [currentAyatIndex, setCurrentAyatIndex] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showSwipeHint, setShowSwipeHint] = useState(true);
    const { settings } = useDzikir();
    const containerRef = useRef(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const ayatList = surah?.ayat || [];
    const totalAyat = ayatList.length;
    const currentAyat = ayatList[currentAyatIndex];

    // Reset when surah changes
    useEffect(() => {
        setCurrentAyatIndex(0);
        setIsCompleted(false);
    }, [surah]);

    useEffect(() => {
        if (currentAyatIndex >= totalAyat - 1) {
            setIsCompleted(true);
        }
    }, [currentAyatIndex, totalAyat]);

    const goToNext = () => {
        if (currentAyatIndex < totalAyat - 1) {
            setCurrentAyatIndex(prev => prev + 1);
        }
    };

    const goToPrev = () => {
        if (currentAyatIndex > 0) {
            setCurrentAyatIndex(prev => prev - 1);
        }
    };

    // Touch gesture handlers
    const handleTouchStart = useCallback((e) => {
        touchStartX.current = e.touches[0].clientX;
    }, []);

    const handleTouchMove = useCallback((e) => {
        touchEndX.current = e.touches[0].clientX;
    }, []);

    const handleTouchEnd = useCallback(() => {
        const diff = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50;

        if (Math.abs(diff) > minSwipeDistance) {
            if (diff > 0) {
                // Swipe left - go to next
                goToNext();
            } else {
                // Swipe right - go to previous
                goToPrev();
            }
            // Hide swipe hint after first swipe
            setShowSwipeHint(false);
        }
    }, [currentAyatIndex, totalAyat]);

    // Also hide swipe hint after a few seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSwipeHint(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const getFontFamily = () => {
        switch (settings.arabicFont) {
            case 'Scheherazade New': return "'Scheherazade New', serif";
            case 'Noto Naskh Arabic': return "'Noto Naskh Arabic', serif";
            case 'Amiri Quran': return "'Amiri Quran', serif";
            case 'Lateef': return "'Lateef', serif";
            case 'Harmattan': return "'Harmattan', sans-serif";
            default: return "'Scheherazade New', serif";
        }
    };

    if (!surah || !currentAyat) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                <p>Pilih surah pilihan untuk dibaca</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full" ref={containerRef}>
            {/* Surah Header */}
            <div className="text-center pb-4 border-b border-gray-200 dark:border-gray-700 mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faBookOpen} className="text-primary-500" />
                    {surah.name}
                    <span className="text-lg font-arabic" style={{ fontFamily: getFontFamily() }}>
                        {surah.nameArabic}
                    </span>
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {surah.meaning} • {surah.type} • {totalAyat} Ayat
                </p>
                {/* Note for partial surahs like Al-Kahfi */}
                {surah.totalAyat && surah.totalAyat > totalAyat && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-full inline-block">
                        📖 Ayat pilihan ({totalAyat} dari {surah.totalAyat} ayat)
                    </p>
                )}
            </div>

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

            {/* Progress */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>Ayat {currentAyat.number}</span>
                <div className="flex-1 max-w-32 mx-2 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-green-500 transition-all duration-300"
                        style={{ width: `${((currentAyatIndex + 1) / totalAyat) * 100}%` }}
                    />
                </div>
            </div>

            {/* Ayat Content - Swipeable area with Desktop Navigation */}
            <div
                className="flex-1 flex items-center justify-center overflow-y-auto px-2 relative touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Desktop Navigation - Previous Button */}
                <button
                    onClick={goToPrev}
                    disabled={currentAyatIndex === 0}
                    className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 
                        w-12 h-12 items-center justify-center rounded-full 
                        bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
                        border border-gray-200 dark:border-gray-700
                        shadow-lg transition-all duration-200
                        ${currentAyatIndex === 0
                            ? 'opacity-30 cursor-not-allowed'
                            : 'opacity-70 hover:opacity-100 hover:scale-110 hover:bg-green-50 dark:hover:bg-green-900/30'}`}
                    aria-label="Previous ayat"
                >
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        className={`text-lg ${currentAyatIndex === 0 ? 'text-gray-400' : 'text-green-600 dark:text-green-400'}`}
                    />
                </button>

                {/* Desktop Navigation - Next Button */}
                <button
                    onClick={goToNext}
                    disabled={currentAyatIndex >= totalAyat - 1}
                    className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 
                        w-12 h-12 items-center justify-center rounded-full 
                        bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
                        border border-gray-200 dark:border-gray-700
                        shadow-lg transition-all duration-200
                        ${currentAyatIndex >= totalAyat - 1
                            ? 'opacity-30 cursor-not-allowed'
                            : 'opacity-70 hover:opacity-100 hover:scale-110 hover:bg-green-50 dark:hover:bg-green-900/30'}`}
                    aria-label="Next ayat"
                >
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className={`text-lg ${currentAyatIndex >= totalAyat - 1 ? 'text-gray-400' : 'text-green-600 dark:text-green-400'}`}
                    />
                </button>

                {/* Swipe hint - Mobile only */}
                {showSwipeHint && (
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
                )}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentAyatIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="text-center max-w-2xl mx-auto px-14 md:px-16"
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

                        {/* Latin Transliteration */}
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

            {/* Progress Dots - Gesture Navigation */}
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                {/* Status indicator */}
                <div className="flex items-center justify-center mb-3">
                    {isCompleted ? (
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                            <FontAwesomeIcon icon={faCheck} />
                            <span className="text-sm font-medium">Selesai</span>
                        </div>
                    ) : (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Ayat {currentAyatIndex + 1} dari {totalAyat}
                        </span>
                    )}
                </div>

                {/* Dot indicators */}
                <div className="flex items-center justify-center gap-1.5 flex-wrap max-w-xs mx-auto">
                    {ayatList.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentAyatIndex(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${index === currentAyatIndex
                                ? 'bg-green-500 scale-125'
                                : index < currentAyatIndex
                                    ? 'bg-green-300 dark:bg-green-700'
                                    : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                            aria-label={`Go to ayat ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuranReader;
