import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsPraying, faArrowLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useDzikir } from "@/context/DzikirContext";
import doaData from '@/data/doa';

const DoaView = () => {
    const [selectedDoa, setSelectedDoa] = useState(null);
    const { settings } = useDzikir();

    const doaList = doaData.harian || [];

    const handleSelectDoa = (index) => {
        setSelectedDoa(doaList[index]);
    };

    const handleBack = () => {
        setSelectedDoa(null);
    };

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

    // Get icon based on doa type
    const getDoaIcon = (title) => {
        if (title.includes('Makan')) return '🍽️';
        if (title.includes('Rumah')) return '🏠';
        if (title.includes('Masjid')) return '🕌';
        if (title.includes('Tidur')) return '😴';
        if (title.includes('Bangun')) return '🌅';
        if (title.includes('Hujan')) return '🌧️';
        if (title.includes('Bersin')) return '🤧';
        if (title.includes('Sakit') || title.includes('Sembuh')) return '💊';
        if (title.includes('Kendaraan') || title.includes('Safar')) return '🚗';
        if (title.includes('Kamar Mandi') || title.includes('WC')) return '🚿';
        if (title.includes('Marah')) return '😤';
        if (title.includes('Pakaian')) return '👔';
        if (title.includes('Cermin')) return '🪞';
        return '🤲';
    };

    return (
        <div className="h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="shrink-0 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                    {selectedDoa && (
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
                        <FontAwesomeIcon icon={faHandsPraying} className="text-amber-500 text-xl" />
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                            {selectedDoa ? selectedDoa.title : 'Doa Harian'}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                    {!selectedDoa ? (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-4 space-y-2 pb-20"
                        >
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                {doaList.length} Doa dari Hisnul Muslim:
                            </p>

                            {doaList.map((doa, index) => (
                                <motion.button
                                    key={doa.id}
                                    onClick={() => handleSelectDoa(index)}
                                    className="w-full text-left p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 
                                        bg-white dark:bg-gray-800/50
                                        hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20
                                        transition-all duration-200 group flex items-center gap-3"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Icon */}
                                    <div className="shrink-0 w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-lg">
                                        {getDoaIcon(doa.title)}
                                    </div>

                                    {/* Title */}
                                    <div className="flex-1 min-w-0">
                                        <span className="font-medium text-gray-800 dark:text-white">
                                            {doa.title}
                                        </span>
                                    </div>

                                    {/* Arrow */}
                                    <FontAwesomeIcon
                                        icon={faChevronRight}
                                        className="text-gray-400 group-hover:text-amber-500 transition-colors"
                                    />
                                </motion.button>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="detail"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="p-4 pb-20"
                        >
                            {/* Doa Content Card */}
                            <div className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                                {/* Arabic */}
                                <div className="text-center mb-6">
                                    <p
                                        className="text-3xl leading-loose text-gray-900 dark:text-white"
                                        style={{
                                            fontFamily: getFontFamily(),
                                            fontSize: `${(settings.arabicFontSize || 32)}px`,
                                            lineHeight: '2.2'
                                        }}
                                        dir="rtl"
                                    >
                                        {selectedDoa.arabic}
                                    </p>
                                </div>

                                {/* Latin */}
                                {settings.showLatin !== false && (
                                    <div className="text-center mb-4">
                                        <p
                                            className="text-lg italic text-gray-600 dark:text-gray-400"
                                            style={{ fontSize: `${(settings.latinFontSize || 16)}px` }}
                                        >
                                            {selectedDoa.latin}
                                        </p>
                                    </div>
                                )}

                                {/* Translation */}
                                {settings.showTranslation !== false && (
                                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl mb-4">
                                        <p
                                            className="text-gray-700 dark:text-gray-300"
                                            style={{ fontSize: `${(settings.translationFontSize || 14)}px` }}
                                        >
                                            {selectedDoa.translation}
                                        </p>
                                    </div>
                                )}

                                {/* Source */}
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 dark:text-gray-500 italic">
                                        📚 {selectedDoa.source}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DoaView;
