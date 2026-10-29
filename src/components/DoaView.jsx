import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsPraying, faArrowLeft, faChevronRight, faStar, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useDzikir } from "@/context/DzikirContext";
import ShareButton from "./ShareButton";
import { formatEntry } from "@/lib/share";
import doaData from '@/data/doa';

const FAVORITES_KEY = 'doaFavorites';

const loadFavorites = () => {
    try {
        const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY));
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
};

const DoaView = () => {
    const [selectedDoa, setSelectedDoa] = useState(null);
    const [query, setQuery] = useState('');
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [favorites, setFavorites] = useState(loadFavorites);
    const { settings } = useDzikir();

    const allDoa = doaData.harian || [];
    const normalizedQuery = query.trim().toLowerCase();
    const doaList = allDoa
        .filter(doa => !showFavoritesOnly || favorites.includes(doa.id))
        .filter(doa => !normalizedQuery || [doa.title, doa.latin, doa.translation]
            .some(text => text.toLowerCase().includes(normalizedQuery)))
        // Favorites first, otherwise keep the original order
        .sort((a, b) => favorites.includes(b.id) - favorites.includes(a.id));

    const toggleFavorite = (id) => {
        const updated = favorites.includes(id)
            ? favorites.filter(favId => favId !== id)
            : [...favorites, id];
        setFavorites(updated);
        try {
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
        } catch (error) {
            console.error('Error saving doa favorites:', error);
        }
    };

    const handleSelectDoa = (doa) => {
        setSelectedDoa(doa);
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
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        <FontAwesomeIcon icon={faHandsPraying} className="text-amber-500 text-xl" />
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white truncate">
                            {selectedDoa ? selectedDoa.title : 'Doa Harian'}
                        </h1>
                    </div>
                    {selectedDoa && (
                        <FavoriteButton
                            isFavorite={favorites.includes(selectedDoa.id)}
                            onClick={() => toggleFavorite(selectedDoa.id)}
                        />
                    )}
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
                            {/* Search & favorites filter */}
                            <div className="flex items-center gap-2 mb-2">
                                <div className="relative flex-1">
                                    <FontAwesomeIcon
                                        icon={faMagnifyingGlass}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                                    />
                                    <input
                                        type="search"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Cari doa..."
                                        aria-label="Cari doa"
                                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                </div>
                                <button
                                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                                    aria-pressed={showFavoritesOnly}
                                    className={`shrink-0 px-3 py-2.5 rounded-xl border text-sm flex items-center gap-1.5 transition-colors ${showFavoritesOnly
                                        ? 'bg-amber-500 border-amber-500 text-white'
                                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                                        }`}
                                >
                                    <FontAwesomeIcon icon={faStar} />
                                    Favorit
                                </button>
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                {normalizedQuery || showFavoritesOnly
                                    ? `${doaList.length} doa ditemukan`
                                    : `${doaList.length} Doa dari Hisnul Muslim:`}
                            </p>

                            {doaList.length === 0 && (
                                <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-8">
                                    {showFavoritesOnly && favorites.length === 0
                                        ? 'Belum ada doa favorit. Ketuk ⭐ pada doa untuk menyimpannya.'
                                        : 'Doa tidak ditemukan.'}
                                </p>
                            )}

                            {doaList.map((doa, index) => (
                                <motion.button
                                    key={doa.id}
                                    onClick={() => handleSelectDoa(doa)}
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

                                    {favorites.includes(doa.id) && (
                                        <FontAwesomeIcon icon={faStar} className="text-amber-500 text-sm" aria-label="Favorit" />
                                    )}

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

                                <div className="flex justify-center mt-4">
                                    <ShareButton title={selectedDoa.title} text={formatEntry(selectedDoa)} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const FavoriteButton = ({ isFavorite, onClick }) => (
    <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        className="h-9 w-9 rounded-full shrink-0"
        aria-label={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
        aria-pressed={isFavorite}
    >
        <FontAwesomeIcon icon={faStar} className={isFavorite ? 'text-amber-500' : 'text-gray-300 dark:text-gray-600'} />
    </Button>
);

export default DoaView;
