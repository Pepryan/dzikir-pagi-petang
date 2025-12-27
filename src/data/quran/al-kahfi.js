// Surat Al-Kahfi (18) - Ayat Pilihan (1-10 dan 101-110)
// Sumber: Quran.com, TafsirWeb.com, Kementerian Agama RI
// Keutamaan: Perlindungan dari fitnah Dajjal (HR. Muslim)
// Disunnahkan membaca ayat 1-10 atau 10 ayat terakhir di hari Jumat

const alKahfi = {
    id: 18,
    name: "Al-Kahfi",
    nameArabic: "الكهف",
    meaning: "Gua",
    type: "Makkiyah",
    totalAyat: 110,
    selectedAyat: "1-10, 101-110",
    description: "Surat Al-Kahfi bercerita tentang Ashabul Kahfi (pemuda-pemuda yang tidur di gua), kisah Nabi Musa dan Khidir, serta Dzulqarnain. Membaca 10 ayat pertama atau terakhir memberikan perlindungan dari fitnah Dajjal.",
    source: "Quran.com, TafsirWeb.com, Kementerian Agama RI",
    bismillah: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
    ayat: [
        // Ayat 1-10 (Perlindungan dari Dajjal)
        {
            number: 1,
            arabic: "اَلْحَمْدُ لِلّٰهِ الَّذِيْٓ اَنْزَلَ عَلٰى عَبْدِهِ الْكِتٰبَ وَلَمْ يَجْعَلْ لَّهٗ عِوَجًاۜ",
            latin: "Alhamdulillaahilladzii anzala 'alaa 'abdihil kitaaba walam yaj'al lahuu 'iwajaa",
            translation: "Segala puji bagi Allah yang telah menurunkan Kitab (Al-Qur'an) kepada hamba-Nya dan Dia tidak menjadikannya bengkok."
        },
        {
            number: 2,
            arabic: "قَيِّمًا لِّيُنْذِرَ بَأْسًا شَدِيْدًا مِّنْ لَّدُنْهُ وَيُبَشِّرَ الْمُؤْمِنِيْنَ الَّذِيْنَ يَعْمَلُوْنَ الصّٰلِحٰتِ اَنَّ لَهُمْ اَجْرًا حَسَنًاۙ",
            latin: "Qayyimal liyundzira ba'san syadiidam mil ladunhu wayubasysyiral mu'miniinal ladziina ya'maluunas shaalihaati anna lahum ajran hasanaa",
            translation: "Sebagai bimbingan yang lurus, untuk memperingatkan akan siksa yang sangat pedih dari sisi-Nya dan memberikan kabar gembira kepada orang-orang mukmin yang mengerjakan kebajikan bahwa mereka akan mendapat balasan yang baik."
        },
        {
            number: 3,
            arabic: "مَّاكِثِيْنَ فِيْهِ اَبَدًاۙ",
            latin: "Maakitsiina fiihi abadaa",
            translation: "Mereka kekal di dalamnya untuk selama-lamanya."
        },
        {
            number: 4,
            arabic: "وَيُنْذِرَ الَّذِيْنَ قَالُوا اتَّخَذَ اللّٰهُ وَلَدًاۗ",
            latin: "Wayundziralladziina qaaluuttakhadzallaahu waladaa",
            translation: "Dan untuk memperingatkan orang-orang yang berkata, \"Allah mengambil seorang anak.\""
        },
        {
            number: 5,
            arabic: "مَا لَهُمْ بِهٖ مِنْ عِلْمٍ وَّلَا لِاٰبَاۤىِٕهِمْ ۗ كَبُرَتْ كَلِمَةً تَخْرُجُ مِنْ اَفْوَاهِهِمْ ۗ اِنْ يَّقُوْلُوْنَ اِلَّا كَذِبًا",
            latin: "Maa lahum bihii min 'ilmiw wa laa li'aabaa'ihim, kaburat kalimatan takhruju min afwaahihim, iy yaquuluuna illaa kadzibaa",
            translation: "Mereka tidak mempunyai pengetahuan tentang hal itu, begitu pula nenek moyang mereka. Alangkah jeleknya kata-kata yang keluar dari mulut mereka. Mereka hanya mengatakan kebohongan belaka."
        },
        {
            number: 6,
            arabic: "فَلَعَلَّكَ بَاخِعٌ نَّفْسَكَ عَلٰٓى اٰثَارِهِمْ اِنْ لَّمْ يُؤْمِنُوْا بِهٰذَا الْحَدِيْثِ اَسَفًا",
            latin: "Fala'allaka baakhi'un nafsaka 'alaa aatsaarihim il lam yu'minuu bihaadzal hadiitsi asafaa",
            translation: "Maka barangkali engkau (Muhammad) akan mencelakakan dirimu karena bersedih hati setelah mereka berpaling, sekiranya mereka tidak beriman kepada keterangan ini (Al-Qur'an)."
        },
        {
            number: 7,
            arabic: "اِنَّا جَعَلْنَا مَا عَلَى الْاَرْضِ زِيْنَةً لَّهَا لِنَبْلُوَهُمْ اَيُّهُمْ اَحْسَنُ عَمَلًا",
            latin: "Innaa ja'alnaa maa 'alal ardhi ziinatal lahaa linabluwahum ayyuhum ahsanu 'amalaa",
            translation: "Sesungguhnya Kami telah menjadikan apa yang ada di bumi sebagai perhiasan baginya, untuk Kami menguji mereka, siapakah di antara mereka yang terbaik perbuatannya."
        },
        {
            number: 8,
            arabic: "وَاِنَّا لَجَاعِلُوْنَ مَا عَلَيْهَا صَعِيْدًا جُرُزًا",
            latin: "Wa innaa lajaa'iluuna maa 'alaihaa sha'iidan juruzaa",
            translation: "Dan Kami benar-benar akan menjadikan apa yang di atasnya (bumi itu) tanah yang tandus lagi kering."
        },
        {
            number: 9,
            arabic: "اَمْ حَسِبْتَ اَنَّ اَصْحٰبَ الْكَهْفِ وَالرَّقِيْمِۙ كَانُوْا مِنْ اٰيٰتِنَا عَجَبًا",
            latin: "Am hasibta anna ash-haabal kahfi warrahiimi kaanuu min aayaatinaa 'ajabaa",
            translation: "Ataukah engkau mengira bahwa orang-orang yang mendiami gua dan (penyembah) berhala, itu merupakan dari tanda-tanda (kekuasaan) Kami yang mengherankan?"
        },
        {
            number: 10,
            arabic: "اِذْ اَوَى الْفِتْيَةُ اِلَى الْكَهْفِ فَقَالُوْا رَبَّنَآ اٰتِنَا مِنْ لَّدُنْكَ رَحْمَةً وَّهَيِّئْ لَنَا مِنْ اَمْرِنَا رَشَدًا",
            latin: "Idz awal fityatu ilal kahfi faqaaluu rabbanaa aatinaa mil ladunka rahmataw wahayyi' lanaa min amrinaa rasyadaa",
            translation: "Ketika pemuda-pemuda itu berlindung ke dalam gua lalu mereka berdoa, \"Ya Tuhan kami, berikanlah rahmat kepada kami dari sisi-Mu dan sempurnakanlah petunjuk yang lurus bagi kami dalam urusan kami.\""
        },
        // Ayat 101-110 (Perlindungan dari Dajjal)
        {
            number: 101,
            arabic: "اَلَّذِيْنَ كَانَتْ اَعْيُنُهُمْ فِيْ غِطَاۤءٍ عَنْ ذِكْرِيْ وَكَانُوْا لَا يَسْتَطِيْعُوْنَ سَمْعًا",
            latin: "Alladziina kaanat a'yunuhum fii ghithaa'in 'an dzikrii wakaanuu laa yastathii'uuna sam'aa",
            translation: "Yaitu orang-orang yang tertutup mata (hatinya) dari memperhatikan tanda-tanda (kebesaran)-Ku dan adalah mereka tidak sanggup mendengar."
        },
        {
            number: 102,
            arabic: "اَفَحَسِبَ الَّذِيْنَ كَفَرُوْٓا اَنْ يَّتَّخِذُوْا عِبَادِيْ مِنْ دُوْنِيْٓ اَوْلِيَاۤءَ ۗ اِنَّآ اَعْتَدْنَا جَهَنَّمَ لِلْكٰفِرِيْنَ نُزُلًا",
            latin: "Afahasiballadzina kafaruu ay yattakhidzuu 'ibaadii min duunii auliyaa', innaa a'tadnaa jahannama lilkaafiriina nuzulaa",
            translation: "Maka apakah orang-orang kafir mengira bahwa mereka dapat menjadikan hamba-hamba-Ku sebagai penolong selain Aku? Sungguh, Kami telah sediakan neraka Jahanam tempat tinggal bagi orang-orang kafir."
        },
        {
            number: 103,
            arabic: "قُلْ هَلْ نُنَبِّئُكُمْ بِالْاَخْسَرِيْنَ اَعْمَالًاۗ",
            latin: "Qul hal nunabbi'ukum bil'akhsariina a'maalaa",
            translation: "Katakanlah (Muhammad), \"Apakah perlu Kami beritahukan kepadamu tentang orang yang paling rugi perbuatannya?\""
        },
        {
            number: 104,
            arabic: "اَلَّذِيْنَ ضَلَّ سَعْيُهُمْ فِى الْحَيٰوةِ الدُّنْيَا وَهُمْ يَحْسَبُوْنَ اَنَّهُمْ يُحْسِنُوْنَ صُنْعًا",
            latin: "Alladziina dhalla sa'yuhum fil hayaatid dunyaa wahum yahsabuuna annahum yuhsinuuna shun'aa",
            translation: "(Yaitu) orang yang sia-sia perbuatannya dalam kehidupan dunia, sedang mereka mengira telah berbuat sebaik-baiknya."
        },
        {
            number: 105,
            arabic: "اُولٰۤىِٕكَ الَّذِيْنَ كَفَرُوْا بِاٰيٰتِ رَبِّهِمْ وَلِقَاۤىِٕهٖ فَحَبِطَتْ اَعْمَالُهُمْ فَلَا نُقِيْمُ لَهُمْ يَوْمَ الْقِيٰمَةِ وَزْنًا",
            latin: "Ulaa'ikalladzina kafaruu bi'aayaati rabbihim wa liqaa'ihii fahabithat a'maaluhum falaa nuqiimu lahum yaumal qiyaamati waznaa",
            translation: "Mereka itu orang-orang yang ingkar terhadap ayat-ayat Tuhan dan pertemuan dengan-Nya, maka hapuslah amalan-amalan mereka, dan Kami tidak memberi nilai apa pun terhadap (amalan) mereka pada hari Kiamat."
        },
        {
            number: 106,
            arabic: "ذٰلِكَ جَزَاۤؤُهُمْ جَهَنَّمُ بِمَا كَفَرُوْا وَاتَّخَذُوْٓا اٰيٰتِيْ وَرُسُلِيْ هُزُوًا",
            latin: "Dzaalika jazaa'uhum jahannamu bimaa kafaruu wattakhadzuu aayaatii wa rusulii huzuwaa",
            translation: "Demikianlah balasan mereka yaitu neraka Jahanam, karena kekafiran mereka dan karena menjadikan ayat-ayat-Ku dan rasul-rasul-Ku sebagai olok-olokan."
        },
        {
            number: 107,
            arabic: "اِنَّ الَّذِيْنَ اٰمَنُوْا وَعَمِلُوا الصّٰلِحٰتِ كَانَتْ لَهُمْ جَنّٰتُ الْفِرْدَوْسِ نُزُلًاۙ",
            latin: "Innalladziina aamanuu wa'amilush shaalihaati kaanat lahum jannaatul firdausi nuzulaa",
            translation: "Sungguh, orang-orang yang beriman dan mengerjakan kebajikan, destinasi mereka adalah surga Firdaus."
        },
        {
            number: 108,
            arabic: "خٰلِدِيْنَ فِيْهَا لَا يَبْغُوْنَ عَنْهَا حِوَلًا",
            latin: "Khaalidiina fiihaa laa yabghuuna 'anhaa hiwallaa",
            translation: "Mereka kekal di dalamnya, tidak ingin pindah darinya."
        },
        {
            number: 109,
            arabic: "قُلْ لَّوْ كَانَ الْبَحْرُ مِدَادًا لِّكَلِمٰتِ رَبِّيْ لَنَفِدَ الْبَحْرُ قَبْلَ اَنْ تَنْفَدَ كَلِمٰتُ رَبِّيْ وَلَوْ جِئْنَا بِمِثْلِهٖ مَدَدًا",
            latin: "Qul lau kaanal bahru midaadal likalimaati rabbii lanafidal bahru qabla an tanfada kalimaatu rabbii walau ji'naa bimitslihii madadaa",
            translation: "Katakanlah (Muhammad), \"Seandainya lautan menjadi tinta untuk (menulis) kalimat-kalimat Tuhanku, tentu habislah lautan itu sebelum selesai (penulisan) kalimat-kalimat Tuhanku, meskipun Kami datangkan tambahan sebanyak itu (pula).\""
        },
        {
            number: 110,
            arabic: "قُلْ اِنَّمَآ اَنَا۠ بَشَرٌ مِّثْلُكُمْ يُوْحٰٓى اِلَيَّ اَنَّمَآ اِلٰهُكُمْ اِلٰهٌ وَّاحِدٌ ۚ فَمَنْ كَانَ يَرْجُوْا لِقَاۤءَ رَبِّهٖ فَلْيَعْمَلْ عَمَلًا صَالِحًا وَّلَا يُشْرِكْ بِعِبَادَةِ رَبِّهٖٓ اَحَدًا",
            latin: "Qul innamaa ana basyarum mitslukum yuuhaaa ilayya annamaa ilaahukum ilaahuw waahid, faman kaana yarjuu liqaa'a rabbihii falya'mal 'amalan shaalihaw wa laa yusyrik bi'ibaadati rabbihii ahadaa",
            translation: "Katakanlah (Muhammad), \"Sesungguhnya aku ini hanya seorang manusia seperti kamu, yang diwahyukan kepadaku bahwa Tuhan kamu itu adalah Tuhan Yang Esa.\" Barangsiapa mengharap perjumpaan dengan Tuhannya, maka hendaklah ia mengerjakan amal yang saleh dan janganlah ia mempersekutukan seorangpun dalam beribadah kepada Tuhannya."
        }
    ]
};

export default alKahfi;
