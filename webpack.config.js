var path = require('path');

module.exports = {
	devtool: 'eval-source-map',
	entry: './app/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		pathinfo: true
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				loader: 'style-loader',
				test: /\.css$/
			},
			{
				loader: 'css-loader',
				test: /\.css$/
			},
			{
				enforce: 'pre',
				test: /\.jsx?$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader'
			}
		]
	},

	devServer: {
		publicPath: '/'
	}
}
