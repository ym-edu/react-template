const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  /* This makes use of Object Syntax, the most scalable way of defining entries. */
  entry: {
    /* Entry points pertaining to their respective environment concerns. */
    main: "./src/index.js",
    // vendor: "./src/vendor.js"
  },

  module: {
    rules: [
      {
        test: /\.html$/i,
        exclude: /node_modules/,
        use: ["html-loader"],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/i,
        exclude: /node_modules/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash:8].[ext]",
            outputPath: "assets",
            esModule: false,
          },
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
  ],
};
