export default class AboutPage {
  async render() {
    return `
      <section class="about-container">
        <h1>About Page</h1>
        <p>
         Blog ini berisikan tentang perjalanan grup musik K-pop asal Korea Selatan, ATEEZ. ATEEZ (에이티즈) adalah grup yang dibentuk oleh KQ Entertainment. Mereka pertama kali diperkenalkan sebagai grup pre-debut yang disebut "KQ Fellaz" pada tahun 2018 sebelum resmi debut pada tanggal 24 Oktober 2018 dengan album mini pertama mereka yang berjudul "Treasure EP.1: All to Zero".

ATEEZ terdiri dari delapan anggota: Hongjoong, Seonghwa, Yunho, Yeosang, San, Mingi, Wooyoung, dan Jongho. Nama grup ini diambil dari kata "A to Z" yang melambangkan ambisi mereka untuk menjadi grup yang lengkap dan berbakat dalam segala hal, dari A hingga Z. Mereka dikenal dengan energi panggung yang kuat, tarian yang ciamik, serta musik yang beragam dari EDM hingga hip hop.
        </p>
      </section>
    `;
  }

  async afterRender() {
    //todo
  }
}
