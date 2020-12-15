const merge = require('webpack-merge');
const purgecss = require('@fullhuman/postcss-purgecss');
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
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
          {
            /*
            Requires Tailwind.css ↑
            Purges html & js files for unused css
            */
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('tailwindcss'),
                  purgecss({
                    content: ['./src/**/*.html', './src/**/*.js']
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
});
