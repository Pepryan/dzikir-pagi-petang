import { getToday } from '@/data/statsData';

const APP_ID = 'daily-dzikr';

// Long-lived data worth keeping when switching devices.
// Daily dzikir progress is left out since it resets every day anyway.
const BACKUP_KEYS = ['dzikirStats', 'dzikirSettings', 'quranProgress', 'doaFavorites'];

export const createBackup = () => {
    const data = {};
    BACKUP_KEYS.forEach(key => {
        const value = localStorage.getItem(key);
        if (value !== null) data[key] = JSON.parse(value);
    });
    return { app: APP_ID, exportedAt: new Date().toISOString(), data };
};

export const downloadBackup = () => {
    const blob = new Blob([JSON.stringify(createBackup(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `daily-dzikr-backup-${getToday()}.json`;
    link.click();
    URL.revokeObjectURL(url);
};

// Writes a parsed backup into localStorage. Throws if it isn't a Daily Dzikr backup.
export const restoreBackup = (backup) => {
    if (backup?.app !== APP_ID || typeof backup.data !== 'object' || backup.data === null) {
        throw new Error('Bukan file cadangan Daily Dzikr');
    }
    BACKUP_KEYS.forEach(key => {
        if (key in backup.data) {
            localStorage.setItem(key, JSON.stringify(backup.data[key]));
        }
    });
    return backup.data;
};
