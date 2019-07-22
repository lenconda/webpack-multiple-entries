const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function getEntries(globPath) {
	const files = glob.sync(globPath),
				entries = {};
	files.forEach(function(filepath) {
			const split = filepath.split('/');
			const name = split[split.length - 2];
			entries[name] = './' + filepath;
	});
	return entries;
}

const entries = getEntries('src/**/index.tsx');

module.exports = {
  entry: {
    ...Object.assign(
			...Object.keys(entries)
			.map((name, index) => {
				let entryObject = {};
				entryObject[name] = path.resolve(entries[name]);
				return entryObject;
			})
		)
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'static/js/[name].[hash:8].route.js',
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
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            },
          },
          {
            test: /\.(js|ts)x?$/,
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    ...Object.keys(entries)
      .map(function(name, index) {
        return new HtmlWebpackPlugin({
          filename: name === 'src' ? 'index.html' : name + '/index.html',
          template: path.resolve('./index.html'),
          inject: true,
          chunks: [name]
        })
      }),
  ]
};