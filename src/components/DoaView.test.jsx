import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import DoaView from '@/components/DoaView';
import { DzikirProvider } from '@/context/DzikirContext';

describe('DoaView', () => {
    let store;

    beforeEach(() => {
        vi.clearAllMocks();
        store = {};
        localStorage.getItem.mockImplementation((key) => (key in store ? store[key] : null));
        localStorage.setItem.mockImplementation((key, value) => { store[key] = String(value); });
    });

    const renderView = () => render(<DzikirProvider><DoaView /></DzikirProvider>);

    it('filters doa by search text', () => {
        renderView();
        fireEvent.change(screen.getByLabelText('Cari doa'), { target: { value: 'makan' } });

        expect(screen.getByText('Doa Sebelum Makan')).toBeInTheDocument();
        expect(screen.queryByText('Doa Masuk Rumah')).not.toBeInTheDocument();
    });

    it('saves favorites and filters by them', () => {
        renderView();
        fireEvent.click(screen.getByText('Doa Masuk Rumah'));
        fireEvent.click(screen.getByLabelText('Tambah ke favorit'));
        expect(JSON.parse(store.doaFavorites)).toEqual([3]);

        // Back to the list and show favorites only
        fireEvent.click(screen.getAllByRole('button')[0]);
        fireEvent.click(screen.getByRole('button', { name: /Favorit/ }));
        const list = screen.getByText('1 doa ditemukan').parentElement;
        expect(within(list).getByText('Doa Masuk Rumah')).toBeInTheDocument();
        expect(within(list).queryByText('Doa Sebelum Makan')).not.toBeInTheDocument();
    });
});
