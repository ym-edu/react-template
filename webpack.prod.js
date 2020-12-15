const path = require("path");
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const purgecss = require('@fullhuman/postcss-purgecss');
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",

  output: {
    filename: "[name].[contenthash:8].bundle.js", // MD5 Hashing; ':8' limits hash to 8 characters
    path: path.resolve(__dirname, "dist"),
    // Files from github repo-deploy branch are copied over to netlify with the main path as root.
    publicPath: '/',
    // For github pages set:
    // publicPath: '/GH-USERNAME.github.io/',
  },

  module: {
    rules: [
      {
        // webpack will come across the css file by importing it in the index.js
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS into files
          "css-loader", // Translates CSS into valid JS ↑
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('tailwindcss'),
                  require('autoprefixer')({}),
                  require('cssnano')({ preset: 'default' }),
                  purgecss({
                    content: ['./src/**/*.html', './src/**/*.js']
                  })
                ],
                // minimize: true
              },
            },
          },
          // "postcss-loader", // Requires Tailwind.css ↑
          "sass-loader" // Compiles SCSS into CSS ↑
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
