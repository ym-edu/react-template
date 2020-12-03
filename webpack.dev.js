const path = require ("path");
const common = require("./webpack.common");
const merge = require('webpack-merge');

module.exports = merge(common, {
  mode: "development",

  // Produces replicas of the source file before build without the extra webpack_require snippets.
  // Useful for debugging purposes.
  devtool: "source-map",

  module: {
    rules: [
      {
        // webpack will come across the css file by importing it in the index.js
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader", // Take that translation and inject it through the DOM
          "css-loader", // Translates CSS into valid JS ↑
          "sass-loader" // Compiles SCSS into CSS ↑
        ],
      },
    ],
  },

  output: {
    filename: "[name].bundle.js", // MD5 Hashing; ':8' limits hash to 8 characters
    path: path.resolve(__dirname, "dist"),
    publicPath: ''
  },
});