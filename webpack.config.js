const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
   return {
      mode: env.mode,
      target: env.mode === 'development' ? 'web' : 'browserslist',
      devtool: env.mode === 'development' ? 'source-map' : undefined,
      entry: {
         main: [
            '@babel/polyfill',
            path.resolve(__dirname, 'src', 'js', 'index.js'),
        ],
      },

      output: {
         path: path.resolve(__dirname, 'build'),
         filename: './js/[name].[contenthash].js',
         clean: true,
         // publicPath: '/',
      },

      devServer: {
         port: 3000,
         open: 'index.html',
      },

      plugins: [
         new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'pages', 'index.html'),
            filename: 'index.html',
            chunks: ['main'],
         }),
         new MiniCssExtractPlugin({
            filename: './css/[name].css',
         }),
      ],

      optimization: {
         splitChunks: {
            cacheGroups: {
               common: {
                  name: 'common',
                  chunks: 'all',
                  minChunks: 2,
                  enforce: true,
               },
            },
         },
      },

      module: {
         rules: [
            {
               test: /\.html$/i,
               loader: 'html-loader',
            },
            {
               test: /\.s[ac]ss$/i,
               use: [
                  env.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                  'css-loader',
                  {
                     loader: 'postcss-loader',
                     options: {
                        postcssOptions: {
                           plugins: [
                              [require('postcss-preset-env')],
                           ],
                        },
                     },
                  },
                  'sass-loader',
               ],
            },
            {
               test: /\.(woff2?|eot|ttf|otf)$/i,
               type: 'asset/resource',
               generator: {
                  filename: 'fonts/[name][ext]',
               },
               parser: {
                  dataUrlCondition: {
                     maxSize: 10 * 1024,
                  },
               },
            },
            {
               test: /\.(?:js|mjs|cjs)$/,
               exclude: /node_modules/,
               use: {
                  loader: 'babel-loader',
                  options: {
                     presets: [
                        ['@babel/preset-env', { targets: 'defaults' }],
                     ],
                  },
               },
            },
            {
               test: /\.(jpe?g|png|webp|gif|svg)$/i,
               type: 'asset/resource',
               generator: {
                  filename: './img/[name][ext]',
               },
               parser: {
                  dataUrlCondition: {
                     maxSize: 10 * 1024,
                  },
               },
            },
            {
               test: /\.(mp4|mkv|avi|mov|flv|wmv|webm|mpeg|mpg)$/i,
               type: 'asset/resource',
               generator: {
                  filename: './video/[name][ext]',
               },
               parser: {
                  dataUrlCondition: {
                     maxSize: 10 * 1024,
                  },
               },
            },
         ],
      },
   };
};