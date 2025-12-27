// Quran Data Index
// Export all available surahs

import alMulk from './al-mulk';
import alKahfi from './al-kahfi';
import yasin from './yasin';
import alWaqiah from './al-waqiah';

export const surahs = {
    'al-mulk': alMulk,
    'al-kahfi': alKahfi,
    'yasin': yasin,
    'al-waqiah': alWaqiah
};

export const surahList = [
    {
        id: 'al-mulk',
        name: 'Al-Mulk',
        nameArabic: 'الملك',
        meaning: 'Kerajaan',
        totalAyat: 30,
        type: 'Makkiyah',
        description: 'Surat yang disunnahkan dibaca setiap malam sebelum tidur sebagai perlindungan dari siksa kubur.',
        recommendedTime: 'Malam hari sebelum tidur',
        benefits: 'Perlindungan dari siksa kubur (HR. Abu Dawud, Tirmidzi, Nasa\'i)'
    },
    {
        id: 'al-kahfi',
        name: 'Al-Kahfi',
        nameArabic: 'الكهف',
        meaning: 'Gua',
        totalAyat: 110,
        displayAyat: 110, // Lengkap
        type: 'Makkiyah',
        description: 'Surat yang disunnahkan dibaca setiap hari Jumat. Membaca 10 ayat pertama memberikan perlindungan dari fitnah Dajjal.',
        recommendedTime: 'Hari Jumat',
        benefits: 'Perlindungan dari fitnah Dajjal (HR. Muslim)'
    },
    {
        id: 'yasin',
        name: 'Yasin',
        nameArabic: 'يس',
        meaning: 'Yasin',
        totalAyat: 83,
        displayAyat: 83, // Lengkap
        type: 'Makkiyah',
        description: 'Surat Yasin disebut sebagai jantung Al-Quran. Dianjurkan dibaca terutama bagi orang yang sedang sakit.',
        recommendedTime: 'Setiap saat',
        benefits: 'Jantung Al-Quran (HR. Tirmidzi)'
    },
    {
        id: 'al-waqiah',
        name: 'Al-Waqiah',
        nameArabic: 'الواقعة',
        meaning: 'Hari Kiamat',
        totalAyat: 96,
        displayAyat: 96, // Lengkap
        type: 'Makkiyah',
        description: 'Surat Al-Waqiah dinamakan Hari Kiamat. Dianjurkan dibaca setiap malam agar terhindar dari kefakiran.',
        recommendedTime: 'Malam hari',
        benefits: 'Terhindar dari kefakiran (HR. Baihaqi)'
    }
];

export const getSurah = (id) => surahs[id] || null;

export default { surahs, surahList, getSurah };
