/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./*.html",        // all HTML files in project root
      "./*.js",          // all JS files in project root
      "./src/**/*.{html,js}"

    ],
    theme: {
      extend: {
        width: {
          '100': '25rem',  // 400px
          '104': '26rem',  // 416px
          '108': '27rem',  // 432px
          '112': '28rem',  // 448px
          '116': '29rem',  // 464px
          '120': '30rem',  // 480px
          '128': '32rem',  // 512px
          '136': '34rem',  // 544px
          '144': '36rem',  // 576px
          '152': '38rem',  // 608px
          '160': '40rem',  // 640px
          '168': '42rem',  // 672px
          '176': '44rem',  // 704px
          '184': '46rem',  // 736px
          '192': '48rem',  // 768px
          '200': '50rem',  // 800px
        },
        height: {
          '100': '25rem',
          '104': '26rem',
          '108': '27rem',
          '112': '28rem',
          '116': '29rem',
          '120': '30rem',
          '128': '32rem',
          '136': '34rem',
          '144': '36rem',
          '152': '38rem',
          '160': '40rem',
          '168': '42rem',
          '176': '44rem',
          '184': '46rem',
          '192': '48rem',
          '200': '50rem',
      },
    },
    plugins: [],
  }
}