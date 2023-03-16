const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        biblio: {
          200: "#295D91",
          400: "#1D426D",
          500: "#1A3A67",
        },
      },
    },
  },
  plugins: [],
});
