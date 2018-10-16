
const withTypescript = require("@zeit/next-typescript");
module.exports = withTypescript({
  webpack(config, options) {
    // you can optionally add custom Next.js webpack configuration here.
    return config;
  },
});
