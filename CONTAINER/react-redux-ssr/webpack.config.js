const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const isProd = require('./src/server/utils').IS_PROD;

const PUBLIC = 'public';
const DIST_DIR = path.join(__dirname, PUBLIC);
const DIST_DIR_SRV = path.join(__dirname, 'serverbuild');

const resolve = dir => path.join(__dirname, dir);

const generateClientConfig = () => {
  const config = {
    entry: './src/client/index.js',
    output: {
      path: DIST_DIR,
      filename: isProd ? '[name]-[hash].min.js' : '[name].dev.js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        '@': resolve('src'),
      },
    },
    devtool: 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: 'file-loader',
          options: {
            name: ('./media/[name].[ext]'),
            publicPath: url => url.replace(/public/, ''),
          },
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: { importLoaders: 1 },
              },
              {
                loader: 'postcss-loader',
                options: { plugins: [autoprefixer()] },
              },
            ],
          }),
        },
        {
          test: /js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: { presets: ['react-app'] },
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          include: path.join(__dirname, '/src/shared/fonts'),
          loader: 'file-loader?name=/fonts/[name].[ext]',
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(DIST_DIR),
      new ExtractTextPlugin({
        filename: './css/[name].css',
      }),
    ],
  };
  return config;
};

const generateServerConfig = () => {
  const serverConfig = {
    entry: './src/server/index.js',
    target: 'node',
    output: {
      path: DIST_DIR_SRV,
      filename: 'index.js',
      libraryTarget: 'commonjs2',
    },
    resolve: {
      extensions: ['.js', '.json'],
      alias: {
        '@': resolve('src'),
      },
    },
    devtool: 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: 'file-loader',
          options: {
            name: path.resolve(DIST_DIR, '/media/[name].[ext]'),
            publicPath: url => url.replace(/public/, ''),
            emit: false,
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'css-loader/locals',
            },
          ],
        },
        {
          test: /js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: { presets: ['react-app'] },
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          include: path.join(__dirname, '/src/shared/fonts'),
          loader: 'file-loader?name=/fonts/[name].[ext]',
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(DIST_DIR_SRV),
    ],
  };
  return serverConfig;
};

module.exports = [generateClientConfig(), generateServerConfig()];
