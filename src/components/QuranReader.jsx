import { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faScroll } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useDzikir } from "@/context/DzikirContext";
import QuranScrollView from "./QuranScrollView";
import QuranPageView from "./QuranPageView";
import { shareText } from "@/lib/share";

/**
 * Main Quran Reader component
 * Supports two viewing modes: 'page' (per-ayat) and 'scroll' (continuous)
 */
const QuranReader = ({ surah }) => {
    // State
    const [currentAyatIndex, setCurrentAyatIndex] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showSwipeHint, setShowSwipeHint] = useState(true);
    const [showJumpInput, setShowJumpInput] = useState(false);
    const [jumpValue, setJumpValue] = useState('');
    const [toast, setToast] = useState(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Refs
    const containerRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const arabicEndRef = useRef(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const jumpInputRef = useRef(null);

    // Context
    const { settings, updateSettings, saveQuranProgress, getQuranProgress } = useDzikir();

    // Derived values
    const ayatList = surah?.ayat || [];
    const totalAyat = ayatList.length;
    const currentAyat = ayatList[currentAyatIndex];
    const viewMode = settings.quranViewMode || 'page';

    // Utility functions
    const showToast = (message, duration = 3500) => {
        setToast(message);
        setTimeout(() => setToast(null), duration);
    };

    const getFontFamily = () => {
        const fonts = {
            'Scheherazade New': "'Scheherazade New', serif",
            'Noto Naskh Arabic': "'Noto Naskh Arabic', serif",
            'Amiri Quran': "'Amiri Quran', serif",
            'Lateef': "'Lateef', serif",
            'Harmattan': "'Harmattan', sans-serif"
        };
        return fonts[settings.arabicFont] || "'Scheherazade New', serif";
    };

    const toArabicNumber = (num) => {
        const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return String(num).split('').map(d => arabicNumerals[parseInt(d)]).join('');
    };

    // Toggle view mode
    const toggleViewMode = () => {
        const newMode = viewMode === 'page' ? 'scroll' : 'page';
        updateSettings({ quranViewMode: newMode });
        showToast(newMode === 'scroll' ? '📜 Mode Scroll' : '📄 Mode Per Ayat');
    };

    // Navigation
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

    // Share ayat via native share sheet, or copy to clipboard where unsupported
    const handleShare = async (e, ayat = currentAyat) => {
        e?.stopPropagation();
        if (!ayat) return;
        const text = `${ayat.arabic}\n\n${ayat.latin}\n\n"${ayat.translation}"\n\n— ${surah.name} : ${ayat.number}`;
        const result = await shareText({ title: `${surah.name} : ${ayat.number}`, text });
        if (result === 'copied') showToast('📋 Ayat disalin!');
        else if (result === 'failed') showToast('❌ Gagal menyalin');
    };

    // Jump to specific ayat
    const handleJump = () => {
        // Match by ayat number: selected-ayat surahs (e.g. Al-Kahfi 1-10, 101-110) aren't contiguous
        const index = ayatList.findIndex(ayat => ayat.number === parseInt(jumpValue));
        if (index !== -1) {
            setCurrentAyatIndex(index);
            setShowJumpInput(false);
            setJumpValue('');
        }
    };

    // Touch gesture handlers (page mode only)
    const handleTouchStart = useCallback((e) => {
        if (viewMode === 'scroll') return;
        touchStartX.current = e.touches[0].clientX;
    }, [viewMode]);

    const handleTouchMove = useCallback((e) => {
        if (viewMode === 'scroll') return;
        touchEndX.current = e.touches[0].clientX;
    }, [viewMode]);

    const handleTouchEnd = useCallback(() => {
        if (viewMode === 'scroll') return;
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 50) {
            diff > 0 ? goToNext() : goToPrev();
            setShowSwipeHint(false);
        }
    }, [goToNext, goToPrev, viewMode]);

    // Effects
    useEffect(() => {
        if (surah?.id) {
            const savedProgress = getQuranProgress(surah.id);
            if (savedProgress?.ayatIndex > 0 && savedProgress.ayatIndex < totalAyat) {
                setCurrentAyatIndex(savedProgress.ayatIndex);
                // Only show resume toast in page mode
                if (viewMode === 'page') {
                    setTimeout(() => showToast(`📖 Melanjutkan dari Ayat ${savedProgress.ayatIndex + 1}`), 500);
                }
            } else {
                setCurrentAyatIndex(0);
            }
            setIsCompleted(false);
        }
    }, [surah?.id, totalAyat, getQuranProgress, viewMode]);

    useEffect(() => {
        if (surah?.id && currentAyatIndex > 0) {
            saveQuranProgress(surah.id, currentAyatIndex);
        }
    }, [currentAyatIndex, surah?.id, saveQuranProgress]);

    useEffect(() => {
        setIsCompleted(currentAyatIndex >= totalAyat - 1);
    }, [currentAyatIndex, totalAyat]);

    // Scroll progress tracking (scroll mode) - tracks to end of Arabic section
    useEffect(() => {
        if (viewMode !== 'scroll' || !scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const handleScroll = () => {
            if (!arabicEndRef.current) {
                // Fallback to full scroll
                const { scrollTop, scrollHeight, clientHeight } = container;
                const progress = scrollHeight <= clientHeight ? 100 : (scrollTop / (scrollHeight - clientHeight)) * 100;
                setScrollProgress(Math.min(100, Math.max(0, progress)));
            } else {
                // Calculate progress based on Arabic text end position
                const containerRect = container.getBoundingClientRect();
                const arabicEndRect = arabicEndRef.current.getBoundingClientRect();
                const scrollTop = container.scrollTop;
                const arabicEndPos = arabicEndRect.top - containerRect.top + scrollTop;
                const viewportHeight = containerRect.height;

                // Progress is 100% when Arabic end reaches top of viewport
                const progress = (scrollTop / Math.max(1, arabicEndPos - viewportHeight * 0.5)) * 100;
                setScrollProgress(Math.min(100, Math.max(0, progress)));
            }
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => container.removeEventListener('scroll', handleScroll);
    }, [viewMode]);

    // Keyboard navigation (page mode only)
    useEffect(() => {
        if (viewMode === 'scroll') return;
        const handleKeyDown = (e) => {
            if (showJumpInput) return;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goToNext();
            else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goToPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goToNext, goToPrev, showJumpInput, viewMode]);

    useEffect(() => {
        const timer = setTimeout(() => setShowSwipeHint(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (showJumpInput && jumpInputRef.current) {
            jumpInputRef.current.focus();
        }
    }, [showJumpInput]);

    // Empty state
    if (!surah || !currentAyat) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                <p>Pilih surah pilihan untuk dibaca</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full max-w-3xl mx-auto" ref={containerRef}>
            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-gray-800 dark:bg-gray-700 text-white px-5 py-2.5 rounded-full shadow-lg text-sm whitespace-nowrap max-w-[90vw]"
                    >
                        {toast}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <SurahHeader
                surah={surah}
                totalAyat={totalAyat}
                viewMode={viewMode}
                toggleViewMode={toggleViewMode}
                getFontFamily={getFontFamily}
            />

            {/* Progress Bar */}
            <ProgressSection
                viewMode={viewMode}
                scrollProgress={scrollProgress}
                totalAyat={totalAyat}
                currentAyat={currentAyat}
                currentAyatIndex={currentAyatIndex}
                showJumpInput={showJumpInput}
                setShowJumpInput={setShowJumpInput}
            />

            {/* Jump Input */}
            <AnimatePresence>
                {showJumpInput && viewMode === 'page' && (
                    <JumpInput
                        jumpValue={jumpValue}
                        setJumpValue={setJumpValue}
                        handleJump={handleJump}
                        setShowJumpInput={setShowJumpInput}
                        firstAyat={ayatList[0].number}
                        lastAyat={ayatList[totalAyat - 1].number}
                        jumpInputRef={jumpInputRef}
                    />
                )}
            </AnimatePresence>

            {/* View Content */}
            {viewMode === 'scroll' ? (
                <QuranScrollView
                    surah={surah}
                    ayatList={ayatList}
                    scrollContainerRef={scrollContainerRef}
                    arabicEndRef={arabicEndRef}
                    getFontFamily={getFontFamily}
                    toArabicNumber={toArabicNumber}
                    handleShare={handleShare}
                    settings={settings}
                />
            ) : (
                <QuranPageView
                    surah={surah}
                    currentAyat={currentAyat}
                    currentAyatIndex={currentAyatIndex}
                    totalAyat={totalAyat}
                    isCompleted={isCompleted}
                    showSwipeHint={showSwipeHint}
                    goToNext={goToNext}
                    goToPrev={goToPrev}
                    setCurrentAyatIndex={setCurrentAyatIndex}
                    handleShare={handleShare}
                    handleTouchStart={handleTouchStart}
                    handleTouchMove={handleTouchMove}
                    handleTouchEnd={handleTouchEnd}
                    getFontFamily={getFontFamily}
                    toArabicNumber={toArabicNumber}
                    settings={settings}
                />
            )}
        </div>
    );
};

// Sub-components
// The surah name is already shown in QuranView's header, so this stays compact
const SurahHeader = ({ surah, totalAyat, viewMode, toggleViewMode, getFontFamily }) => (
    <div className="flex items-center justify-between gap-3 pb-3 border-b border-gray-200 dark:border-gray-700 mb-3">
        <div className="min-w-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="text-lg text-gray-800 dark:text-gray-200 mr-1.5" style={{ fontFamily: getFontFamily() }}>
                    {surah.nameArabic}
                </span>
                {surah.meaning} • {surah.type} • {totalAyat} Ayat
            </p>
            {surah.totalAyat && surah.totalAyat > totalAyat && (
                <p className="text-xs text-amber-600 dark:text-amber-400">
                    📖 Ayat pilihan ({totalAyat} dari {surah.totalAyat} ayat)
                </p>
            )}
        </div>
        <button
            onClick={toggleViewMode}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-700 hover:text-green-700 dark:hover:text-green-400 active:scale-95 transition-all duration-200 text-xs"
        >
            <FontAwesomeIcon icon={viewMode === 'page' ? faScroll : faFileAlt} />
            <span>{viewMode === 'page' ? 'Mode Scroll' : 'Mode Per Ayat'}</span>
        </button>
    </div>
);

const ProgressSection = ({ viewMode, scrollProgress, totalAyat, currentAyat, currentAyatIndex, showJumpInput, setShowJumpInput }) => (
    viewMode === 'scroll' ? (
        <div className="flex items-center justify-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4 px-4">
            <span className="text-xs">{totalAyat} Ayat</span>
            <div className="flex-1 max-w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                    initial={false}
                    animate={{ width: `${scrollProgress}%` }}
                    transition={{ duration: 0.1 }}
                />
            </div>
            <span className="text-xs">{Math.round(scrollProgress)}%</span>
        </div>
    ) : (
        <div className="flex items-center justify-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4 px-2">
            <button
                onClick={() => setShowJumpInput(!showJumpInput)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 active:scale-95 transition-all"
            >
                <span className="font-semibold text-sm">Ayat {currentAyat.number}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
            <div className="flex-1 max-w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                    initial={false}
                    animate={{ width: `${((currentAyatIndex + 1) / totalAyat) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>
            <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">dari {totalAyat}</span>
        </div>
    )
);

const JumpInput = ({ jumpValue, setJumpValue, handleJump, setShowJumpInput, firstAyat, lastAyat, jumpInputRef }) => (
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
                min={firstAyat}
                max={lastAyat}
                value={jumpValue}
                onChange={(e) => setJumpValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleJump()}
                placeholder={`${firstAyat} - ${lastAyat}`}
                className="w-24 px-3 py-2 text-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button onClick={handleJump} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                Pergi
            </button>
            <button onClick={() => setShowJumpInput(false)} className="px-3 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                ✕
            </button>
        </div>
    </motion.div>
);

export default QuranReader;
