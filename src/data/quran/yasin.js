// Surat Yasin (36) - Ayat 1-20 (dari 83 ayat)
// Sumber: Quran.com, TafsirWeb.com, Kementerian Agama RI
// Surat Makkiyah - Jantung Al-Quran
// Keutamaan: Disebut sebagai jantung Al-Quran, dianjurkan dibaca untuk orang sakit dan yang sedang sakaratul maut

const yasin = {
    id: 36,
    name: "Yasin",
    nameArabic: "يس",
    meaning: "Yasin",
    type: "Makkiyah",
    totalAyat: 83,
    displayAyat: 83, // Lengkap
    description: "Surat Yasin disebut sebagai jantung Al-Quran. Dianjurkan untuk dibaca terutama bagi orang yang sedang sakit dan yang sedang menghadapi sakaratul maut.",
    source: "Quran.com, TafsirWeb.com, Kementerian Agama RI",
    bismillah: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
    ayat: [
        {
            number: 1,
            arabic: "يٰسۤ",
            latin: "Yaa Siin",
            translation: "Yaa Siin."
        },
        {
            number: 2,
            arabic: "وَالْقُرْاٰنِ الْحَكِيْمِۙ",
            latin: "Wal Qur'aanil hakiim",
            translation: "Demi Al-Qur'an yang penuh hikmah."
        },
        {
            number: 3,
            arabic: "اِنَّكَ لَمِنَ الْمُرْسَلِيْنَۙ",
            latin: "Innaka laminal mursaliin",
            translation: "Sungguh, engkau (Muhammad) adalah salah seorang dari rasul-rasul."
        },
        {
            number: 4,
            arabic: "عَلٰى صِرَاطٍ مُّسْتَقِيْمٍۗ",
            latin: "'Alaa shiraathim mustaqiim",
            translation: "(Yang berada) di atas jalan yang lurus."
        },
        {
            number: 5,
            arabic: "تَنْزِيْلَ الْعَزِيْزِ الرَّحِيْمِۙ",
            latin: "Tanziilal 'Aziizir Rahiim",
            translation: "(Sebagai wahyu) yang diturunkan oleh (Allah) Yang Mahaperkasa, Maha Penyayang."
        },
        {
            number: 6,
            arabic: "لِتُنْذِرَ قَوْمًا مَّآ اُنْذِرَ اٰبَاۤؤُهُمْ فَهُمْ غٰفِلُوْنَ",
            latin: "Litundzira qauman maa undzira aabaaa'uhum fahum ghaafiluun",
            translation: "Agar engkau memberi peringatan kepada kaum yang nenek moyangnya belum pernah diberi peringatan, karena itu mereka lalai."
        },
        {
            number: 7,
            arabic: "لَقَدْ حَقَّ الْقَوْلُ عَلٰٓى اَكْثَرِهِمْ فَهُمْ لَا يُؤْمِنُوْنَ",
            latin: "Laqad haqqal qaulu 'alaa aktsarihim fahum laa yu'minuun",
            translation: "Sungguh, pasti telah berlaku perkataan (ketentuan Allah) atas kebanyakan mereka, maka mereka tidak beriman."
        },
        {
            number: 8,
            arabic: "اِنَّا جَعَلْنَا فِيْٓ اَعْنَاقِهِمْ اَغْلٰلًا فَهِيَ اِلَى الْاَذْقَانِ فَهُمْ مُّقْمَحُوْنَ",
            latin: "Innaa ja'alnaa fii a'naaqihim aghlaalan fahiya ilal adzqaani fahum muqmahuun",
            translation: "Sungguh, Kami telah memasang belenggu di leher mereka, lalu tangan mereka (diangkat) ke dagu, sehingga mereka tengadah."
        },
        {
            number: 9,
            arabic: "وَجَعَلْنَا مِنْۢ بَيْنِ اَيْدِيْهِمْ سَدًّا وَّمِنْ خَلْفِهِمْ سَدًّا فَاَغْشَيْنٰهُمْ فَهُمْ لَا يُبْصِرُوْنَ",
            latin: "Waja'alnaa mim baini aidiihim saddaw wamin khalfihim saddan fa aghsyainaahum fahum laa yubshiruun",
            translation: "Dan Kami jadikan di hadapan mereka dinding dan di belakang mereka dinding (pula), dan Kami tutup (mata) mereka sehingga mereka tidak dapat melihat."
        },
        {
            number: 10,
            arabic: "وَسَوَاۤءٌ عَلَيْهِمْ ءَاَنْذَرْتَهُمْ اَمْ لَمْ تُنْذِرْهُمْ لَا يُؤْمِنُوْنَ",
            latin: "Wasawaa'un 'alaihim a'andzartahum am lam tundzirhum laa yu'minuun",
            translation: "Dan sama saja bagi mereka, apakah engkau memberi peringatan kepada mereka atau engkau tidak memberi peringatan kepada mereka, mereka tidak akan beriman."
        },
        {
            number: 11,
            arabic: "اِنَّمَا تُنْذِرُ مَنِ اتَّبَعَ الذِّكْرَ وَخَشِيَ الرَّحْمٰنَ بِالْغَيْبِۚ فَبَشِّرْهُ بِمَغْفِرَةٍ وَّاَجْرٍ كَرِيْمٍ",
            latin: "Innamaa tundziru manit taba'adz dzikra wa khasyiyar rahmaana bilghaib, fabasysyirhu bimaghfiratiw wa ajrin kariim",
            translation: "Sesungguhnya engkau hanya memberi peringatan kepada orang-orang yang mau mengikuti peringatan dan takut kepada Tuhan Yang Maha Pengasih, walaupun tidak dapat melihat-Nya. Maka berilah dia kabar gembira dengan ampunan dan pahala yang mulia."
        },
        {
            number: 12,
            arabic: "اِنَّا نَحْنُ نُحْىِ الْمَوْتٰى وَنَكْتُبُ مَا قَدَّمُوْا وَاٰثَارَهُمْۗ وَكُلَّ شَيْءٍ اَحْصَيْنٰهُ فِيْٓ اِمَامٍ مُّبِيْنٍ",
            latin: "Innaa nahnu nuhyil mautaa wa naktubu maa qaddamuu wa aatsaarahum, wa kulla syai'in ahshainaahu fii imaamim mubiin",
            translation: "Sungguh, Kamilah yang menghidupkan orang-orang yang mati, dan Kami menuliskan apa yang telah mereka kerjakan dan bekas-bekas yang mereka tinggalkan. Dan segala sesuatu Kami kumpulkan dalam Kitab Induk yang nyata (Lauh Mahfuz)."
        },
        {
            number: 13,
            arabic: "وَاضْرِبْ لَهُمْ مَّثَلًا اَصْحٰبَ الْقَرْيَةِ ۘاِذْ جَاۤءَهَا الْمُرْسَلُوْنَ",
            latin: "Wadhrib lahum matsalan ash-haabal qaryah, idz jaa'ahal mursaluun",
            translation: "Dan buatlah suatu perumpamaan bagi mereka, yaitu penduduk suatu negeri ketika utusan-utusan datang kepada mereka."
        },
        {
            number: 14,
            arabic: "اِذْ اَرْسَلْنَآ اِلَيْهِمُ اثْنَيْنِ فَكَذَّبُوْهُمَا فَعَزَّزْنَا بِثَالِثٍ فَقَالُوْٓا اِنَّآ اِلَيْكُمْ مُّرْسَلُوْنَ",
            latin: "Idz arsalnaaa ilaihimutsnaini fakadzdzabuuhumaa fa'azzaznaa bitsaalitsin faqaaluuu innaaa ilaikum mursaluun",
            translation: "(Yaitu) ketika Kami mengutus kepada mereka dua orang utusan, lalu mereka mendustakan keduanya; kemudian Kami perkuat dengan (utusan) yang ketiga, lalu mereka (para utusan itu) berkata, \"Sungguh, kami adalah orang-orang yang diutus kepadamu.\""
        },
        {
            number: 15,
            arabic: "قَالُوْا مَآ اَنْتُمْ اِلَّا بَشَرٌ مِّثْلُنَا وَمَآ اَنْزَلَ الرَّحْمٰنُ مِنْ شَيْءٍ اِنْ اَنْتُمْ اِلَّا تَكْذِبُوْنَ",
            latin: "Qaaluu maaa antum illaa basyarum mitslunaa wa maaa anzalar rahmaanu min syai'in in antum illaa takdzibuun",
            translation: "Mereka (penduduk negeri) berkata, \"Kamu hanyalah manusia biasa seperti kami, dan (Tuhan) Yang Maha Pengasih tidak menurunkan sesuatu pun; kamu hanyalah pendusta belaka.\""
        },
        {
            number: 16,
            arabic: "قَالُوْا رَبُّنَا يَعْلَمُ اِنَّآ اِلَيْكُمْ لَمُرْسَلُوْنَ",
            latin: "Qaaluu rabbunaa ya'lamu innaaa ilaikum lamursaluun",
            translation: "Mereka (para utusan) berkata, \"Tuhan kami mengetahui bahwa Kami sungguh diutus kepadamu.\""
        },
        {
            number: 17,
            arabic: "وَمَا عَلَيْنَآ اِلَّا الْبَلٰغُ الْمُبِيْنُ",
            latin: "Wa maa 'alainaaa illal balaghul mubiin",
            translation: "Dan kewajiban kami hanyalah menyampaikan (perintah Allah) dengan jelas.\""
        },
        {
            number: 18,
            arabic: "قَالُوْٓا اِنَّا تَطَيَّرْنَا بِكُمْۚ لَىِٕنْ لَّمْ تَنْتَهُوْا لَنَرْجُمَنَّكُمْ وَلَيَمَسَّنَّكُمْ مِّنَّا عَذَابٌ اَلِيْمٌ",
            latin: "Qaaluuu innaa tathaiyanaa bikum la'il lam tantahuu lanarjumannakum wa layamasannakum minnaa 'adzaabun aliim",
            translation: "Mereka (penduduk negeri) berkata, \"Sungguh, kami bernasib malang karena kamu. Sungguh, jika kamu tidak berhenti (menyeru kami), niscaya kami rajam kamu dan kamu pasti akan mendapat siksaan yang pedih dari kami.\""
        },
        {
            number: 19,
            arabic: "قَالُوْا طٰۤىِٕرُكُمْ مَّعَكُمْۗ اَئِنْ ذُكِّرْتُمْ ۗبَلْ اَنْتُمْ قَوْمٌ مُّسْرِفُوْنَ",
            latin: "Qaaluu thaaa'irukum ma'akum, a'in dzukkirtum, bal antum qaumum musrifuun",
            translation: "Mereka (para utusan) berkata, \"Kemalangan kamu itu ada pada dirimu sendiri. Apakah karena kamu diberi peringatan? Bahkan kamu adalah kaum yang melampaui batas.\""
        },
        {
            number: 20,
            arabic: "وَجَاۤءَ مِنْ اَقْصَا الْمَدِيْنَةِ رَجُلٌ يَّسْعٰى قَالَ يٰقَوْمِ اتَّبِعُوا الْمُرْسَلِيْنَ",
            latin: "Wa jaaa'a min aqshal madiinati rajuluny yas'aa qaala yaa qaumit tabi'ul mursaliin",
            translation: "Dan datanglah seorang laki-laki dari ujung kota dengan bergegas, dia berkata, \"Wahai kaumku! Ikutilah para utusan itu.\""
        },
        {
            number: 21,
            arabic: "اتَّبِعُوْا مَنْ لَّا يَسْـَٔلُكُمْ اَجْرًا وَّهُمْ مُّهْتَدُوْنَ",
            latin: "Ittabi'uu mal laa yas'alukum ajraw wa hum muhtaduun",
            translation: "Ikutilah orang yang tidak meminta imbalan kepadamu; dan mereka adalah orang-orang yang mendapat petunjuk."
        },
        {
            number: 22,
            arabic: "وَمَا لِيَ لَآ اَعْبُدُ الَّذِيْ فَطَرَنِيْ وَاِلَيْهِ تُرْجَعُوْنَ",
            latin: "Wa maa liya laa a'budul ladzii fatharanii wa ilaihi turja'uun",
            translation: "Dan tidak ada alasan bagiku untuk tidak menyembah (Allah) yang telah menciptakanku dan hanya kepada-Nya-lah kamu (semua) akan dikembalikan."
        },
        {
            number: 23,
            arabic: "ءَاَتَّخِذُ مِنْ دُوْنِهٖٓ اٰلِهَةً اِنْ يُّرِدْنِ الرَّحْمٰنُ بِضُرٍّ لَّا تُغْنِ عَنِّيْ شَفَاعَتُهُمْ شَيْـًٔا وَّلَا يُنْقِذُوْنِ",
            latin: "A attakhidzu min duunihii aalihatan iy yuridnir rahmaanu bidhurril laa tughni 'annii syafaa'atuhum syai'aw wa laa yunqidzuun",
            translation: "Mengapa aku akan menyembah tuhan-tuhan selain-Nya? Jika (Allah) Yang Maha Pengasih menghendaki bencana terhadapku, pasti pertolongan mereka tidak berguna sama sekali bagi diriku dan mereka (juga) tidak dapat menyelamatkanku."
        },
        {
            number: 24,
            arabic: "اِنِّيْٓ اِذًا لَّفِيْ ضَلٰلٍ مُّبِيْنٍ",
            latin: "Innii idzal lafii dhalaalim mubiin",
            translation: "Sesungguhnya aku kalau begitu pasti berada dalam kesesatan yang nyata."
        },
        {
            number: 25,
            arabic: "اِنِّيْٓ اٰمَنْتُ بِرَبِّكُمْ فَاسْمَعُوْنِ",
            latin: "Innii aamantu birabbikum fasma'uun",
            translation: "Sesungguhnya aku telah beriman kepada Tuhanmu; maka dengarkanlah (pengakuan keimanan)ku."
        },
        {
            number: 26,
            arabic: "قِيْلَ ادْخُلِ الْجَنَّةَ ۗقَالَ يٰلَيْتَ قَوْمِيْ يَعْلَمُوْنَۙ",
            latin: "Qiiladkhulil jannah, qaala yaa laita qaumii ya'lamuun",
            translation: "Dikatakan (kepadanya), \"Masuklah ke surga.\" Dia (laki-laki itu) berkata, \"Alangkah baiknya sekiranya kaumku mengetahui.\""
        },
        {
            number: 27,
            arabic: "بِمَا غَفَرَ لِيْ رَبِّيْ وَجَعَلَنِيْ مِنَ الْمُكْرَمِيْنَ",
            latin: "Bimaa ghafaralii rabbii wa ja'alanii minal mukramiin",
            translation: "Apa yang menyebabkan Tuhanku memberi ampun kepadaku dan menjadikan aku termasuk orang-orang yang dimuliakan.\""
        },
        {
            number: 28,
            arabic: "وَمَآ اَنْزَلْنَا عَلٰى قَوْمِهٖ مِنْۢ بَعْدِهٖ مِنْ جُنْدٍ مِّنَ السَّمَاۤءِ وَمَا كُنَّا مُنْزِلِيْنَ",
            latin: "Wa maa anzalnaa 'alaa qaumihii mim ba'dihii min jundim minas samaa'i wa maa kunnaa munziliin",
            translation: "Dan Kami tidak menurunkan kepada kaumnya sesudah dia (meninggal) suatu pasukan pun dari langit dan tidak layak Kami menurunkannya."
        },
        {
            number: 29,
            arabic: "اِنْ كَانَتْ اِلَّا صَيْحَةً وَّاحِدَةً فَاِذَا هُمْ خٰمِدُوْنَ",
            latin: "In kaanat illaa shaihatan waahidatan fa idzaa hum khaamiduun",
            translation: "Tidak ada siksaan atas mereka melainkan satu teriakan suara saja; maka tiba-tiba mereka semuanya mati."
        },
        {
            number: 30,
            arabic: "يٰحَسْرَةً عَلَى الْعِبَادِ ۚمَا يَأْتِيْهِمْ مِّنْ رَّسُوْلٍ اِلَّا كَانُوْا بِهٖ يَسْتَهْزِءُوْنَ",
            latin: "Yaa hasratan 'alal 'ibaad, maa ya'tiihim mir rasuulin illaa kaanuu bihii yastahzi'uun",
            translation: "Alangkah besarnya penyesalan terhadap hamba-hamba itu, tiada datang seorang rasul pun kepada mereka melainkan mereka selalu memperolok-olokkannya."
        },
        {
            number: 31,
            arabic: "اَلَمْ يَرَوْا كَمْ اَهْلَكْنَا قَبْلَهُمْ مِّنَ الْقُرُوْنِ اَنَّهُمْ اِلَيْهِمْ لَا يَرْجِعُوْنَ",
            latin: "Alam yaraw kam ahlaknaa qablahum minal quruuni annahum ilaihim laa yarji'uun",
            translation: "Tidakkah mereka mengetahui berapa banyaknya umat-umat sebelum mereka yang telah Kami binasakan. Orang-orang (yang telah Kami binasakan) itu tidak ada yang kembali kepada mereka."
        },
        {
            number: 32,
            arabic: "وَاِنْ كُلٌّ لَّمَّا جَمِيْعٌ لَّدَيْنَا مُحْضَرُوْنَ",
            latin: "Wa in kullul lammaa jamii'ul ladainaa muhdaruun",
            translation: "Dan setiap (umat), semuanya akan dikumpulkan (menghadap) kepada Kami."
        },
        {
            number: 33,
            arabic: "وَاٰيَةٌ لَّهُمُ الْاَرْضُ الْمَيْتَةُ ۖاَحْيَيْنٰهَا وَاَخْرَجْنَا مِنْهَا حَبًّا فَمِنْهُ يَأْكُلُوْنَ",
            latin: "Wa aayatul lahumul ardhul maitatu ahyainaahaa wa akhrajnaa minhaa habban faminhu ya'kuluun",
            translation: "Dan suatu tanda (kebesaran Allah) bagi mereka adalah bumi yang mati (tandus). Kami hidupkan bumi itu dan Kami keluarkan darinya biji-bijian, maka dari (biji-bijian) itu mereka makan."
        },
        {
            number: 34,
            arabic: "وَجَعَلْنَا فِيْهَا جَنّٰتٍ مِّنْ نَّخِيْلٍ وَّاَعْنَابٍ وَّفَجَّرْنَا فِيْهَا مِنَ الْعُيُوْنِۙ",
            latin: "Wa ja'alnaa fiihaa jannaatim min nakhiiliw wa a'naabiw wa fajjarnaa fiihaa minal 'uyuun",
            translation: "Dan Kami jadikan padanya kebun-kebun kurma dan anggur dan Kami pancarkan padanya beberapa mata air."
        },
        {
            number: 35,
            arabic: "لِيَأْكُلُوْا مِنْ ثَمَرِهٖ ۙوَمَا عَمِلَتْهُ اَيْدِيْهِمْ ۗاَفَلَا يَشْكُرُوْنَ",
            latin: "Liya'kuluu min tsamarihii wa maa 'amilathu aidiihim, afalaa yasykuruun",
            translation: "Agar mereka dapat makan dari buahnya, dan dari apa yang diusahakan oleh tangan mereka. Maka mengapakah mereka tidak bersyukur?"
        },
        {
            number: 36,
            arabic: "سُبْحٰنَ الَّذِيْ خَلَقَ الْاَزْوَاجَ كُلَّهَا مِمَّا تُنْۢبِتُ الْاَرْضُ وَمِنْ اَنْفُسِهِمْ وَمِمَّا لَا يَعْلَمُوْنَ",
            latin: "Subhaanal ladzii khalaqal azwaaja kullahaa mimmaa tumbitul ardhu wa min anfusihim wa mimmaa laa ya'lamuun",
            translation: "Maha Suci (Allah) yang telah menciptakan pasangan-pasangan semuanya, baik dari apa yang ditumbuhkan oleh bumi dan dari diri mereka sendiri, maupun dari apa yang tidak mereka ketahui."
        },
        {
            number: 37,
            arabic: "وَاٰيَةٌ لَّهُمُ الَّيْلُ ۖنَسْلَخُ مِنْهُ النَّهَارَ فَاِذَا هُمْ مُّظْلِمُوْنَ",
            latin: "Wa aayatul lahumul lailu naslakhu minhun nahaara fa idzaa hum mudhlimuun",
            translation: "Dan suatu tanda (kebesaran Allah) bagi mereka adalah malam; Kami tanggalkan siang dari (malam) itu, maka seketika mereka berada dalam kegelapan."
        },
        {
            number: 38,
            arabic: "وَالشَّمْسُ تَجْرِيْ لِمُسْتَقَرٍّ لَّهَاۗ ذٰلِكَ تَقْدِيْرُ الْعَزِيْزِ الْعَلِيْمِ",
            latin: "Wasy syamsu tajrii limustaqarril lahaa, dzaalika taqdirul 'aziizil 'aliim",
            translation: "Dan matahari berjalan di tempat peredarannya. Demikianlah ketetapan (Allah) Yang Maha Perkasa, Maha Mengetahui."
        },
        {
            number: 39,
            arabic: "وَالْقَمَرَ قَدَّرْنٰهُ مَنَازِلَ حَتّٰى عَادَ كَالْعُرْجُوْنِ الْقَدِيْمِ",
            latin: "Wal qamara qaddarnaahu manaazila hattaa 'aada kal 'urjuunil qadiim",
            translation: "Dan telah Kami tetapkan tempat peredaran bagi bulan, sehingga (setelah ia sampai ke tempat peredaran yang terakhir) kembalilah ia seperti bentuk tandan yang tua."
        },
        {
            number: 40,
            arabic: "لَا الشَّمْسُ يَنْۢبَغِيْ لَهَآ اَنْ تُدْرِكَ الْقَمَرَ وَلَا الَّيْلُ سَابِقُ النَّهَارِۗ وَكُلٌّ فِيْ فَلَكٍ يَّسْبَحُوْنَ",
            latin: "Lasy syamsu yambaghii lahaa an tudrikal qamara wa lal lailu saabiqun nahaar, wa kullun fii falakiy yasbahuun",
            translation: "Tidaklah mungkin bagi matahari mengejar bulan dan malam pun tidak dapat mendahului siang. Masing-masing beredar pada garis edarnya."
        },
        {
            number: 41,
            arabic: "وَاٰيَةٌ لَّهُمْ اَنَّا حَمَلْنَا ذُرِّيَّتَهُمْ فِى الْفُلْكِ الْمَشْحُوْنِ",
            latin: "Wa aayatul lahum annaa hamalnaa dzurriyyatahum fil fulkil masyhun",
            translation: "Dan suatu tanda (kebesaran Allah) bagi mereka adalah bahwa Kami angkut keturunan mereka dalam bahtera yang penuh muatan."
        },
        {
            number: 42,
            arabic: "وَخَلَقْنَا لَهُمْ مِّنْ مِّثْلِهٖ مَا يَرْكَبُوْنَ",
            latin: "Wa khalaqnaa lahum mim mitslihii maa yarkabuun",
            translation: "Dan Kami ciptakan untuk mereka (angkutan lain) seperti bahtera itu yang mereka kendarai."
        },
        {
            number: 43,
            arabic: "وَاِنْ نَّشَأْ نُغْرِقْهُمْ فَلَا صَرِيْخَ لَهُمْ وَلَا هُمْ يُنْقَذُوْنَ",
            latin: "Wa in nasya' nughriqhum falaa shariikha lahum wa laa hum yunqadzuun",
            translation: "Dan jika Kami menghendaki, niscaya Kami tenggelamkan mereka, maka tidak ada penolong bagi mereka dan tidak (pula) mereka diselamatkan."
        },
        {
            number: 44,
            arabic: "اِلَّا رَحْمَةً مِّنَّا وَمَتَاعًا اِلٰى حِيْنٍ",
            latin: "Illaa rahmatam minnaa wa mataa'an ilaa hiin",
            translation: "Tetapi (Kami selamatkan mereka) karena rahmat yang besar dari Kami dan untuk memberikan kesenangan hidup sampai waktu tertentu."
        },
        {
            number: 45,
            arabic: "وَاِذَا قِيْلَ لَهُمُ اتَّقُوْا مَا بَيْنَ اَيْدِيْكُمْ وَمَا خَلْفَكُمْ لَعَلَّكُمْ تُرْحَمُوْنَ",
            latin: "Wa idzaa qiila lahumuttaquu maa baina aidiikum wa maa khalfakum la'allakum turhamuun",
            translation: "Dan apabila dikatakan kepada mereka, 'Takutlah kamu akan siksa yang di hadapanmu dan yang di belakangmu agar kamu mendapat rahmat,' (niscaya mereka berpaling)."
        },
        {
            number: 46,
            arabic: "وَمَا تَأْتِيْهِمْ مِّنْ اٰيَةٍ مِّنْ اٰيٰتِ رَبِّهِمْ اِلَّا كَانُوْا عَنْهَا مُعْرِضِيْنَ",
            latin: "Wa maa ta'tiihim min aayatim min aayaati rabbihim illaa kaanuu 'anhaa mu'ridhiin",
            translation: "Dan tidak ada suatu tanda pun dari tanda-tanda (kebesaran) Tuhan yang datang kepada mereka, melainkan mereka selalu berpaling darinya."
        },
        {
            number: 47,
            arabic: "وَاِذَا قِيْلَ لَهُمْ اَنْفِقُوْا مِمَّا رَزَقَكُمُ اللّٰهُ قَالَ الَّذِيْنَ كَفَرُوْا لِلَّذِيْنَ اٰمَنُوْا اَنُطْعِمُ مَنْ لَّوْ يَشَآءُ اللّٰهُ اَطْعَمَهُ ۗاِنْ اَنْتُمْ اِلَّا فِيْ ضَلٰلٍ مُّبِيْنٍ",
            latin: "Wa idzaa qiila lahum anfiquu mimmaa razaqakumullahu qaalal ladziina kafaruu lillladziina aamanuu anut'imu mal law yasyaa'ullaahu ath'amahu, in antum illaa fii dhalaalim mubiin",
            translation: "Dan apabila dikatakan kepada mereka, 'Infakkanlah sebagian rezeki yang diberikan Allah kepadamu,' orang-orang kafir itu berkata kepada orang-orang beriman, 'Apakah kami harus memberi makan kepada orang yang jika Allah menghendaki Dia akan memberinya makan? Kamu benar-benar dalam kesesatan yang nyata.'"
        },
        {
            number: 48,
            arabic: "وَيَقُوْلُوْنَ مَتٰى هٰذَا الْوَعْدُ اِنْ كُنْتُمْ صٰدِقِيْنَ",
            latin: "Wa yaquuluuna mataa haadzal wa'du in kuntum shaadiqiin",
            translation: "Dan mereka berkata, 'Kapan (terjadinya) janji ini, jika kamu orang-orang yang benar?'"
        },
        {
            number: 49,
            arabic: "مَا يَنْظُرُوْنَ اِلَّا صَيْحَةً وَّاحِدَةً تَأْخُذُهُمْ وَهُمْ يَخِصِّمُوْنَ",
            latin: "Maa yanzhuruuna illaa shaihatan waahidatan ta'khudzuhum wa hum yakhissimuun",
            translation: "Mereka hanya menunggu satu teriakan keras yang akan membinasakan mereka, ketika mereka sedang bertengkar."
        },
        {
            number: 50,
            arabic: "فَلَا يَسْتَطِيْعُوْنَ تَوْصِيَةً وَّلَآ اِلٰىٓ اَهْلِهِمْ يَرْجِعُوْنَ",
            latin: "Falaa yastathii'uuna taushiyatan wa laaa ilaa ahlihim yarji'uun",
            translation: "Maka mereka tidak mampu membuat suatu wasiat pun dan tidak (pula) dapat kembali kepada keluarganya."
        },
        {
            number: 51,
            arabic: "وَنُفِخَ فِي الصُّوْرِ فَاِذَا هُمْ مِّنَ الْاَجْدَاثِ اِلٰى رَبِّهِمْ يَنْسِلُوْنَ",
            latin: "Wa nufikha fish shuuri fa idzaa hum minal ajdaatsi ilaa rabbihim yansiluun",
            translation: "Dan ditiuplah sangkakala, maka tiba-tiba mereka keluar dengan segera dari kuburnya (menuju) kepada Tuhan mereka."
        },
        {
            number: 52,
            arabic: "قَالُوْا يٰوَيْلَنَا مَنۢ بَعَثَنَا مِنْ مَّرْقَدِنَا ۜهٰذَا مَا وَعَدَ الرَّحْمٰنُ وَصَدَقَ الْمُرْسَلُوْنَ",
            latin: "Qaaluu yaa wailanaa mam ba'atsanaa mim marqadinaa, haadzaa maa wa'adar rahmaanu wa shadaqal mursaluun",
            translation: "Mereka berkata, 'Celakalah kami! Siapakah yang membangkitkan kami dari tempat tidur kami (kubur)?' Inilah yang dijanjikan (Allah) Yang Maha Pengasih dan benarlah rasul-rasul(-Nya)."
        },
        {
            number: 53,
            arabic: "اِنْ كَانَتْ اِلَّا صَيْحَةً وَّاحِدَةً فَاِذَا هُمْ جَمِيْعٌ لَّدَيْنَا مُحْضَرُوْنَ",
            latin: "In kaanat illaa shaihatan waahidatan fa idzaa hum jamii'ul ladainaa muhdaruun",
            translation: "Tidak ada teriakan itu selain sekali teriakan saja, maka tiba-tiba mereka semua dikumpulkan kepada Kami."
        },
        {
            number: 54,
            arabic: "فَالْيَوْمَ لَا تُظْلَمُ نَفْسٌ شَيْـًٔا وَلَا تُجْزَوْنَ اِلَّا مَا كُنْتُمْ تَعْمَلُوْنَ",
            latin: "Fal yauma laa tuzhlamu nafsun syai'an wa laa tujzauna illaa maa kuntum ta'maluun",
            translation: "Maka pada hari itu seseorang tidak akan dirugikan sedikit pun dan kamu tidak diberi balasan kecuali sesuai dengan apa yang telah kamu kerjakan."
        },
        {
            number: 55,
            arabic: "اِنَّ اَصْحٰبَ الْجَنَّةِ الْيَوْمَ فِيْ شُغُلٍ فٰكِهُوْنَ",
            latin: "Inna ashaabal jannatil yauma fii syughulin faakihuun",
            translation: "Sesungguhnya penghuni surga pada hari itu bersenang-senang dalam kesibukan (mereka)."
        },
        {
            number: 56,
            arabic: "هُمْ وَاَزْوَاجُهُمْ فِيْ ظِلٰلٍ عَلَى الْاَرَآىِكِ مُتَّكِـُٔوْنَ",
            latin: "Hum wa azwaajuhum fii zhilaalin 'alal araaa'iki muttaki'uun",
            translation: "Mereka dan pasangan-pasangan mereka berada dalam tempat yang teduh, bersandar di atas dipan-dipan."
        },
        {
            number: 57,
            arabic: "لَهُمْ فِيْهَا فَاكِهَةٌ وَّلَهُمْ مَّا يَدَّعُوْنَۚ",
            latin: "Lahum fiihaa faakihatuw wa lahum maa yadda'uun",
            translation: "Di surga itu mereka memperoleh buah-buahan dan memperoleh apa yang mereka minta."
        },
        {
            number: 58,
            arabic: "سَلٰمٌ قَوْلًا مِّنْ رَّبٍّ رَّحِيْمٍ",
            latin: "Salaamun qaulam mir rabbir rahiim",
            translation: "(Kepada mereka dikatakan), 'Salam,' sebagai ucapan selamat dari Tuhan Yang Maha Penyayang."
        },
        {
            number: 59,
            arabic: "وَامْتَازُوا الْيَوْمَ اَيُّهَا الْمُجْرِمُوْنَ",
            latin: "Wamtaazul yauma ayyuhal mujrimuun",
            translation: "Dan (dikatakan kepada orang-orang kafir), 'Berpisahlah kamu (dari orang-orang mukmin) pada hari ini, wahai orang-orang yang berdosa!'"
        },
        {
            number: 60,
            arabic: "اَلَمْ اَعْهَدْ اِلَيْكُمْ يٰبَنِيْٓ اٰدَمَ اَنْ لَّا تَعْبُدُوا الشَّيْطٰنَ ۘاِنَّهُ لَكُمْ عَدُوٌّ مُّبِيْنٌ",
            latin: "Alam a'had ilaikum yaa baniii aadama al laa ta'budus syaithaana innahuu lakum 'aduwwum mubiin",
            translation: "Bukankah Aku telah memerintahkan kepadamu, wahai anak cucu Adam, agar kamu tidak menyembah setan? Sungguh, setan itu musuh yang nyata bagimu."
        },
        {
            number: 61,
            arabic: "وَاَنِ اعْبُدُوْنِيْ ۗهٰذَا صِرَاطٌ مُّسْتَقِيْمٌ",
            latin: "Wa ani'buduunii, haadzaa shiraathum mustaqiim",
            translation: "Dan hendaklah kamu menyembah-Ku. Inilah jalan yang lurus."
        },
        {
            number: 62,
            arabic: "وَلَقَدْ اَضَلَّ مِنْكُمْ جِبِلًّا كَثِيْرًا ۗاَفَلَمْ تَكُوْنُوْا تَعْقِلُوْنَ",
            latin: "Wa laqad adhalla minkum jibillan katsiiraa, afalam takuunuu ta'qiluun",
            translation: "Dan sungguh, ia (setan) telah menyesatkan sebagian besar di antara kamu. Maka apakah kamu tidak mengerti?"
        },
        {
            number: 63,
            arabic: "هٰذِهٖ جَهَنَّمُ الَّتِيْ كُنْتُمْ تُوْعَدُوْنَ",
            latin: "Haadzihii jahannamul latii kuntum tuu'aduun",
            translation: "Inilah (neraka) Jahannam yang dahulu kamu diancam (dengannya)."
        },
        {
            number: 64,
            arabic: "اِصْلَوْهَا الْيَوْمَ بِمَا كُنْتُمْ تَكْفُرُوْنَ",
            latin: "Ishlauhal yauma bimaa kuntum takfuruun",
            translation: "Masuklah ke dalamnya pada hari ini disebabkan dahulu kamu mengingkarinya."
        },
        {
            number: 65,
            arabic: "اَلْيَوْمَ نَخْتِمُ عَلٰىٓ اَفْوَاهِهِمْ وَتُكَلِّمُنَآ اَيْدِيْهِمْ وَتَشْهَدُ اَرْجُلُهُمْ بِمَا كَانُوْا يَكْسِبُوْنَ",
            latin: "Al yauma nakhtimu 'alaa afwaahihim wa tukallimunaa aidiihim wa tasyhadu arjuluhum bimaa kaanuu yaksibuun",
            translation: "Pada hari ini Kami tutup mulut mereka; dan berkatalah kepada Kami tangan mereka dan memberi kesaksian kaki mereka terhadap apa yang dahulu mereka kerjakan."
        },
        {
            number: 66,
            arabic: "وَلَوْ نَشَآءُ لَطَمَسْنَا عَلٰىٓ اَعْيُنِهِمْ فَاسْتَبَقُوا الصِّرَاطَ فَاَنّٰى يُبْصِرُوْنَ",
            latin: "Wa lau nasyaa'u lathamasnaa 'alaa a'yunihim fastabaqush shiraatha fa annaa yubshiruun",
            translation: "Dan jika Kami menghendaki, pastilah Kami hapuskan penglihatan mata mereka; lalu mereka berlomba-lomba (mencari) jalan. Maka bagaimana mereka dapat melihat(nya)?"
        },
        {
            number: 67,
            arabic: "وَلَوْ نَشَآءُ لَمَسَخْنٰهُمْ عَلٰى مَكَانَتِهِمْ فَمَا اسْتَطَاعُوْا مُضِيًّا وَّلَا يَرْجِعُوْنَ",
            latin: "Wa lau nasyaa'u lamasakhnaa hum 'alaa makaanatihim famaa istathaa'uu mudhiyyan wa laa yarji'uun",
            translation: "Dan jika Kami menghendaki, pastilah Kami ubah mereka di tempat mereka berada; maka mereka tidak sanggup berjalan lagi dan tidak (pula) sanggup kembali."
        },
        {
            number: 68,
            arabic: "وَمَنْ نُّعَمِّرْهُ نُنَكِّسْهُ فِى الْخَلْقِ ۗاَفَلَا يَعْقِلُوْنَ",
            latin: "Wa man nu'ammirhu nunakkishu fil khalqi, afalaa ya'qiluun",
            translation: "Dan barang siapa yang Kami panjangkan umurnya, niscaya Kami kembalikan dia kepada kejadian(nya). Maka apakah mereka tidak mengerti?"
        },
        {
            number: 69,
            arabic: "وَمَا عَلَّمْنٰهُ الشِّعْرَ وَمَا يَنْۢبَغِيْ لَهُ ۗاِنْ هُوَ اِلَّا ذِكْرٌ وَّقُرْاٰنٌ مُّبِيْنٌۙ",
            latin: "Wa maa 'allamnaahus syi'ra wa maa yambaghii lahu, in huwa illaa dzikruw wa qur'aanum mubiin",
            translation: "Dan Kami tidak mengajarkan syair kepadanya (Muhammad) dan bersyair itu tidak pantas baginya. Al-Quran itu tidak lain hanyalah peringatan dan kitab yang jelas."
        },
        {
            number: 70,
            arabic: "لِيُنْذِرَ مَنْ كَانَ حَيًّا وَّيَحِقَّ الْقَوْلُ عَلَى الْكٰفِرِيْنَ",
            latin: "Liyundzira man kaana hayyan wa yahiqqal qaulu 'alal kaafiriin",
            translation: "Agar dia (Muhammad) memberi peringatan kepada orang-orang yang hidup (hatinya) dan agar pastilah (ketetapan azab) terhadap orang-orang kafir."
        },
        {
            number: 71,
            arabic: "اَوَلَمْ يَرَوْا اَنَّا خَلَقْنَا لَهُمْ مِمَّا عَمِلَتْ اَيْدِيْنَآ اَنْعَامًا فَهُمْ لَهَا مٰلِكُوْنَ",
            latin: "Awalam yaraw annaa khalaqnaa lahum mimmaa 'amilat aidiinaa an'aaman fahum lahaa maalikuun",
            translation: "Dan tidakkah mereka melihat bahwa Kami telah menciptakan hewan ternak untuk mereka, yaitu sebagian dari apa yang telah Kami ciptakan dengan kekuasaan Kami, lalu mereka menguasainya?"
        },
        {
            number: 72,
            arabic: "وَذَلَّلْنٰهَا لَهُمْ فَمِنْهَا رَكُوْبُهُمْ وَمِنْهَا يَأْكُلُوْنَ",
            latin: "Wa dzallalnaahaa lahum faminhaa rakuubuhum wa minhaa ya'kuluun",
            translation: "Dan Kami menundukkannya (hewan-hewan itu) untuk mereka; lalu sebagiannya untuk menjadi tunggangan mereka dan sebagian untuk mereka makan."
        },
        {
            number: 73,
            arabic: "وَلَهُمْ فِيْهَا مَنَافِعُ وَمَشَارِبُ ۗاَفَلَا يَشْكُرُوْنَ",
            latin: "Wa lahum fiihaa manaafi'u wa masyaaribu, afalaa yasykuruun",
            translation: "Dan mereka memperoleh berbagai manfaat dan minuman darinya. Maka mengapa mereka tidak bersyukur?"
        },
        {
            number: 74,
            arabic: "وَاتَّخَذُوْا مِنْ دُوْنِ اللّٰهِ اٰلِهَةً لَّعَلَّهُمْ يُنْصَرُوْنَ",
            latin: "Wattakhadzuu min duunillaahi aalihatal la'allahum yunsharuun",
            translation: "Dan mereka mengambil sesembahan selain Allah, agar mereka mendapat pertolongan."
        },
        {
            number: 75,
            arabic: "لَا يَسْتَطِيْعُوْنَ نَصْرَهُمْ ۖوَهُمْ لَهُمْ جُنْدٌ مُّحْضَرُوْنَ",
            latin: "Laa yastathii'uuna nashrahum wa hum lahum jundum muhdaruun",
            translation: "Mereka (sesembahan itu) tidak dapat menolong mereka; padahal mereka menjadi tentara yang disiapkan untuk menjaga (sesembahan) itu."
        },
        {
            number: 76,
            arabic: "فَلَا يَحْزُنْكَ قَوْلُهُمْ ۘاِنَّا نَعْلَمُ مَا يُسِرُّوْنَ وَمَا يُعْلِنُوْنَ",
            latin: "Falaa yahzunka qauluhum, innaa na'lamu maa yusirruuna wa maa yu'linuun",
            translation: "Maka jangan sampai ucapan mereka membuat engkau (Muhammad) bersedih hati. Sungguh, Kami mengetahui apa yang mereka rahasiakan dan apa yang mereka nyatakan."
        },
        {
            number: 77,
            arabic: "اَوَلَمْ يَرَ الْاِنْسَانُ اَنَّا خَلَقْنٰهُ مِنْ نُّطْفَةٍ فَاِذَا هُوَ خَصِيْمٌ مُّبِيْنٌ",
            latin: "Awalam yaral insaanu annaa khalaqnaahu min nuthfatin fa idzaa huwa khasiimum mubiin",
            translation: "Dan tidakkah manusia memperhatikan bahwa Kami menciptakannya dari setitik air (mani), maka tiba-tiba ia menjadi penantang yang nyata!"
        },
        {
            number: 78,
            arabic: "وَضَرَبَ لَنَا مَثَلًا وَنَسِيَ خَلْقَهُ ۗقَالَ مَنْ يُّحْیِ الْعِظَامَ وَهِيَ رَمِيْمٌ",
            latin: "Wa dharaba lanaa matsalaw wa nasiya khalqahu, qaala may yuhyil 'izhaama wa hiya ramiim",
            translation: "Dan ia membuat perumpamaan bagi Kami dan dia lupa kepada asal kejadiannya; ia berkata, 'Siapakah yang dapat menghidupkan tulang belulang, yang telah hancur luluh?'"
        },
        {
            number: 79,
            arabic: "قُلْ يُحْيِيْهَا الَّذِيْٓ اَنْشَاَهَآ اَوَّلَ مَرَّةٍ ۗوَهُوَ بِكُلِّ خَلْقٍ عَلِيْمٌ",
            latin: "Qul yuhyiihal ladzii ansya'ahaa awwala marrah, wa huwa bikulli khalqin 'aliim",
            translation: "Katakanlah, 'Ia akan dihidupkan oleh (Allah) yang menciptakannya pertama kali. Dan Dia Maha Mengetahui tentang segala makhluk.'"
        },
        {
            number: 80,
            arabic: "الَّذِيْ جَعَلَ لَكُمْ مِّنَ الشَّجَرِ الْاَخْضَرِ نَارًا فَاِذَآ اَنْتُمْ مِّنْهُ تُوْقِدُوْنَ",
            latin: "Alladzii ja'ala lakum minasy syajaril akhdhari naaran fa idzaa antum minhu tuuqiduun",
            translation: "Yaitu (Allah) yang menjadikan api untukmu dari kayu yang hijau, maka seketika itu kamu nyalakan (api) dari kayu itu."
        },
        {
            number: 81,
            arabic: "اَوَلَيْسَ الَّذِيْ خَلَقَ السَّمٰوٰتِ وَالْاَرْضَ بِقٰدِرٍ عَلٰىٓ اَنْ يَّخْلُقَ مِثْلَهُمْ ۘبَلٰى وَهُوَ الْخَلّٰقُ الْعَلِيْمُ",
            latin: "Awalaisal ladzii khalaqas samaawaati wal ardha biqaadirin 'alaa ay yakhluqa mitslahum, balaa wa huwal khallaaqul 'aliim",
            translation: "Dan bukankah (Allah) yang menciptakan langit dan bumi, mampu menciptakan kembali (makhluk) seperti mereka? Tentu mampu! Dan Dialah Yang Maha Pencipta, Maha Mengetahui."
        },
        {
            number: 82,
            arabic: "اِنَّمَآ اَمْرُهُٓ اِذَآ اَرَادَ شَيْـًٔا اَنْ يَّقُوْلَ لَهُ كُنْ فَيَكُوْنُ",
            latin: "Innamaaa amruhuu idzaa araada syai'an ay yaquula lahuu kun fayakuun",
            translation: "Sesungguhnya urusan-Nya apabila Dia menghendaki sesuatu, Dia hanya berkata kepadanya, 'Jadilah!' Maka jadilah sesuatu itu."
        },
        {
            number: 83,
            arabic: "فَسُبْحٰنَ الَّذِيْ بِيَدِهٖ مَلَكُوْتُ كُلِّ شَيْءٍ وَاِلَيْهِ تُرْجَعُوْنَ",
            latin: "Fasubhaanal ladzii biyadihii malakuutu kulli syai'in wa ilaihi turja'uun",
            translation: "Maka Maha Suci (Allah) yang di tangan-Nya kekuasaan atas segala sesuatu, dan kepada-Nya kamu dikembalikan."
        }
    ]
};

export default yasin;
