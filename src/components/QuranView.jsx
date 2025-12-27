import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookQuran, faArrowLeft, faMoon, faStar, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import QuranReader from './QuranReader';
import { surahList, getSurah } from '@/data/quran';

const QuranView = () => {
    const [selectedSurah, setSelectedSurah] = useState(null);
    const [surahData, setSurahData] = useState(null);

    const handleSelectSurah = (surahId) => {
        const data = getSurah(surahId);
        setSurahData(data);
        setSelectedSurah(surahId);
    };

    const handleBack = () => {
        setSelectedSurah(null);
        setSurahData(null);
    };

    return (
        <div className="h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="shrink-0 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                    {selectedSurah && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleBack}
                            className="h-9 w-9 rounded-full"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </Button>
                    )}
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faBookQuran} className="text-green-600 text-xl" />
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                            {selectedSurah ? surahData?.name : 'Al-Quran'}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                    {!selectedSurah ? (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-4 space-y-3 pb-20"
                        >
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                Pilih surah pilihan yang ingin dibaca:
                            </p>

                            {surahList.map((surah, index) => (
                                <motion.button
                                    key={surah.id}
                                    onClick={() => handleSelectSurah(surah.id)}
                                    className="w-full text-left p-4 rounded-2xl border border-gray-200 dark:border-gray-700 
                                        bg-white dark:bg-gray-800/50
                                        hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20
                                        transition-all duration-200 group"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Number Badge */}
                                        <div className="shrink-0 w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                            <FontAwesomeIcon icon={faBookOpen} className="text-green-600 dark:text-green-400" />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-lg font-bold text-gray-800 dark:text-white">
                                                    {surah.name}
                                                </span>
                                                <span className="text-xl text-gray-500 dark:text-gray-400" style={{ fontFamily: "'Scheherazade New', serif" }}>
                                                    {surah.nameArabic}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                                {surah.meaning} • {surah.type} • {surah.displayAyat || surah.totalAyat} Ayat
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-2">
                                                {surah.description}
                                            </p>
                                        </div>

                                        {/* Time Badge */}
                                        <div className="shrink-0">
                                            <span className="text-xs px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center gap-1.5">
                                                {surah.id === 'al-mulk' ? (
                                                    <><FontAwesomeIcon icon={faMoon} /> Malam</>
                                                ) : surah.id === 'al-kahfi' ? (
                                                    <><FontAwesomeIcon icon={faStar} /> Jum'at</>
                                                ) : (
                                                    <><FontAwesomeIcon icon={faStar} /> Favorit</>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </motion.button>
                            ))}

                        </motion.div>
                    ) : (
                        <motion.div
                            key="reader"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="h-full p-4 pb-20"
                        >
                            <QuranReader surah={surahData} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default QuranView;
