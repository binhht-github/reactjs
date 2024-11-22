/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        flower: "url('/public/img/6622397.png')",
        flowerBG: "url('/public/img/bgFlower.jpg')",
        flowerTL: "url('/public/img/TL.png')",
        flowerTest: "url('/public/img/123.png')",
        contact3d: "url('/public/icon/3d-contact.png')",
        iconVocabulary: "url('/public/icon/vocabulary.png')",
        iconExample: "url('/public/icon/example.png')",
        iconHeadphone: "url('/public/icon/headphone.png')",
        iconReading: "url('/public/icon/reading.png')",
        iconSound: "url('/public/icon/sound.png')",
        iconTick: "url('/public/icon/tick.png')",
      },
      boxShadow: {
        rounded: "0px 0px 5px 1px rgba(0, 0, 0, 0.7)",
        roundedin: "0px 0px -10px rgba(0, 0, 0, 1)",
      },
      gridTemplateColumns: {
        result: "110px, 1fr, 1fr, 1fr, 1fr",
      },
    },
  },
  plugins: [],
};
