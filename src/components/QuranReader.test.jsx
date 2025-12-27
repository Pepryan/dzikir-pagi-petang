import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import QuranReader from '@/components/QuranReader';
import { DzikirProvider } from '@/context/DzikirContext';

// Mock surah data
const mockSurah = {
    id: 'al-waqiah',
    name: 'Al-Waqiah',
    nameArabic: 'الواقعة',
    meaning: 'Hari Kiamat',
    type: 'Makkiyah',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    totalAyat: 96,
    ayat: [
        { number: 1, arabic: 'إِذَا وَقَعَتِ الْوَاقِعَةُ', latin: "Idzaa waqa'atil waaqi'ah", translation: 'Apabila terjadi hari Kiamat,' },
        { number: 2, arabic: 'لَيْسَ لِوَقْعَتِهَا كَاذِبَةٌ', latin: "Laisa liwaq'atihaa kaadzibah", translation: 'tidak ada yang dapat mendustakan tentang kejadiannya.' },
        { number: 3, arabic: 'خَافِضَةٌ رَّافِعَةٌ', latin: 'Khoofidhotur roofi\'ah', translation: '(Kejadian itu) merendahkan (satu golongan) dan meninggikan (golongan yang lain).' },
    ]
};

// Wrapper component with DzikirContext provider
const renderWithProvider = (ui) => {
    return render(
        <DzikirProvider>
            {ui}
        </DzikirProvider>
    );
};

describe('QuranReader', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.getItem.mockReturnValue(null);
    });

    describe('Rendering', () => {
        it('should render surah header correctly', () => {
            renderWithProvider(<QuranReader surah={mockSurah} />);

            expect(screen.getByText('Al-Waqiah')).toBeInTheDocument();
            expect(screen.getByText(/Hari Kiamat/)).toBeInTheDocument();
        });

        it('should display first ayat by default', () => {
            renderWithProvider(<QuranReader surah={mockSurah} />);

            expect(screen.getByText(/إِذَا وَقَعَتِ الْوَاقِعَةُ/)).toBeInTheDocument();
            expect(screen.getByText("Idzaa waqa'atil waaqi'ah")).toBeInTheDocument();
        });

        it('should show bismillah on first ayat', () => {
            renderWithProvider(<QuranReader surah={mockSurah} />);

            expect(screen.getByText('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ')).toBeInTheDocument();
        });

        it('should show progress indicator', () => {
            renderWithProvider(<QuranReader surah={mockSurah} />);

            expect(screen.getByText('Ayat 1')).toBeInTheDocument();
            expect(screen.getByText('dari 3')).toBeInTheDocument();
        });
    });

    describe('Navigation', () => {
        it('should navigate to next ayat using desktop button', async () => {
            renderWithProvider(<QuranReader surah={mockSurah} />);

            const nextButton = screen.getByLabelText('Next ayat');
            fireEvent.click(nextButton);

            await waitFor(() => {
                expect(screen.getByText(/لَيْسَ لِوَقْعَتِهَا كَاذِبَةٌ/)).toBeInTheDocument();
            });
        });

        it('should navigate to previous ayat using desktop button', async () => {
            renderWithProvider(<QuranReader surah={mockSurah} />);

            // Go to second ayat first
            const nextButton = screen.getByLabelText('Next ayat');
            fireEvent.click(nextButton);

            await waitFor(() => {
                expect(screen.getByText(/لَيْسَ لِوَقْعَتِهَا كَاذِبَةٌ/)).toBeInTheDocument();
            });

            // Go back
            const prevButton = screen.getByLabelText('Previous ayat');
            fireEvent.click(prevButton);

            await waitFor(() => {
                expect(screen.getByText(/إِذَا وَقَعَتِ الْوَاقِعَةُ/)).toBeInTheDocument();
            });
        });
    });

    describe('Completion State', () => {
        it('should show completed message when at last ayat', async () => {
            renderWithProvider(<QuranReader surah={mockSurah} />);

            const nextButton = screen.getByLabelText('Next ayat');

            // Navigate to last ayat (3rd)
            fireEvent.click(nextButton);
            fireEvent.click(nextButton);

            await waitFor(() => {
                expect(screen.getByText(/Selesai membaca Al-Waqiah/)).toBeInTheDocument();
            });
        });

        it('should reset completed state when navigating back from last ayat', async () => {
            renderWithProvider(<QuranReader surah={mockSurah} />);

            const nextButton = screen.getByLabelText('Next ayat');

            // Navigate to last ayat
            fireEvent.click(nextButton);
            fireEvent.click(nextButton);

            await waitFor(() => {
                expect(screen.getByText(/Selesai membaca Al-Waqiah/)).toBeInTheDocument();
            });

            // Go back
            const prevButton = screen.getByLabelText('Previous ayat');
            fireEvent.click(prevButton);

            await waitFor(() => {
                expect(screen.queryByText(/Selesai membaca Al-Waqiah/)).not.toBeInTheDocument();
            });
        });
    });

    describe('Jump to Ayat', () => {
        it('should open jump input when clicking ayat number', () => {
            renderWithProvider(<QuranReader surah={mockSurah} />);

            const ayatButton = screen.getByText('Ayat 1');
            fireEvent.click(ayatButton);

            expect(screen.getByPlaceholderText('1 - 3')).toBeInTheDocument();
            expect(screen.getByText('Pergi')).toBeInTheDocument();
        });

        it('should jump to specified ayat', async () => {
            renderWithProvider(<QuranReader surah={mockSurah} />);

            // Open jump input
            const ayatButton = screen.getByText('Ayat 1');
            fireEvent.click(ayatButton);

            // Type ayat number
            const input = screen.getByPlaceholderText('1 - 3');
            fireEvent.change(input, { target: { value: '3' } });

            // Click go button
            const goButton = screen.getByText('Pergi');
            fireEvent.click(goButton);

            await waitFor(() => {
                expect(screen.getByText(/خَافِضَةٌ رَّافِعَةٌ/)).toBeInTheDocument();
            });
        });
    });

    describe('Copy Feature', () => {
        it('should render copy button outside swipe area', () => {
            renderWithProvider(<QuranReader surah={mockSurah} />);

            const copyButton = screen.getByText('Salin Ayat');
            expect(copyButton).toBeInTheDocument();
        });

        it('should copy ayat to clipboard when clicking copy button', async () => {
            renderWithProvider(<QuranReader surah={mockSurah} />);

            const copyButton = screen.getByText('Salin Ayat');
            fireEvent.click(copyButton);

            await waitFor(() => {
                expect(navigator.clipboard.writeText).toHaveBeenCalled();
            });
        });
    });

    describe('Empty State', () => {
        it('should render placeholder when no surah is provided', () => {
            renderWithProvider(<QuranReader surah={null} />);

            expect(screen.getByText('Pilih surah pilihan untuk dibaca')).toBeInTheDocument();
        });
    });
});
