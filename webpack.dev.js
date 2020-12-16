const merge = require('webpack-merge');
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development", // Sets env.mode to development

  /* Produces replicas of source files before build without the extra webpack_require snippets.
  Useful for debugging purposes.
  Increases build time */
  // devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          "style-loader", // Take that translation and inject it through the DOM
          "css-loader", // Translates CSS into valid JS ↑
          "postcss-loader",
          "sass-loader", // Compiles SCSS into CSS ↑
        ],
      },
    ],
  },
});
