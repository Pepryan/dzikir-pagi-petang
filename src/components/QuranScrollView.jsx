import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useDzikir } from "@/context/DzikirContext";

/**
 * Scroll View component for Quran Reader
 * Displays all ayat in a continuous scrollable format
 */
const QuranScrollView = ({
    surah,
    ayatList,
    scrollContainerRef,
    arabicEndRef,
    getFontFamily,
    toArabicNumber,
    handleCopy,
    settings
}) => {
    return (
        <div
            ref={scrollContainerRef}
            className="flex-1 min-h-0 overflow-y-auto px-4 quran-scroll-container"
        >
            {/* Bismillah */}
            {surah.bismillah && (
                <div className="text-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <p
                        className="text-2xl text-gray-800 dark:text-gray-100"
                        style={{ fontFamily: getFontFamily() }}
                        dir="rtl"
                    >
                        {surah.bismillah}
                    </p>
                </div>
            )}

            {/* Arabic Text - Continuous Flow */}
            <div
                className="text-right mb-8 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl"
                dir="rtl"
            >
                <p
                    className="leading-loose text-gray-900 dark:text-white quran-arabic-text"
                    style={{
                        fontFamily: getFontFamily(),
                        fontSize: `${(settings.arabicFontSize || 32) * 1.1}px`,
                        lineHeight: '2.4',
                        textAlign: 'justify',
                        textAlignLast: 'center'
                    }}
                >
                    {ayatList.map((ayat, index) => (
                        <span key={ayat.number}>
                            {ayat.arabic}
                            <span className="inline-block mx-1 text-primary-500 ayat-number-inline">
                                ﴿{toArabicNumber(ayat.number)}﴾
                            </span>
                        </span>
                    ))}
                </p>
                {/* Marker for end of Arabic text */}
                <div ref={arabicEndRef} />
            </div>

            {/* Latin & Translation per Ayat */}
            <div className="space-y-4">
                {ayatList.map((ayat) => (
                    <div
                        key={ayat.number}
                        className="ayat-detail-item p-4 rounded-xl bg-gray-50 dark:bg-gray-800/30 border-l-4 border-gray-200 dark:border-gray-700"
                    >
                        <div className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-sm font-semibold">
                                {ayat.number}
                            </span>
                            <div className="flex-1">
                                {settings.showLatin !== false && (
                                    <p
                                        className="italic text-gray-600 dark:text-gray-400 mb-2"
                                        style={{ fontSize: `${(settings.latinFontSize || 16)}px` }}
                                    >
                                        {ayat.latin}
                                    </p>
                                )}
                                {settings.showTranslation !== false && (
                                    <p
                                        className="text-gray-700 dark:text-gray-300"
                                        style={{ fontSize: `${(settings.translationFontSize || 14)}px` }}
                                    >
                                        {ayat.translation}
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={(e) => handleCopy(e, ayat)}
                                className="flex-shrink-0 p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                                title="Salin ayat ini"
                            >
                                <FontAwesomeIcon icon={faCopy} className="text-sm" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Scroll to Top Button */}
            <div className="text-center py-4">
                <button
                    onClick={() => scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 
                        hover:text-green-600 dark:hover:text-green-400 
                        hover:bg-green-50 dark:hover:bg-green-900/20 
                        rounded-full transition-all border border-gray-200 dark:border-gray-700
                        hover:border-green-300 dark:hover:border-green-700"
                >
                    ⬆️ Kembali ke atas
                </button>
            </div>

            {/* End indicator */}
            <div className="text-center py-8 mt-4">
                <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                    <FontAwesomeIcon icon={faCheck} />
                    <span className="text-sm font-medium">Akhir Surah {surah.name}</span>
                </div>
            </div>
        </div>
    );
};

export default QuranScrollView;
