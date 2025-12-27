// Doa-doa Harian
// Data doa sehari-hari dengan format yang sama seperti dzikir
// Sumber: Hisnul Muslim (Hisn al-Muslim) - Sa'id bin Ali bin Wahf Al-Qahthani

const doaData = {
    harian: [
        {
            id: 1,
            title: "Doa Sebelum Makan",
            arabic: "بِسْمِ اللهِ",
            latin: "Bismillah",
            translation: "Dengan nama Allah.",
            source: "HR. Abu Dawud dan At-Tirmidzi. Jika lupa membaca di awal, bacalah: بِسْمِ اللهِ أَوَّلَهُ وَآخِرَهُ (Bismillahi awwalahu wa akhirahu - Dengan nama Allah di awal dan di akhirnya)."
        },
        {
            id: 2,
            title: "Doa Sesudah Makan",
            arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
            latin: "Alhamdulillahil ladzi ath'amani hadza wa razaqanihi min ghairi haulin minni wa la quwwah",
            translation: "Segala puji bagi Allah yang telah memberiku makan ini dan memberiku rezeki tanpa daya dan kekuatan dariku.",
            source: "HR. Abu Dawud, Tirmidzi, dan Ibnu Majah. Barangsiapa membaca doa ini setelah makan, maka dosanya yang telah lalu akan diampuni."
        },
        {
            id: 3,
            title: "Doa Masuk Rumah",
            arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
            latin: "Bismillahi walajna, wa bismillahi kharajna, wa 'alallahi rabbina tawakkalna",
            translation: "Dengan nama Allah kami masuk, dengan nama Allah kami keluar, dan kepada Allah Rabb kami, kami bertawakal.",
            source: "HR. Abu Dawud. Kemudian hendaklah mengucapkan salam kepada keluarganya."
        },
        {
            id: 4,
            title: "Doa Keluar Rumah",
            arabic: "بِسْمِ اللهِ، تَوَكَّلْتُ عَلَى اللهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ",
            latin: "Bismillah, tawakkaltu 'alallah, la haula wa la quwwata illa billah",
            translation: "Dengan nama Allah, aku bertawakal kepada Allah, tidak ada daya dan kekuatan kecuali dengan pertolongan Allah.",
            source: "HR. Abu Dawud dan Tirmidzi. Akan dikatakan kepadanya: 'Engkau telah diberi kecukupan, dijaga, dan diberi petunjuk.' Dan setan pun menjauh darinya."
        },
        {
            id: 5,
            title: "Doa Masuk Masjid",
            arabic: "أَعُوذُ بِاللَّهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ. بِسْمِ اللهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللهِ، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
            latin: "A'udzu billahil 'azhim, wa biwajhihil karim, wa sulthanihil qadim, minasy syaithanir rajim. Bismillah, wash shalatu was salamu 'ala Rasulillah, Allahummaf tahli abwaba rahmatik",
            translation: "Aku berlindung kepada Allah Yang Maha Agung, dengan wajah-Nya Yang Mulia, dan kekuasaan-Nya yang kekal, dari setan yang terkutuk. Dengan nama Allah, shalawat dan salam semoga tercurah kepada Rasulullah. Ya Allah, bukakanlah pintu-pintu rahmat-Mu untukku.",
            source: "HR. Abu Dawud. Disunnahkan melangkahkan kaki kanan terlebih dahulu ketika masuk masjid."
        },
        {
            id: 6,
            title: "Doa Keluar Masjid",
            arabic: "بِسْمِ اللهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللهِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
            latin: "Bismillah, wash shalatu was salamu 'ala Rasulillah, Allahumma inni as'aluka min fadhlika",
            translation: "Dengan nama Allah, shalawat dan salam semoga tercurah kepada Rasulullah. Ya Allah, sesungguhnya aku memohon dari karunia-Mu.",
            source: "HR. Muslim dan Ibnu Majah. Disunnahkan melangkahkan kaki kiri terlebih dahulu ketika keluar masjid."
        },
        {
            id: 7,
            title: "Doa Sebelum Tidur",
            arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
            latin: "Bismika Allahumma amutu wa ahya",
            translation: "Dengan nama-Mu ya Allah, aku mati dan aku hidup.",
            source: "HR. Al-Bukhari dan Muslim. Tidur diibaratkan sebagai kematian kecil, dan bangun tidur diibaratkan sebagai kebangkitan."
        },
        {
            id: 8,
            title: "Doa Bangun Tidur",
            arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
            latin: "Alhamdulillahil ladzi ahyana ba'da ma amatana wa ilaihin nusyur",
            translation: "Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami, dan kepada-Nya kami dibangkitkan.",
            source: "HR. Al-Bukhari dan Muslim."
        },
        {
            id: 9,
            title: "Doa Ketika Hujan",
            arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
            latin: "Allahumma shayyiban nafi'a",
            translation: "Ya Allah, turunkanlah hujan yang bermanfaat.",
            source: "HR. Al-Bukhari."
        },
        {
            id: 10,
            title: "Doa Setelah Hujan",
            arabic: "مُطِرْنَا بِفَضْلِ اللَّهِ وَرَحْمَتِهِ",
            latin: "Muthirna bifadhlillahi wa rahmatihi",
            translation: "Kami diberi hujan karena karunia dan rahmat Allah.",
            source: "HR. Al-Bukhari dan Muslim."
        },
        {
            id: 11,
            title: "Doa Ketika Bersin",
            arabic: "الْحَمْدُ لِلَّهِ",
            latin: "Alhamdulillah",
            translation: "Segala puji bagi Allah.",
            source: "HR. Al-Bukhari. Yang mendengar hendaklah menjawab: يَرْحَمُكَ اللهُ (Yarhamukallah - Semoga Allah merahmatimu). Dan yang bersin menjawab: يَهْدِيكُمُ اللهُ وَيُصْلِحُ بَالَكُمْ (Yahdikumullahu wa yushlihu balakum - Semoga Allah memberi petunjuk dan memperbaiki keadaanmu)."
        },
        {
            id: 12,
            title: "Doa Menjenguk Orang Sakit",
            arabic: "لَا بَأْسَ، طَهُورٌ إِنْ شَاءَ اللهُ",
            latin: "La ba'sa, thahuurun insya Allah",
            translation: "Tidak mengapa (semoga menjadi pembersih dosa), suci insya Allah.",
            source: "HR. Al-Bukhari."
        },
        {
            id: 13,
            title: "Doa Memohon Kesembuhan",
            arabic: "اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَأْسَ، اشْفِهِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا",
            latin: "Allahumma Rabban nas, adzhibil ba's, isyfihi wa antasy syafi, la syifa'a illa syifa'uka, syifa'an la yughadiru saqama",
            translation: "Ya Allah, Rabb manusia, hilangkanlah penyakit, sembuhkanlah ia. Engkau adalah Dzat Yang Maha Menyembuhkan, tidak ada kesembuhan kecuali kesembuhan dari-Mu, kesembuhan yang tidak menyisakan penyakit.",
            source: "HR. Al-Bukhari dan Muslim."
        },
        {
            id: 14,
            title: "Doa Naik Kendaraan",
            arabic: "بِسْمِ اللهِ، الْحَمْدُ لِلَّهِ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
            latin: "Bismillah, Alhamdulillah, Subhanalladzi sakhkhara lana hadza wa ma kunna lahu muqrinin, wa inna ila rabbina lamunqalibun",
            translation: "Dengan nama Allah. Segala puji bagi Allah. Maha Suci Dzat yang telah menundukkan (kendaraan) ini bagi kami, padahal kami tidak mampu menguasainya. Dan sesungguhnya kami akan kembali kepada Rabb kami.",
            source: "HR. Muslim, Abu Dawud, dan Tirmidzi. Berdasarkan QS. Az-Zukhruf: 13-14."
        },
        {
            id: 15,
            title: "Doa Bepergian (Safar)",
            arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الْأَهْلِ",
            latin: "Allahumma inna nas'aluka fi safarina hadza al-birra wat-taqwa, wa minal 'amali ma tardha, Allahumma hawwin 'alaina safarana hadza wathwi 'anna bu'dahu, Allahumma antash shahibu fis safar, wal khalifatu fil ahli",
            translation: "Ya Allah, sesungguhnya kami memohon kepada-Mu dalam perjalanan kami ini kebaikan dan takwa, dan amalan yang Engkau ridhai. Ya Allah, mudahkanlah perjalanan kami ini dan dekatkanlah jaraknya. Ya Allah, Engkau adalah teman dalam perjalanan dan pengganti (yang menjaga) keluarga.",
            source: "HR. Muslim."
        },
        {
            id: 16,
            title: "Doa Masuk Kamar Mandi/WC",
            arabic: "بِسْمِ اللهِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
            latin: "Bismillah, Allahumma inni a'udzu bika minal khubutsi wal khaba'its",
            translation: "Dengan nama Allah. Ya Allah, sesungguhnya aku berlindung kepada-Mu dari setan laki-laki dan setan perempuan.",
            source: "HR. Al-Bukhari dan Muslim."
        },
        {
            id: 17,
            title: "Doa Keluar Kamar Mandi/WC",
            arabic: "غُفْرَانَكَ",
            latin: "Ghufranaka",
            translation: "Aku memohon ampunan-Mu.",
            source: "HR. Abu Dawud, Tirmidzi, dan Ibnu Majah."
        },
        {
            id: 18,
            title: "Doa Ketika Marah",
            arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
            latin: "A'udzu billahi minasy syaithanir rajim",
            translation: "Aku berlindung kepada Allah dari setan yang terkutuk.",
            source: "HR. Al-Bukhari dan Muslim. Rasulullah SAW bersabda: 'Aku mengetahui satu kalimat yang jika diucapkan oleh orang yang sedang marah, maka marahnya akan hilang. Kalimat itu adalah: A'udzu billahi minasy syaithanir rajim.'"
        },
        {
            id: 19,
            title: "Doa Ketika Memakai Pakaian Baru",
            arabic: "اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ، أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا صُنِعَ لَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ",
            latin: "Allahumma lakal hamdu anta kasautanihi, as'aluka min khairihi wa khairi ma shuni'a lahu, wa a'udzu bika min syarrihi wa syarri ma shuni'a lahu",
            translation: "Ya Allah, segala puji bagi-Mu, Engkau yang memakaikan pakaian ini kepadaku. Aku memohon kepada-Mu kebaikannya dan kebaikan untuk apa ia dibuat, dan aku berlindung kepada-Mu dari keburukannya dan keburukan untuk apa ia dibuat.",
            source: "HR. Abu Dawud dan Tirmidzi."
        },
        {
            id: 20,
            title: "Doa Ketika Bercermin",
            arabic: "اللَّهُمَّ أَنْتَ حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي",
            latin: "Allahumma anta hassanta khalqi fahassin khuluqi",
            translation: "Ya Allah, Engkau telah memperindah ciptaanku, maka perindah pula akhlakku.",
            source: "HR. Ahmad dan Ibnu Hibban."
        }
    ]
};

export default doaData;
