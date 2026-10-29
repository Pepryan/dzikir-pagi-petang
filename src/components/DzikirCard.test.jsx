import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DzikirCard from '@/components/DzikirCard';
import { DzikirProvider } from '@/context/DzikirContext';

const dzikir = { id: 1, title: 'Tasbih', arabic: 'سُبْحَانَ اللَّهِ', latin: 'Subhanallah', translation: 'Maha Suci Allah', source: 'HR. Muslim', count: 33, counter: 0 };

describe('DzikirCard', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.getItem.mockReturnValue(null);
    });

    it('counts when the card is tapped', () => {
        const onTap = vi.fn();
        render(<DzikirProvider><DzikirCard dzikir={dzikir} onTap={onTap} /></DzikirProvider>);

        expect(screen.getByText('Ketuk kartu untuk menghitung')).toBeInTheDocument();
        fireEvent.click(screen.getByText('سُبْحَانَ اللَّهِ'));
        expect(onTap).toHaveBeenCalledTimes(1);
    });

    it('does not count when pressing share', () => {
        const onTap = vi.fn();
        render(<DzikirProvider><DzikirCard dzikir={dzikir} onTap={onTap} /></DzikirProvider>);

        fireEvent.click(screen.getByLabelText('Salin'));
        expect(onTap).not.toHaveBeenCalled();
    });

    it('shows no tap hint without onTap (marker mode)', () => {
        render(<DzikirProvider><DzikirCard dzikir={dzikir} /></DzikirProvider>);
        expect(screen.queryByText('Ketuk kartu untuk menghitung')).not.toBeInTheDocument();
    });
});
