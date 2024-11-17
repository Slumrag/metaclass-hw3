const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const isProd = process.env.NODE_ENV === 'production';
const getSettingsForStyles = (withModules = false) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    !withModules
      ? 'css-loader'
      : {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
              namedExport: false,
            },
          },
        },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },

    'sass-loader',
  ];
};

module.exports = {
  mode: 'none',
  devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
  entry: {
    app: path.join(__dirname, 'src', 'main.tsx'),
  },

  target: !isProd ? 'web' : 'browserslist',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      // алиасы для импортов в scss модулях
      styles: path.resolve(__dirname, './src/styles'),
      src: path.resolve(__dirname, './src'),
    },

    plugins: [new TsconfigPathsPlugin()],
  },

  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'), // путь до нашего шаблона
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    isProd &&
      new MiniCssExtractPlugin({
        // Для того чтобы файл со стилями не кэшировался в браузере добавим filename
        filename: '[name]-[hash].css',
      }),
    new TsCheckerPlugin(),
    new Dotenv(),
  ].filter(Boolean),

  devServer: {
    host: 'localhost', // хост нашего сервера
    port: 3000, // порт, по которому к нему можно обращаться
    hot: true,
    historyApiFallback: true,
    proxy: [
      {
        context: ['/githubApi'],
        target: 'https://api.github.com/',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/githubApi': '' },
      },
      {
        context: ['/githubDownload'],
        target: 'https://raw.githubusercontent.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/githubDownload': '' },
      },
    ],
  },
};
