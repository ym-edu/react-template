const path = require("path");
const merge = require('webpack-merge');
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",

  /*
  Produces replicas of the source file before build without the extra 'webpack_require' snippets.
  Useful for debugging purposes.
  Uncomment if needed (INCREASES BUILD TIME)
  */
  // devtool: "source-map",

  module: {
    rules: [
      {
        // webpack will scan for a s[ac]ss file imported in the index.js
        // test: /\.s[ac]ss$/i,
        test: /\.css$/i, // IMPROVE BUILD TIME BY OMITTING SASS (1s)
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          "style-loader", // Takes that translation and injects it through the DOM
          "css-loader", // Translates CSS into valid JS ↑
          "postcss-loader", // Requires Tailwind.css ↑
          // "sass-loader" // Compiles SCSS into CSS ↑
        ],
      },
    ],
  },
});
