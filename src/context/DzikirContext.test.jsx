import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DzikirProvider, useDzikir } from '@/context/DzikirContext';
import dzikirData from '@/data/dzikir';

const useMemoryStorage = (initial) => {
    const store = { ...initial };
    localStorage.getItem.mockImplementation((key) => (key in store ? store[key] : null));
    localStorage.setItem.mockImplementation((key, value) => { store[key] = String(value); });
    localStorage.removeItem.mockImplementation((key) => { delete store[key]; });
};

const Probe = () => {
    const { currentTab, currentDzikirIndex, data } = useDzikir();
    return (
        <div>
            <span data-testid="tab">{currentTab}</span>
            <span data-testid="index">{currentDzikirIndex}</span>
            <span data-testid="counter">{data.pagi[0].counter}</span>
        </div>
    );
};

const savedProgress = () => {
    const progress = JSON.parse(JSON.stringify(dzikirData));
    progress.pagi[0].counter = 1;
    return JSON.stringify(progress);
};

describe('DzikirProvider', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers({ toFake: ['Date'] });
        vi.setSystemTime(new Date(2026, 9, 29, 6, 0));
    });

    afterEach(() => {
        vi.useRealTimers();
        window.history.replaceState(null, '', '/');
    });

    it('keeps progress saved earlier today', () => {
        useMemoryStorage({ dzikirProgress: savedProgress(), dzikirProgressDate: '2026-10-29' });
        render(<DzikirProvider><Probe /></DzikirProvider>);
        expect(screen.getByTestId('counter')).toHaveTextContent('1');
    });

    it('resets progress saved on an earlier day', () => {
        useMemoryStorage({ dzikirProgress: savedProgress(), dzikirProgressDate: '2026-10-28' });
        render(<DzikirProvider><Probe /></DzikirProvider>);
        expect(screen.getByTestId('counter')).toHaveTextContent('0');
    });

    it('restores the last viewed dzikir', () => {
        useMemoryStorage({
            dzikirSettings: JSON.stringify({ autoTabByTime: false }),
            dzikirCurrentTab: 'petang',
            dzikirCurrentIndex: '4'
        });
        render(<DzikirProvider><Probe /></DzikirProvider>);
        expect(screen.getByTestId('tab')).toHaveTextContent('petang');
        expect(screen.getByTestId('index')).toHaveTextContent('4');
    });

    it('ignores an out-of-range saved index', () => {
        useMemoryStorage({ dzikirCurrentTab: 'pagi', dzikirCurrentIndex: '999' });
        render(<DzikirProvider><Probe /></DzikirProvider>);
        expect(screen.getByTestId('index')).toHaveTextContent('0');
    });

    it('picks pagi/petang by time of day', () => {
        useMemoryStorage({ dzikirCurrentTab: 'pagi' });
        vi.setSystemTime(new Date(2026, 9, 29, 18, 0));
        render(<DzikirProvider><Probe /></DzikirProvider>);
        expect(screen.getByTestId('tab')).toHaveTextContent('petang');
    });

    it('resumes the saved position when the time-based tab matches', () => {
        useMemoryStorage({ dzikirCurrentTab: 'pagi', dzikirCurrentIndex: '2' });
        render(<DzikirProvider><Probe /></DzikirProvider>);
        expect(screen.getByTestId('tab')).toHaveTextContent('pagi');
        expect(screen.getByTestId('index')).toHaveTextContent('2');
    });

    it('opens the tab from a PWA shortcut URL', () => {
        useMemoryStorage({ dzikirCurrentTab: 'pagi', dzikirCurrentIndex: '3' });
        window.history.replaceState(null, '', '/?tab=petang');
        render(<DzikirProvider><Probe /></DzikirProvider>);
        expect(screen.getByTestId('tab')).toHaveTextContent('petang');
        expect(screen.getByTestId('index')).toHaveTextContent('0');
    });
});
