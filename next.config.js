
const withPreact = require('@zeit/next-preact');
const withCSS = require('@zeit/next-css')
module.exports = withPreact(withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  webpack(config, options) {
    // you can optionally add custom Next.js webpack configuration here
    return config;
  }
}));
