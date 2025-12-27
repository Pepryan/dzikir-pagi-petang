// Stats Data Helper Functions
// Menyimpan dan mengelola statistik dzikir pengguna

const STATS_KEY = 'dzikirStats';

// Format tanggal ke YYYY-MM-DD
const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};

// Get today's date in YYYY-MM-DD format
const getToday = () => formatDate(new Date());

// Get yesterday's date in YYYY-MM-DD format
const getYesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return formatDate(yesterday);
};

// Initialize default stats structure
const getDefaultStats = () => ({
    streak: 0,
    longestStreak: 0,
    totalSessions: 0,
    lastPagiDate: null,
    lastPetangDate: null,
    history: {}, // { 'YYYY-MM-DD': { pagi: true/false, petang: true/false } }
    badges: [],
    lastUpdated: null
});

// Load stats from localStorage
export const loadStats = () => {
    try {
        const saved = localStorage.getItem(STATS_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            return { ...getDefaultStats(), ...parsed };
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
    return getDefaultStats();
};

// Save stats to localStorage
export const saveStats = (stats) => {
    try {
        stats.lastUpdated = new Date().toISOString();
        localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch (error) {
        console.error('Error saving stats:', error);
    }
};

// Record a dzikir completion
export const recordCompletion = (type) => {
    const stats = loadStats();
    const today = getToday();

    // Initialize today's history if not exists
    if (!stats.history[today]) {
        stats.history[today] = { pagi: false, petang: false };
    }

    // Mark the type as completed
    if (type === 'pagi') {
        stats.lastPagiDate = today;
        stats.history[today].pagi = true;
    } else if (type === 'petang') {
        stats.lastPetangDate = today;
        stats.history[today].petang = true;
    }

    // Increment total sessions
    stats.totalSessions++;

    // Calculate streak
    stats.streak = calculateStreak(stats.history);

    // Update longest streak
    if (stats.streak > stats.longestStreak) {
        stats.longestStreak = stats.streak;
    }

    // Check for badges
    stats.badges = checkBadges(stats);

    saveStats(stats);
    return stats;
};

// Calculate current streak
const calculateStreak = (history) => {
    let streak = 0;
    let currentDate = new Date();

    // Check if today has any completion
    const today = formatDate(currentDate);
    if (history[today] && (history[today].pagi || history[today].petang)) {
        streak = 1;
    } else {
        // If no completion today, start from yesterday
        currentDate.setDate(currentDate.getDate() - 1);
    }

    // Count consecutive days backwards
    while (true) {
        const dateStr = formatDate(currentDate);
        const dayHistory = history[dateStr];

        // A day counts if at least one dzikir (pagi or petang) was completed
        if (dayHistory && (dayHistory.pagi || dayHistory.petang)) {
            if (streak === 0) streak = 1;
            else streak++;
        } else {
            break;
        }

        currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
};

// Get last 7 days history for display
export const getLast7Days = () => {
    const stats = loadStats();
    const days = [];

    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = formatDate(date);
        const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

        days.push({
            date: dateStr,
            dayName: dayNames[date.getDay()],
            dayNum: date.getDate(),
            pagi: stats.history[dateStr]?.pagi || false,
            petang: stats.history[dateStr]?.petang || false,
            isToday: i === 0
        });
    }

    return days;
};

// Check and award badges
const checkBadges = (stats) => {
    const badges = [...(stats.badges || [])];

    const badgeDefinitions = [
        { id: 'first_dzikir', name: 'Langkah Pertama', condition: () => stats.totalSessions >= 1, icon: '🌟' },
        { id: 'streak_3', name: 'Konsisten 3 Hari', condition: () => stats.streak >= 3, icon: '🔥' },
        { id: 'streak_7', name: 'Seminggu Istiqomah', condition: () => stats.streak >= 7, icon: '💪' },
        { id: 'streak_30', name: 'Sebulan Istiqomah', condition: () => stats.streak >= 30, icon: '🏆' },
        { id: 'sessions_10', name: '10 Sesi Dzikir', condition: () => stats.totalSessions >= 10, icon: '📿' },
        { id: 'sessions_50', name: '50 Sesi Dzikir', condition: () => stats.totalSessions >= 50, icon: '⭐' },
        { id: 'sessions_100', name: '100 Sesi Dzikir', condition: () => stats.totalSessions >= 100, icon: '👑' },
    ];

    badgeDefinitions.forEach(badge => {
        if (!badges.find(b => b.id === badge.id) && badge.condition()) {
            badges.push({
                id: badge.id,
                name: badge.name,
                icon: badge.icon,
                earnedAt: new Date().toISOString()
            });
        }
    });

    return badges;
};

// Get summary stats for display
export const getStatsSummary = () => {
    const stats = loadStats();
    return {
        streak: stats.streak,
        longestStreak: stats.longestStreak,
        totalSessions: stats.totalSessions,
        badges: stats.badges || [],
        lastPagiDate: stats.lastPagiDate,
        lastPetangDate: stats.lastPetangDate
    };
};

// Reset all stats (for testing/debug)
export const resetStats = () => {
    localStorage.removeItem(STATS_KEY);
    return getDefaultStats();
};

export default {
    loadStats,
    saveStats,
    recordCompletion,
    getLast7Days,
    getStatsSummary,
    resetStats
};
