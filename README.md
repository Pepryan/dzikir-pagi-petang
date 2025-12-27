<div align="center">

# 📿 Daily Dzikr - Dzikir Pagi & Petang
# بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
## (Bismillahirrahmanirrahim - Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8?style=flat&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?style=flat&logo=vitest&logoColor=white)](https://vitest.dev/)

Aplikasi web modern untuk dzikir pagi dan petang dengan antarmuka yang bersih dan ramah pengguna.

# أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ
QS. Ar-Ra'd ayat 28
## (Alaa bidzikrillahi tathma'innul quluub - Ingatlah, hanya dengan mengingat Allah hati menjadi tenang)


[🌐 Lihat Demo](https://dzikirapp.my.id) | [🐛 Laporkan Bug](https://github.com/pepryan/dzikir-pagi-petang/issues) | [✨ Ajukan Fitur](https://github.com/pepryan/dzikir-pagi-petang/issues)

</div>

## ✨ Fitur Utama

- 🎨 **Antarmuka Modern**: 
  - Dibangun dengan Tailwind CSS v4 dan komponen shadcn/ui
  - Desain responsif yang elegan dan intuitif
  - Tema terang dan gelap yang dapat disesuaikan
  - Pilihan font Arab yang bervariasi

- 📱 **Optimasi Mobile**: 
  - Navigasi dengan gesture geser (swipe)
  - Tampilan yang responsif untuk semua ukuran layar
  - Pengalaman pengguna yang mulus di perangkat mobile
  - PWA (Progressive Web App) - dapat di-install sebagai aplikasi

- 📖 **Pembaca Al-Quran**:
  - Surah pilihan: Al-Mulk, Al-Kahfi, Yasin, Al-Waqiah
  - Navigasi dengan swipe (mobile) atau arrow keys (desktop)
  - Fitur jump-to-ayat untuk langsung ke ayat tertentu
  - Bookmark otomatis - melanjutkan dari posisi terakhir
  - Salin ayat ke clipboard
  - Progress bar dengan indikator persentase

- 🔄 **Fitur Pelacakan**: 
  - Progress bar visual untuk memantau kemajuan
  - Indikator navigasi yang intuitif
  - Penyimpanan progres otomatis
  - Mode penghitung (marker & counter)
  - Statistik dan streak harian

- 🤲 **Koleksi Doa**:
  - Doa-doa harian pilihan
  - Tampilan Arabic, Latin, dan terjemahan

- 💾 **Penyimpanan Data**: 
  - Menyimpan kemajuan dzikir secara otomatis
  - Pengaturan preferensi pengguna yang persisten
  - Data tersimpan di penyimpanan lokal browser
  - Dukungan offline dengan Service Worker

## 🛠️ Teknologi

| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| [React](https://reactjs.org/) | 19.x | Frontend Framework |
| [Vite](https://vitejs.dev/) | 6.x | Build Tool & Dev Server |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Utility-first CSS Framework |
| [shadcn/ui](https://ui.shadcn.com/) | - | Komponen UI (Radix UI) |
| [Framer Motion](https://www.framer.com/motion/) | 12.x | Animasi & Transisi |
| [Swiper](https://swiperjs.com/) | 11.x | Gesture Swipe Navigation |
| [Vitest](https://vitest.dev/) | 4.x | Unit Testing Framework |
| [Lucide React](https://lucide.dev/) | - | Icon Library |
| [Font Awesome](https://fontawesome.com/) | 6.x | Icon Library |

## 🚀 Memulai

### Prasyarat

- Node.js (versi 18 atau lebih baru)
- npm, yarn, atau pnpm

### Instalasi

1. Clone repositori:
   ```bash
   git clone https://github.com/pepryan/dzikir-pagi-petang.git
   cd dzikir-pagi-petang
   ```

2. Install dependensi:
   ```bash
   npm install
   ```

3. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```
   Server akan berjalan dengan fitur Hot Module Replacement (HMR) yang memungkinkan pembaruan instan saat kode diubah.

4. Buka browser dan akses `http://localhost:5173/`

### Script yang Tersedia

| Script | Deskripsi |
|--------|-----------|
| `npm run dev` | Menjalankan development server dengan HMR |
| `npm run build` | Build production ke folder `dist/` |
| `npm run preview` | Preview hasil build production |
| `npm run lint` | Menjalankan ESLint untuk pengecekan kode |
| `npm run test` | Menjalankan unit tests dengan Vitest (watch mode) |
| `npm run test:run` | Menjalankan unit tests sekali |

## 📦 Build dan Deployment

Aplikasi ini dikonfigurasi untuk deployment di Cloudflare Pages:

1. Build proyek:
   ```bash
   npm run build
   ```
   Proses build akan menghasilkan output teroptimasi dengan:
   - Code splitting otomatis
   - Minifikasi dan kompresi aset
   - Tree shaking untuk bundle yang lebih kecil
   - Lazy loading untuk komponen dialog

2. Deploy ke Cloudflare Pages:
   - Hubungkan repositori GitHub ke Cloudflare Pages
   - Atur build command: `npm run build`
   - Atur build output directory: `dist`
   - Custom domain: `dzikirapp.my.id`

## 📁 Struktur Proyek

```
dzikir-pagi-petang/
├── public/              # Static assets (icons, manifest, sw.js)
├── src/
│   ├── components/      # React components
│   │   └── ui/          # shadcn/ui components
│   ├── context/         # React context (DzikirContext)
│   ├── data/            # Data dzikir, doa, dan quran
│   │   └── quran/       # Data surah (al-mulk, al-kahfi, yasin, al-waqiah)
│   ├── lib/             # Utility functions
│   ├── test/            # Test setup
│   └── index.css        # Global styles & Tailwind config
├── index.html           # Entry HTML
├── vite.config.js       # Vite & Vitest configuration
└── tailwind.config.js   # Tailwind configuration
```

## 🧪 Testing

Aplikasi ini menggunakan Vitest untuk unit testing:

```bash
# Run tests in watch mode
npm run test

# Run tests once
npm run test:run
```

Test coverage mencakup:
- QuranReader component (navigation, completion state, jump-to-ayat, copy feature)
- DzikirContext (bookmark/last read functionality)

## 🤝 Kontribusi

Berikut cara untuk berkontribusi:

1. Fork repositori ini
2. Buat branch fitur (`git checkout -b fitur/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur/AmazingFeature`)
5. Buat Pull Request

### Panduan Kontribusi

- Pastikan kode mengikuti standar format yang ada
- Tambahkan unit tests untuk fitur baru
- Tambahkan komentar untuk kode yang kompleks
- Update dokumentasi jika diperlukan
- Test perubahan sebelum membuat PR

## 📝 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file [LICENSE](LICENSE) untuk detail.

## 🙏 Thanks to

- Inspirasi UI/UX dari berbagai aplikasi dzikir modern
- Sumber konten dzikir dari literatur Islam yang terpercaya | [Referensi](https://almanhaj.or.id/11518-dzikir-pagi-dan-petang.html)

---

<div align="center">

Dibuat dengan ❤️ oleh Febryan Ramadhan untuk Umat Muslim.
(جزاكم الله خيرا - Jazakumullahu khairan)

بَارَكَ اللهُ فِيكُمْ 

(Barakallahu fiikum - Semoga Allah memberkahimu)

**v3.1.1** | Desember 2025

</div>
