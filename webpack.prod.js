const path = require ("path");
const common = require("./webpack.common");
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "production",

  output: {
    // MD5 Hashing; ':8' limits hash to 8 characters
    filename: "[name].[contenthash:8].bundle.js",
    path: path.resolve(__dirname, "dist"),
    // Files from github repo-deploy branch are copied over to netlify with the main path as root.
    publicPath: '/',
    /*
    For github pages set:
    */
    // publicPath: '/GH-USERNAME.github.io/',
    pathinfo: false
  },

  module: {
    rules: [
      {
        // test: /\.s[ac]ss$/i,
        test: /\.css$/i, // IMPROVE BUILD TIME BY OMITTING SASS (1s)
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS into files
          "css-loader", // Translates CSS into valid JS ↑
          "postcss-loader", // Requires Tailwind.css ↑
          // "sass-loader" // Compiles SCSS into CSS ↑
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css"
    })
  ],
});
