import { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBookOpen, faHandPointLeft, faHandPointRight, faChevronLeft, faChevronRight, faCopy, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useDzikir } from "@/context/DzikirContext";

const QuranReader = ({ surah }) => {
    const [currentAyatIndex, setCurrentAyatIndex] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showSwipeHint, setShowSwipeHint] = useState(true);
    const [showJumpInput, setShowJumpInput] = useState(false);
    const [jumpValue, setJumpValue] = useState('');
    const [toast, setToast] = useState(null);
    const [resumedFromBookmark, setResumedFromBookmark] = useState(false);
    const { settings, saveQuranProgress, getQuranProgress } = useDzikir();
    const containerRef = useRef(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const jumpInputRef = useRef(null);

    const ayatList = surah?.ayat || [];
    const totalAyat = ayatList.length;
    const currentAyat = ayatList[currentAyatIndex];

    // Show toast notification
    const showToast = (message, duration = 2000) => {
        setToast(message);
        setTimeout(() => setToast(null), duration);
    };

    // Load saved progress when surah changes
    useEffect(() => {
        if (surah?.id) {
            const savedProgress = getQuranProgress(surah.id);
            if (savedProgress && savedProgress.ayatIndex > 0 && savedProgress.ayatIndex < totalAyat) {
                setCurrentAyatIndex(savedProgress.ayatIndex);
                setResumedFromBookmark(true);
                setTimeout(() => {
                    showToast(`📖 Melanjutkan dari Ayat ${savedProgress.ayatIndex + 1}`);
                }, 500);
            } else {
                setCurrentAyatIndex(0);
            }
            setIsCompleted(false);
        }
    }, [surah?.id]);

    // Save progress when ayat changes
    useEffect(() => {
        if (surah?.id && currentAyatIndex > 0) {
            saveQuranProgress(surah.id, currentAyatIndex);
        }
    }, [currentAyatIndex, surah?.id]);

    // Update completion status based on current position
    useEffect(() => {
        if (currentAyatIndex >= totalAyat - 1) {
            setIsCompleted(true);
        } else {
            setIsCompleted(false);
        }
    }, [currentAyatIndex, totalAyat]);

    const goToNext = useCallback(() => {
        if (currentAyatIndex < totalAyat - 1) {
            setCurrentAyatIndex(prev => prev + 1);
        }
    }, [currentAyatIndex, totalAyat]);

    const goToPrev = useCallback(() => {
        if (currentAyatIndex > 0) {
            setCurrentAyatIndex(prev => prev - 1);
        }
    }, [currentAyatIndex]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (showJumpInput) return; // Don't navigate when input is focused
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                goToNext();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                goToPrev();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goToNext, goToPrev, showJumpInput]);

    // Jump to ayat
    const handleJump = () => {
        const ayatNum = parseInt(jumpValue);
        if (ayatNum >= 1 && ayatNum <= totalAyat) {
            setCurrentAyatIndex(ayatNum - 1);
            setShowJumpInput(false);
            setJumpValue('');
        }
    };

    // Copy ayat to clipboard
    const handleCopy = async (e) => {
        e.stopPropagation(); // Prevent swipe navigation
        if (!currentAyat) return;
        const text = `${currentAyat.arabic}\n\n${currentAyat.latin}\n\n"${currentAyat.translation}"\n\n— ${surah.name} : ${currentAyat.number}`;
        try {
            await navigator.clipboard.writeText(text);
            showToast('📋 Ayat disalin!');
        } catch (err) {
            showToast('❌ Gagal menyalin');
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
                goToNext();
            } else {
                goToPrev();
            }
            setShowSwipeHint(false);
        }
    }, [goToNext, goToPrev]);

    // Hide swipe hint after a few seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSwipeHint(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    // Focus jump input when opened
    useEffect(() => {
        if (showJumpInput && jumpInputRef.current) {
            jumpInputRef.current.focus();
        }
    }, [showJumpInput]);

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
        <div className="flex flex-col h-full max-w-3xl mx-auto" ref={containerRef}>
            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gray-800 dark:bg-gray-700 text-white px-4 py-2 rounded-full shadow-lg text-sm"
                    >
                        {toast}
                    </motion.div>
                )}
            </AnimatePresence>

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

            {/* Compact Progress Bar */}
            <div className="flex items-center justify-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4 px-2">
                <button
                    onClick={() => setShowJumpInput(!showJumpInput)}
                    className="flex items-center gap-2 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                    <span className="font-medium">Ayat {currentAyat.number}</span>
                </button>

                <div className="flex-1 max-w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                        initial={false}
                        animate={{ width: `${((currentAyatIndex + 1) / totalAyat) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                <span className="text-xs text-gray-400">dari {totalAyat}</span>
            </div>

            {/* Jump to Ayat Input */}
            <AnimatePresence>
                {showJumpInput && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 px-4"
                    >
                        <div className="flex items-center gap-2 justify-center">
                            <input
                                ref={jumpInputRef}
                                type="number"
                                min="1"
                                max={totalAyat}
                                value={jumpValue}
                                onChange={(e) => setJumpValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleJump()}
                                placeholder={`1 - ${totalAyat}`}
                                className="w-24 px-3 py-2 text-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button
                                onClick={handleJump}
                                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                            >
                                Pergi
                            </button>
                            <button
                                onClick={() => setShowJumpInput(false)}
                                className="px-3 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                                ✕
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                        w-14 h-14 items-center justify-center rounded-full 
                        bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
                        border border-gray-200 dark:border-gray-700
                        shadow-lg transition-all duration-200
                        ${currentAyatIndex === 0
                            ? 'opacity-30 cursor-not-allowed'
                            : 'opacity-80 hover:opacity-100 hover:scale-110 hover:bg-green-50 dark:hover:bg-green-900/30 hover:border-green-500'}`}
                    aria-label="Previous ayat"
                >
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        className={`text-xl ${currentAyatIndex === 0 ? 'text-gray-400' : 'text-green-600 dark:text-green-400'}`}
                    />
                </button>

                {/* Desktop Navigation - Next Button */}
                <button
                    onClick={goToNext}
                    disabled={currentAyatIndex >= totalAyat - 1}
                    className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 
                        w-14 h-14 items-center justify-center rounded-full 
                        bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
                        border border-gray-200 dark:border-gray-700
                        shadow-lg transition-all duration-200
                        ${currentAyatIndex >= totalAyat - 1
                            ? 'opacity-30 cursor-not-allowed'
                            : 'opacity-80 hover:opacity-100 hover:scale-110 hover:bg-green-50 dark:hover:bg-green-900/30 hover:border-green-500'}`}
                    aria-label="Next ayat"
                >
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className={`text-xl ${currentAyatIndex >= totalAyat - 1 ? 'text-gray-400' : 'text-green-600 dark:text-green-400'}`}
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
                        className="text-center max-w-2xl mx-auto px-10 md:px-20"
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

            {/* Copy Button - Outside swipe area */}
            <div className="flex justify-center py-2">
                <button
                    onClick={handleCopy}
                    onTouchStart={(e) => e.stopPropagation()}
                    onTouchEnd={(e) => e.stopPropagation()}
                    className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 active:bg-green-100 dark:active:bg-green-900/40 rounded-full transition-all"
                >
                    <FontAwesomeIcon icon={faCopy} className="mr-2" />
                    Salin Ayat
                </button>
            </div>

            {/* Compact Bottom Status */}
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center">
                    {isCompleted ? (
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                            <FontAwesomeIcon icon={faCheck} />
                            <span className="text-sm font-medium">Selesai membaca {surah.name}</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            {/* Mini progress dots - simplified to max 10 segments */}
                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(10, Math.ceil(totalAyat / Math.ceil(totalAyat / 10))) }).map((_, i) => {
                                    const segmentSize = Math.ceil(totalAyat / 10);
                                    const segmentStart = i * segmentSize;
                                    const segmentEnd = Math.min((i + 1) * segmentSize - 1, totalAyat - 1);
                                    const isActive = currentAyatIndex >= segmentStart && currentAyatIndex <= segmentEnd;
                                    const isCompleted = currentAyatIndex > segmentEnd;

                                    return (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentAyatIndex(segmentStart)}
                                            className={`w-6 h-1.5 rounded-full transition-all ${isActive
                                                ? 'bg-green-500'
                                                : isCompleted
                                                    ? 'bg-green-300 dark:bg-green-700'
                                                    : 'bg-gray-300 dark:bg-gray-600'
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
        </div>
    );
};

export default QuranReader;
