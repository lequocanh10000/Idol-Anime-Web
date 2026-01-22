// data.ts

/* ===================== ROLE ===================== */
export const roles = [
  {
    name: 'ADMIN',
  },
  {
    name: 'USER',
  },
];

/* ===================== USER ===================== */
export const users = [
  {
    username: 'admin',
    email: 'admin@example.com',
    password: '123456',
    roleId: 1, // ADMIN
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: 'user',
    email: 'user@example.com',
    password: '123456',
    roleId: 2, // USER
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

/* ===================== ANIME ===================== */
export const animes = [
  {
    title: 'Love Live! School Idol Project',
    franchise: 'Love Live!',
    studio: 'Sunrise',
    releaseYear: 2013,
    posterUrl:
      'https://upload.wikimedia.org/wikipedia/en/8/8c/Love_Live_School_Idol_Project_key_visual.jpg',
    description:
      'Câu chuyện về nhóm nữ sinh trung học thành lập nhóm idol để cứu ngôi trường của mình.',
    idolType: 'School',
    animationType: 'TV',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'BanG Dream!',
    franchise: 'BanG Dream!',
    studio: 'ISSEN × Xebec',
    releaseYear: 2017,
    posterUrl:
      'https://upload.wikimedia.org/wikipedia/en/3/3f/BanG_Dream%21_key_visual.jpg',
    description:
      'Anime xoay quanh các ban nhạc nữ và ước mơ âm nhạc của họ.',
    idolType: 'Band',
    animationType: 'TV',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'The iDOLM@STER',
    franchise: 'The iDOLM@STER',
    studio: 'A-1 Pictures',
    releaseYear: 2011,
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2d/The_IDOLM@STER_anime_key_visual.png',
    description: 'Các cô gái trẻ cùng nhau theo đuổi ước mơ trở thành idol chuyên nghiệp.',
    idolType: 'Professional',
    animationType: 'TV',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Wake Up, Girls!',
    franchise: 'Wake Up, Girls!',
    studio: 'Ordet × Tatsunoko Production',
    releaseYear: 2014,
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Wake_Up_Girls%21_key_visual.png',
    description: 'Một nhóm idol mới thành lập ở Sendai vượt qua khó khăn để nổi tiếng.',
    idolType: 'School',
    animationType: 'TV',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Zombieland Saga',
    franchise: 'Zombieland Saga',
    studio: 'MAPPA',
    releaseYear: 2018,
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2b/Zombieland_Saga_key_visual.png',
    description: 'Bảy cô gái zombie lập nhóm idol để cứu tỉnh Saga.',
    idolType: 'School',
    animationType: 'TV',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Re:Stage! Dream Days♪',
    franchise: 'Re:Stage!',
    studio: 'Yumeta Company × Graphinica',
    releaseYear: 2019,
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/7/7e/ReStage_Dream_Days_key_visual.png',
    description: 'Những cô gái trung học cùng nhau hướng tới giải thưởng Prism Stage.',
    idolType: 'School',
    animationType: 'TV',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Vivy: Fluorite Eye’s Song',
    franchise: 'Vivy',
    studio: 'Wit Studio',
    releaseYear: 2021,
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Vivy_Fluorite_Eye%27s_Song_key_visual.png',
    description: 'AI ca sĩ Vivy chiến đấu để bảo vệ tương lai loài người bằng âm nhạc.',
    idolType: 'Virtual',
    animationType: 'TV',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

/* ===================== IDOL GROUP ===================== */
export const idolGroups = [
  {
    name: "μ's",
    description: 'Nhóm idol học đường của Otonokizaka.',
    animeId: 1, // Love Live!
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Poppin’Party',
    description: 'Ban nhạc nữ trung học đầy năng lượng.',
    animeId: 2, // BanG Dream!
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Afterglow',
    description: 'Ban nhạc nữ trung học với phong cách rock mạnh mẽ.',
    animeId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Pastel*Palettes',
    description: 'Ban nhạc idol với phong cách dễ thương, nổi bật bởi màu sắc pastel.',
    animeId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Roselia',
    description: 'Ban nhạc nữ với phong cách gothic và âm nhạc mạnh mẽ.',
    animeId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Hello, Happy World!',
    description: 'Ban nhạc mang lại niềm vui và tiếng cười cho mọi người.',
    animeId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'RAISE A SUILEN',
    description: 'Ban nhạc với phong cách hiện đại, mạnh mẽ và cá tính.',
    animeId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Morfonica',
    description: 'Ban nhạc nữ với âm nhạc kết hợp violin độc đáo.',
    animeId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // The iDOLM@STER
  {
    name: '765PRO ALLSTARS',
    description: 'Nhóm idol chính của 765 Production.',
    animeId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Project Fairy',
    description: 'Nhóm đối thủ bí ẩn.',
    animeId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Wake Up, Girls!
  {
    name: 'Wake Up, Girls!',
    description: 'Nhóm idol chính đến từ Sendai.',
    animeId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'I-1 Club',
    description: 'Nhóm idol nổi tiếng, đối thủ của WUG.',
    animeId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Zombieland Saga
  {
    name: 'Franchouchou',
    description: 'Nhóm idol zombie cứu tỉnh Saga.',
    animeId: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Iron Frill',
    description: 'Nhóm idol nổi tiếng thời còn sống.',
    animeId: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Re:Stage!
  {
    name: 'KiRaRe',
    description: 'Nhóm idol trung học hướng tới Prism Stage.',
    animeId: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'TROIS ANGES',
    description: 'Nhóm idol đối thủ mạnh.',
    animeId: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Vivy
  {
    name: 'Vivy',
    description: 'AI ca sĩ chính.',
    animeId: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'GraceNote',
    description: 'AI ca sĩ đối thủ.',
    animeId: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

/* ===================== CHARACTER ===================== */
export const characters = [
  {
    name: 'Honoka Kousaka',
    idolGroupId: 1, // μ's
    seiyuu: 'Emi Nitta',
    role: 'Leader',
    imageUrl:
      'https://static.wikia.nocookie.net/love-live/images/6/6a/Honoka.png',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Kasumi Toyama',
    idolGroupId: 2, // Poppin’Party
    seiyuu: 'Aimi',
    role: 'Vocal & Guitar',
    imageUrl:
      'https://static.wikia.nocookie.net/bang-dream/images/5/55/Aimi.png',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // BanG Dream! - Poppin’Party (id: 2)
    { name: 'Tae Hanazono', idolGroupId: 2, seiyuu: 'Saechi', role: 'Guitar', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Tae_Hanazono.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Rimi Ushigome', idolGroupId: 2, seiyuu: 'Rimi Nishimoto', role: 'Bass', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Rimi_Ushigome.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Saaya Yamabuki', idolGroupId: 2, seiyuu: 'Ayaka Ohashi', role: 'Drums', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Saaya_Yamabuki.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Arisa Ichigaya', idolGroupId: 2, seiyuu: 'Ayasa Itō', role: 'Keyboard', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Arisa_Ichigaya.png', createdAt: new Date(), updatedAt: new Date() },
  // Afterglow (id: 13)
    { name: 'Ran Mitake', idolGroupId: 3, seiyuu: 'Ayane Sakura', role: 'Vocal & Guitar', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Ran_Mitake.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Moca Aoba', idolGroupId: 3, seiyuu: 'Miku Itō', role: 'Guitar', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Moca_Aoba.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Himari Uehara', idolGroupId: 3, seiyuu: 'Emiri Katō', role: 'Bass', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Himari_Uehara.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Tomoe Udagawa', idolGroupId: 3, seiyuu: 'Yoko Hikasa', role: 'Drums', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Tomoe_Udagawa.png', createdAt: new Date(), updatedAt: new Date() },
  // Pastel*Palettes (id: 14)
    { name: 'Aya Maruyama', idolGroupId: 4, seiyuu: 'Ami Maeshima', role: 'Vocal', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Aya_Maruyama.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Hina Hikawa', idolGroupId: 4, seiyuu: 'Minori Suzuki', role: 'Guitar', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Hina_Hikawa.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Eve Wakamiya', idolGroupId: 4, seiyuu: 'Sawako Hata', role: 'Bass', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Eve_Wakamiya.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Maya Yamato', idolGroupId: 4, seiyuu: 'Ayasa Itō', role: 'Drums', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Maya_Yamato.png', createdAt: new Date(), updatedAt: new Date() },
  // Roselia (id: 15)
    { name: 'Yukina Minato', idolGroupId: 5, seiyuu: 'Aina Aiba', role: 'Vocal', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Yukina_Minato.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Sayo Hikawa', idolGroupId: 5, seiyuu: 'Kanon Shizaki', role: 'Guitar', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Sayo_Hikawa.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Lisa Imai', idolGroupId: 5, seiyuu: 'Yuki Nakashima', role: 'Bass', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Lisa_Imai.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Ako Udagawa', idolGroupId: 5, seiyuu: 'Megu Sakuragawa', role: 'Drums', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Ako_Udagawa.png', createdAt: new Date(), updatedAt: new Date() },
  // Hello, Happy World! (id: 16)
    { name: 'Kokoro Tsurumaki', idolGroupId: 6, seiyuu: 'Miku Itō', role: 'Vocal', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Kokoro_Tsurumaki.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Kaoru Seta', idolGroupId: 6, seiyuu: 'Azusa Tadokoro', role: 'Guitar', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Kaoru_Seta.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Hagumi Kitazawa', idolGroupId: 6, seiyuu: 'Yuriko Nishida', role: 'Bass', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Hagumi_Kitazawa.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Kanon Matsubara', idolGroupId: 6, seiyuu: 'Kanae Itō', role: 'Drums', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Kanon_Matsubara.png', createdAt: new Date(), updatedAt: new Date() },
  // RAISE A SUILEN (id: 17)
    { name: 'Layer', idolGroupId: 7, seiyuu: 'Raychell', role: 'Vocal & Bass', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Layer.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'LOCK', idolGroupId: 7, seiyuu: 'Reo Kurachi', role: 'Guitar', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/LOCK.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'MASKING', idolGroupId: 7, seiyuu: 'Natsume', role: 'Drums', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/MASKING.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'PAREO', idolGroupId: 7, seiyuu: 'Risa Tsumugi', role: 'Keyboard', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/PAREO.png', createdAt: new Date(), updatedAt: new Date() },
  // Morfonica (id: 18)
    { name: 'Mashiro Kurata', idolGroupId: 8, seiyuu: 'Amane Shindō', role: 'Vocal', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Mashiro_Kurata.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Touko Kirigaya', idolGroupId: 8, seiyuu: 'mika', role: 'Guitar', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Touko_Kirigaya.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Nanami Hiromachi', idolGroupId: 8, seiyuu: 'Shiori Sakurada', role: 'Bass', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Nanami_Hiromachi.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Tsukushi Futaba', idolGroupId: 8, seiyuu: 'mika', role: 'Drums', imageUrl: 'https://static.wikia.nocookie.net/bang-dream/images/2/2a/Tsukushi_Futaba.png', createdAt: new Date(), updatedAt: new Date() },
  // 765PRO ALLSTARS
    { name: 'Haruka Amami', idolGroupId: 9, seiyuu: 'Eriko Nakamura', role: 'Leader', imageUrl: 'https://static.wikia.nocookie.net/project-imas/images/2/2d/Haruka_Amami.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Chihaya Kisaragi', idolGroupId: 9, seiyuu: 'Asami Imai', role: 'Vocal', imageUrl: 'https://static.wikia.nocookie.net/project-imas/images/7/7d/Chihaya_Kisaragi.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Miki Hoshii', idolGroupId: 9, seiyuu: 'Akiko Hasegawa', role: 'Dancer', imageUrl: 'https://static.wikia.nocookie.net/project-imas/images/2/2e/Miki_Hoshii.png', createdAt: new Date(), updatedAt: new Date() },
  // Project Fairy
    { name: 'Hibiki Ganaha', idolGroupId: 10, seiyuu: 'Manami Numakura', role: 'Vocal', imageUrl: 'https://static.wikia.nocookie.net/project-imas/images/2/2a/Hibiki_Ganaha.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Takane Shijou', idolGroupId: 10, seiyuu: 'Yumi Hara', role: 'Vocal', imageUrl: 'https://static.wikia.nocookie.net/project-imas/images/2/2a/Takane_Shijou.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Miki Hoshii', idolGroupId: 10, seiyuu: 'Akiko Hasegawa', role: 'Dancer', imageUrl: 'https://static.wikia.nocookie.net/project-imas/images/2/2e/Miki_Hoshii.png', createdAt: new Date(), updatedAt: new Date() },
  // Wake Up, Girls!
    { name: 'Mayu Shimada', idolGroupId: 11, seiyuu: 'Mayu Yoshioka', role: 'Leader', imageUrl: 'https://static.wikia.nocookie.net/wakeupgirls/images/2/2a/Mayu_Shimada.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Airi Hayashida', idolGroupId: 11, seiyuu: 'Airi Eino', role: 'Vocal', imageUrl: 'https://static.wikia.nocookie.net/wakeupgirls/images/2/2a/Airi_Hayashida.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Minami Katayama', idolGroupId: 11, seiyuu: 'Minami Tanaka', role: 'Dancer', imageUrl: 'https://static.wikia.nocookie.net/wakeupgirls/images/2/2a/Minami_Katayama.png', createdAt: new Date(), updatedAt: new Date() },
  // I-1 Club
    { name: 'Shiho Iwazaki', idolGroupId: 12, seiyuu: 'Yoshino Aoyama', role: 'Leader', imageUrl: 'https://static.wikia.nocookie.net/wakeupgirls/images/2/2a/Shiho_Iwazaki.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Moka Suzuki', idolGroupId: 12, seiyuu: 'Moka Suzuki', role: 'Vocal', imageUrl: 'https://static.wikia.nocookie.net/wakeupgirls/images/2/2a/Moka_Suzuki.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Nanami Hisami', idolGroupId: 12, seiyuu: 'Nanami Yamashita', role: 'Dancer', imageUrl: 'https://static.wikia.nocookie.net/wakeupgirls/images/2/2a/Nanami_Hisami.png', createdAt: new Date(), updatedAt: new Date() },
  // Franchouchou
    { name: 'Sakura Minamoto', idolGroupId: 13, seiyuu: 'Kaede Hondo', role: 'Leader', imageUrl: 'https://static.wikia.nocookie.net/zombielandsaga/images/2/2a/Sakura_Minamoto.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Saki Nikaido', idolGroupId: 13, seiyuu: 'Asami Tano', role: 'Vocal', imageUrl: 'https://static.wikia.nocookie.net/zombielandsaga/images/2/2a/Saki_Nikaido.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Ai Mizuno', idolGroupId: 13, seiyuu: 'Risa Taneda', role: 'Dancer', imageUrl: 'https://static.wikia.nocookie.net/zombielandsaga/images/2/2a/Ai_Mizuno.png', createdAt: new Date(), updatedAt: new Date() },
  // Iron Frill
    { name: 'Shiori', idolGroupId: 14, seiyuu: 'Yuko Hara', role: 'Leader', imageUrl: 'https://static.wikia.nocookie.net/zombielandsaga/images/2/2a/Shiori.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Yuna', idolGroupId: 14, seiyuu: 'Yuna Yoshino', role: 'Vocal', imageUrl: 'https://static.wikia.nocookie.net/zombielandsaga/images/2/2a/Yuna.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Noa', idolGroupId: 14, seiyuu: 'Noa Tsurushima', role: 'Dancer', imageUrl: 'https://static.wikia.nocookie.net/zombielandsaga/images/2/2a/Noa.png', createdAt: new Date(), updatedAt: new Date() },
  // KiRaRe
    { name: 'Mana Shikimiya', idolGroupId: 15, seiyuu: 'Yuka Iwahashi', role: 'Leader', imageUrl: 'https://static.wikia.nocookie.net/restage/images/2/2a/Mana_Shikimiya.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Sayu Tsukisaka', idolGroupId: 15, seiyuu: 'Meemu Tachibana', role: 'Vocal', imageUrl: 'https://static.wikia.nocookie.net/restage/images/2/2a/Sayu_Tsukisaka.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Mizuha Ichikishima', idolGroupId: 15, seiyuu: 'Yuki Sorami', role: 'Dancer', imageUrl: 'https://static.wikia.nocookie.net/restage/images/2/2a/Mizuha_Ichikishima.png', createdAt: new Date(), updatedAt: new Date() },
  // TROIS ANGES
    { name: 'Yukino', idolGroupId: 16, seiyuu: 'Yukino Satsuki', role: 'Leader', imageUrl: 'https://static.wikia.nocookie.net/restage/images/2/2a/Yukino.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Miyu', idolGroupId: 16, seiyuu: 'Miyu Tomita', role: 'Vocal', imageUrl: 'https://static.wikia.nocookie.net/restage/images/2/2a/Miyu.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Ruka', idolGroupId: 16, seiyuu: 'Ruka Matsuda', role: 'Dancer', imageUrl: 'https://static.wikia.nocookie.net/restage/images/2/2a/Ruka.png', createdAt: new Date(), updatedAt: new Date() },
  // Vivy
    { name: 'Vivy', idolGroupId: 17, seiyuu: 'Atsumi Tanezaki', role: 'AI Singer', imageUrl: 'https://static.wikia.nocookie.net/vivy/images/2/2a/Vivy.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Estella', idolGroupId: 18, seiyuu: 'Youko Hikasa', role: 'AI Singer', imageUrl: 'https://static.wikia.nocookie.net/vivy/images/2/2a/Estella.png', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Grace', idolGroupId: 18, seiyuu: 'Rina Hidaka', role: 'AI Singer', imageUrl: 'https://static.wikia.nocookie.net/vivy/images/2/2a/Grace.png', createdAt: new Date(), updatedAt: new Date() },
];

/* ===================== SONG ===================== */
export const songs = [
  {
    title: 'Snow halation',
    artist: "μ's",
    type: 'Insert',
    animeId: 1, // Love Live!
    youtubeUrl: 'https://www.youtube.com/watch?v=vJ3jNTH2QL0',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Yes! BanG_Dream!',
    artist: "Poppin’Party",
    type: 'OP',
    animeId: 2, // BanG Dream!
    youtubeUrl: 'https://www.youtube.com/watch?v=1z0v0GzFC2k',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // The iDOLM@STER
  { title: 'READY!!', artist: '765PRO ALLSTARS', type: 'OP', animeId: 3, youtubeUrl: 'https://www.youtube.com/watch?v=IDOLM_READY', createdAt: new Date(), updatedAt: new Date() },
  { title: 'CHANGE!!!!', artist: '765PRO ALLSTARS', type: 'ED', animeId: 3, youtubeUrl: 'https://www.youtube.com/watch?v=IDOLM_CHANGE', createdAt: new Date(), updatedAt: new Date() },
  // Wake Up, Girls!
  { title: 'Tachiagare!', artist: 'Wake Up, Girls!', type: 'OP', animeId: 4, youtubeUrl: 'https://www.youtube.com/watch?v=WUG_TACHIAGARE', createdAt: new Date(), updatedAt: new Date() },
  { title: '7 Girls War', artist: 'Wake Up, Girls!', type: 'ED', animeId: 4, youtubeUrl: 'https://www.youtube.com/watch?v=WUG_7GIRLS', createdAt: new Date(), updatedAt: new Date() },
  // Zombieland Saga
  { title: 'Adabana Necromancy', artist: 'Franchouchou', type: 'OP', animeId: 5, youtubeUrl: 'https://www.youtube.com/watch?v=ZLS_ADABANA', createdAt: new Date(), updatedAt: new Date() },
  { title: 'Mezame Returner', artist: 'Franchouchou', type: 'ED', animeId: 5, youtubeUrl: 'https://www.youtube.com/watch?v=ZLS_MEZAME', createdAt: new Date(), updatedAt: new Date() },
  // Re:Stage!
  { title: 'Don’t think, smile!!', artist: 'KiRaRe', type: 'OP', animeId: 6, youtubeUrl: 'https://www.youtube.com/watch?v=RESTAGE_SMILE', createdAt: new Date(), updatedAt: new Date() },
  { title: 'Secret Dream', artist: 'KiRaRe', type: 'ED', animeId: 6, youtubeUrl: 'https://www.youtube.com/watch?v=RESTAGE_SECRET', createdAt: new Date(), updatedAt: new Date() },
  // Vivy
  { title: 'Sing My Pleasure', artist: 'Vivy', type: 'OP', animeId: 7, youtubeUrl: 'https://www.youtube.com/watch?v=VIVY_SING', createdAt: new Date(), updatedAt: new Date() },
  { title: 'Fluorite Eye’s Song', artist: 'Vivy', type: 'Insert', animeId: 7, youtubeUrl: 'https://www.youtube.com/watch?v=VIVY_FLUORITE', createdAt: new Date(), updatedAt: new Date() },
];
