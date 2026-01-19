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
];
