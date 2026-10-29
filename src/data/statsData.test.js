import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { recordCompletion, getStatsSummary, loadStats, getToday, getMonthDays } from '@/data/statsData';

// In-memory localStorage backed by the global mock
const useMemoryStorage = () => {
    const store = {};
    localStorage.getItem.mockImplementation((key) => (key in store ? store[key] : null));
    localStorage.setItem.mockImplementation((key, value) => { store[key] = String(value); });
    localStorage.removeItem.mockImplementation((key) => { delete store[key]; });
    return store;
};

describe('statsData', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        useMemoryStorage();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('uses the local date, not UTC', () => {
        // 00:30 local time is still the previous day in UTC for any timezone east of UTC
        vi.setSystemTime(new Date(2026, 9, 29, 0, 30));
        expect(getToday()).toBe('2026-10-29');

        recordCompletion('pagi');
        expect(loadStats().history['2026-10-29'].pagi).toBe(true);
    });

    it('counts a session only once per type per day', () => {
        vi.setSystemTime(new Date(2026, 9, 29, 6, 0));
        recordCompletion('pagi');
        recordCompletion('pagi');
        recordCompletion('petang');

        expect(getStatsSummary().totalSessions).toBe(2);
    });

    it('breaks the streak after a missed day', () => {
        vi.setSystemTime(new Date(2026, 9, 27, 6, 0));
        recordCompletion('pagi');
        vi.setSystemTime(new Date(2026, 9, 28, 6, 0));
        recordCompletion('pagi');
        expect(getStatsSummary().streak).toBe(2);

        // Skipped the 29th entirely
        vi.setSystemTime(new Date(2026, 9, 30, 6, 0));
        expect(getStatsSummary().streak).toBe(0);
        expect(getStatsSummary().longestStreak).toBe(2);
    });

    it('builds a Monday-first month calendar with completions', () => {
        vi.setSystemTime(new Date(2026, 9, 5, 6, 0));
        recordCompletion('pagi');
        recordCompletion('petang');
        vi.setSystemTime(new Date(2026, 9, 6, 6, 0));

        const { days, offset } = getMonthDays(2026, 9);
        expect(days).toHaveLength(31);
        expect(offset).toBe(3); // 1 Oct 2026 is a Thursday
        expect(days[4]).toMatchObject({ date: '2026-10-05', pagi: true, petang: true });
        expect(days[5]).toMatchObject({ isToday: true, isFuture: false });
        expect(days[6].isFuture).toBe(true);
    });
});
