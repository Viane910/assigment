let ateez = [
  {
    id: 1,
    name: 'Hongjoong (Pacar Admin)',
    image: '/images/hj.jpeg',
  },
  {
    id: 2,
    name: 'Seonghwa',
    image: '/images/hwa.jpeg',
  },
  {
    id: 3,
    name: 'Jongho',
    image: '/images/jongho.jpeg',
  },
  {
    id: 4,
    name: 'Mingi',
    image: '/images/mingi.jpeg',
  },
  {
    id: 5,
    name: 'San',
    image: '/images/san.jpeg',
  },
  {
    id: 6,
    name: 'Wooyoung',
    image: '/images/woo.jpeg',
  },
  {
    id: 7,
    name: 'Yeosang',
    image: '/images/yeosang.jpeg',
  },
  {
    id: 8,
    name: 'Yunho',
    image: '/images/yunho.jpg',
  },
];

const AteezLocal = {
  async getAllMembers() {
    return [...ateez];
  },
};

export default AteezLocal;
