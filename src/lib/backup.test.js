import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createBackup, restoreBackup } from '@/lib/backup';

describe('backup', () => {
    let store;

    beforeEach(() => {
        vi.clearAllMocks();
        store = {};
        localStorage.getItem.mockImplementation((key) => (key in store ? store[key] : null));
        localStorage.setItem.mockImplementation((key, value) => { store[key] = String(value); });
    });

    it('round-trips long-lived data but not daily progress', () => {
        store.dzikirStats = JSON.stringify({ streak: 5 });
        store.doaFavorites = JSON.stringify([1, 3]);
        store.dzikirProgress = JSON.stringify({ pagi: [] });

        const backup = createBackup();
        expect(backup.data).toEqual({ dzikirStats: { streak: 5 }, doaFavorites: [1, 3] });

        store = {};
        restoreBackup(JSON.parse(JSON.stringify(backup)));
        expect(JSON.parse(store.dzikirStats)).toEqual({ streak: 5 });
        expect(JSON.parse(store.doaFavorites)).toEqual([1, 3]);
        expect(store.dzikirProgress).toBeUndefined();
    });

    it('rejects files that are not Daily Dzikr backups', () => {
        expect(() => restoreBackup({ foo: 'bar' })).toThrow();
        expect(() => restoreBackup(null)).toThrow();
        expect(store).toEqual({});
    });
});
