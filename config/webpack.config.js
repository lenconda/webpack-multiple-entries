const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function getEntries(searchPath, root) {
  const files = glob.sync(searchPath)
  const entries = files.map((value, index) => {
    const relativePath = path.relative(root, value);
    return {
      name: value.split('/')[value.split('/').length - 2],
      path: path.resolve('./', value),
      route: relativePath.split('/').filter((value, index) => value !== 'index.tsx').join('/')
    }
  });
  return entries;
}

const entries = getEntries('src/**/index.tsx', 'src');

module.exports = {
  entry: {
    ...Object.assign(
      ...entries.map((value, index) => {
        const entryObject = {};
        entryObject[value.name]= value.path;
        return entryObject;
      })
    )
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'static/js/[name]-route.[hash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx']
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(ts|js|tsx|jsx)?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            },
          },
          {
            test: /\.(ts|js|tsx|jsx)?$/,
            exclude: /node_modules/,
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve(
                'babel-preset-react-app/webpack-overrides'
              ),
              cacheDirectory: true,
              cacheCompression: true,
              compact: true,
            }
          },
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/'
            }
          }, 
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    ...entries.map((value, index) => {
      return new HtmlWebpackPlugin({
        filename: value.name === 'src' ? 'index.html' : value.route + '/index.html',
        template: path.resolve(__dirname, '../templates/index.html'),
        inject: true,
        chunks: [value.name]
      })
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: '[id].[hash:8].css'
    }),
    new UglifyJsPlugin({
      test: /\.(ts|js|tsx|jsx)?$/,
      sourceMap: true
    }),
    new CopyWebpackPlugin(
      [
        {
          from: path.resolve(__dirname, '../assets/'),
          to: path.resolve(__dirname, '../dist/assets')
        }
      ]
    ),
    new CleanWebpackPlugin()
  ]
};
