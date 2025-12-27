import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMosque,
    faBookQuran,
    faHandsPraying,
    faChartLine
} from '@fortawesome/free-solid-svg-icons';

const BottomNav = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'dzikir', label: 'Dzikir', icon: faMosque, activeColor: 'bg-sky-500', activeBg: 'bg-sky-100 dark:bg-sky-900/40' },
        { id: 'quran', label: 'Al-Quran', icon: faBookQuran, activeColor: 'bg-green-500', activeBg: 'bg-green-100 dark:bg-green-900/40' },
        { id: 'doa', label: 'Doa', icon: faHandsPraying, activeColor: 'bg-amber-500', activeBg: 'bg-amber-100 dark:bg-amber-900/40' },
        { id: 'stats', label: 'Statistik', icon: faChartLine, activeColor: 'bg-purple-500', activeBg: 'bg-purple-100 dark:bg-purple-900/40' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800">
            <div className="flex justify-around items-center h-18 max-w-lg mx-auto px-4 py-2">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;

                    return (
                        <motion.button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className="flex flex-col items-center justify-center flex-1 py-1.5 relative"
                            whileTap={{ scale: 0.92 }}
                        >
                            {/* Icon container with active background */}
                            <motion.div
                                className={`relative flex items-center justify-center w-12 h-9 rounded-2xl transition-colors duration-300 ${isActive ? tab.activeBg : ''
                                    }`}
                                animate={{
                                    scale: isActive ? 1 : 0.95,
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            >
                                <FontAwesomeIcon
                                    icon={tab.icon}
                                    className={`text-lg transition-colors duration-300 ${isActive
                                            ? tab.id === 'dzikir' ? 'text-sky-600 dark:text-sky-400'
                                                : tab.id === 'quran' ? 'text-green-600 dark:text-green-400'
                                                    : tab.id === 'doa' ? 'text-amber-600 dark:text-amber-400'
                                                        : 'text-purple-600 dark:text-purple-400'
                                            : 'text-gray-400 dark:text-gray-500'
                                        }`}
                                />
                            </motion.div>

                            {/* Label */}
                            <motion.span
                                className={`text-xs mt-0.5 transition-all duration-300 ${isActive
                                        ? 'font-semibold ' + (
                                            tab.id === 'dzikir' ? 'text-sky-600 dark:text-sky-400'
                                                : tab.id === 'quran' ? 'text-green-600 dark:text-green-400'
                                                    : tab.id === 'doa' ? 'text-amber-600 dark:text-amber-400'
                                                        : 'text-purple-600 dark:text-purple-400'
                                        )
                                        : 'font-medium text-gray-500 dark:text-gray-500'
                                    }`}
                                animate={{
                                    y: isActive ? 0 : 2,
                                    opacity: isActive ? 1 : 0.7
                                }}
                            >
                                {tab.label}
                            </motion.span>

                            {/* Active dot indicator */}
                            {isActive && (
                                <motion.div
                                    layoutId="navDot"
                                    className={`absolute -bottom-0.5 w-1 h-1 rounded-full ${tab.activeColor}`}
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>
            {/* Safe area padding for iOS */}
            <div className="h-[env(safe-area-inset-bottom)]" />
        </nav>
    );
};

export default BottomNav;
