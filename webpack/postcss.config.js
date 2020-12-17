const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = (env) => {
  /* Test Env with: console.log('NODE_ENV', env.mode); */
  return {
    plugins: [
      require('tailwindcss'),
      env.mode === 'production' ? require('autoprefixer') : null,
      env.mode === 'production' ? require('cssnano')({ preset: 'default' }) : null,
      purgecss({
        content: ['./src/**/*.html', './src/**/*.js'],
      }),
    ],
  };
};
