const isDev = process.env.NODE_ENV === 'development';

module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  return {
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],

    plugins: [
      isDev && 'react-refresh/babel',
      ['@babel/plugin-proposal-decorators', { version: '2023-11' }],
    ].filter(Boolean),
  };
};
