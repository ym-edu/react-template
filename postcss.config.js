const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')({}),
    // process.env.NODE_ENV === 'production' ? require('autoprefixer') : null,
    require('cssnano')({ preset: 'default' }),
    // process.env.NODE_ENV === 'production' ? require('cssnano')({ preset: 'default' }) : null,
    purgecss({
      content: ['./src/**/*.html', './src/**/*.js'],
    }),
  ],
};
