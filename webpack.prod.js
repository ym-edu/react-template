const path = require("path");
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const purgecss = require('@fullhuman/postcss-purgecss');
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",

  output: {
    /* MD5 Hashing; ':8' limits hash to 8 characters */
    filename: "[name].[contenthash:8].bundle.js",
    path: path.resolve(__dirname, "dist"),
    /* Files from github repo-deploy branch are copied over to netlify's root. */
    publicPath: '/',
    /* For github pages set: */
    // publicPath: '/GH-USERNAME.github.io/',
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS into files
          "css-loader", // Translates CSS into valid JS ↑
          {
            /*
            Requires Tailwind.css ↑
            Uses autoprefixer for css browser compatibility
            Uses cssnano to minify purged output
            Purges html & js files for unused css
            */
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('tailwindcss'),
                  require('autoprefixer')({}),
                  require('cssnano')({ preset: 'default' }),
                  purgecss({
                    content: ['./src/**/*.html', './src/**/*.js'],
                  }),
                ],
              },
            },
          },
          "sass-loader", // Compiles SCSS into CSS ↑
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css"
    }),
  ],
});
