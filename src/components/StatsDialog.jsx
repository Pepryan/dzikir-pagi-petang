import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { getLast7Days, getMonthDays, getStatsSummary } from "@/data/statsData";

const StatsDialog = ({ open, onOpenChange }) => {
    const stats = getStatsSummary();
    const last7Days = getLast7Days();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl">📊 Statistik Dzikir</DialogTitle>
                </DialogHeader>
                <DialogDescription className="sr-only">
                    Statistik dan riwayat dzikir Anda
                </DialogDescription>

                <div className="space-y-6 py-4">
                    {/* Streak Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 border border-orange-200 dark:border-orange-800"
                    >
                        <div className="text-5xl mb-2">🔥</div>
                        <div className="text-4xl font-bold text-orange-600 dark:text-orange-400">
                            {stats.streak}
                        </div>
                        <div className="text-sm text-orange-700 dark:text-orange-300 font-medium">
                            Hari Berturut-turut
                        </div>
                        <div className="text-xs text-orange-600/70 dark:text-orange-400/70 mt-1">
                            Rekor terpanjang: {stats.longestStreak} hari
                        </div>
                    </motion.div>

                    {/* Weekly Progress */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                            📅 Progress Minggu Ini
                        </h3>
                        <div className="grid grid-cols-7 gap-1">
                            {last7Days.map((day, index) => (
                                <motion.div
                                    key={day.date}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`text-center p-2 rounded-xl ${day.isToday
                                            ? 'ring-2 ring-sky-500 dark:ring-sky-400'
                                            : ''
                                        }`}
                                >
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                        {day.dayName}
                                    </div>
                                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        {day.dayNum}
                                    </div>
                                    <div className="space-y-1">
                                        <div
                                            className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center text-xs ${day.pagi
                                                    ? 'bg-yellow-400 text-yellow-900'
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                                                }`}
                                            title="Dzikir Pagi"
                                        >
                                            {day.pagi ? '☀️' : '○'}
                                        </div>
                                        <div
                                            className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center text-xs ${day.petang
                                                    ? 'bg-indigo-500 text-white'
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                                                }`}
                                            title="Dzikir Petang"
                                        >
                                            {day.petang ? '🌙' : '○'}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-2">
                            <span className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded-full bg-yellow-400"></span> Pagi
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded-full bg-indigo-500"></span> Petang
                            </span>
                        </div>
                    </div>

                    {/* Monthly Calendar */}
                    <MonthCalendar />

                    {/* Total Sessions */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800">
                            <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                                {stats.totalSessions}
                            </div>
                            <div className="text-xs text-sky-700 dark:text-sky-300">
                                Total Sesi Dzikir
                            </div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                {stats.badges.length}
                            </div>
                            <div className="text-xs text-emerald-700 dark:text-emerald-300">
                                Badge Diraih
                            </div>
                        </div>
                    </div>

                    {/* Badges Section */}
                    {stats.badges.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                                🏅 Badge
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {stats.badges.map((badge, index) => (
                                    <motion.div
                                        key={badge.id}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 border border-amber-300 dark:border-amber-700"
                                    >
                                        <span className="text-lg">{badge.icon}</span>
                                        <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
                                            {badge.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Motivational Message */}
                    <div className="text-center p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800">
                        <p className="text-sm text-purple-700 dark:text-purple-300 italic">
                            {stats.streak === 0
                                ? '"Mulailah hari ini, satu dzikir lebih baik dari tidak sama sekali."'
                                : stats.streak < 7
                                    ? '"Terus istiqomah! Sedikit demi sedikit, lama-lama menjadi bukit."'
                                    : '"Masya Allah! Pertahankan istiqomahmu, Allah mencintai amalan yang konsisten."'}
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const WEEKDAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

const MonthCalendar = () => {
    const now = new Date();
    const [viewDate, setViewDate] = useState({ year: now.getFullYear(), month: now.getMonth() });
    const { days, offset } = getMonthDays(viewDate.year, viewDate.month);
    const isCurrentMonth = viewDate.year === now.getFullYear() && viewDate.month === now.getMonth();
    const monthLabel = new Date(viewDate.year, viewDate.month, 1)
        .toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
    const pagiCount = days.filter(day => day.pagi).length;
    const petangCount = days.filter(day => day.petang).length;

    const changeMonth = (delta) => {
        const date = new Date(viewDate.year, viewDate.month + delta, 1);
        setViewDate({ year: date.getFullYear(), month: date.getMonth() });
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    🗓️ Riwayat Bulanan
                </h3>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => changeMonth(-1)}
                        className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                        aria-label="Bulan sebelumnya"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
                    </button>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-32 text-center">
                        {monthLabel}
                    </span>
                    <button
                        onClick={() => changeMonth(1)}
                        disabled={isCurrentMonth}
                        className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 disabled:opacity-30 disabled:hover:bg-transparent"
                        aria-label="Bulan berikutnya"
                    >
                        <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
                {WEEKDAYS.map(name => (
                    <div key={name} className="text-xs text-gray-500 dark:text-gray-400 pb-1">{name}</div>
                ))}
                {Array.from({ length: offset }).map((_, i) => <div key={`empty-${i}`} />)}
                {days.map(day => (
                    <div
                        key={day.date}
                        className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs ${day.pagi && day.petang
                            ? 'bg-emerald-500 text-white font-semibold'
                            : day.pagi || day.petang
                                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300'
                                : day.isFuture
                                    ? 'text-gray-300 dark:text-gray-600'
                                    : 'bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400'
                            } ${day.isToday ? 'ring-2 ring-sky-500 dark:ring-sky-400' : ''}`}
                        title={`${day.date}${day.pagi ? ' · Pagi ✓' : ''}${day.petang ? ' · Petang ✓' : ''}`}
                    >
                        <span>{day.dayNum}</span>
                        <span className="flex gap-0.5 h-1.5 mt-0.5">
                            {day.pagi && <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />}
                            {day.petang && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                        </span>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span>☀️ {pagiCount} hari pagi</span>
                <span>🌙 {petangCount} hari petang</span>
                <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-emerald-500"></span> Keduanya
                </span>
            </div>
        </div>
    );
};

export default StatsDialog;
