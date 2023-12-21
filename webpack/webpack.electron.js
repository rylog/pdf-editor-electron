const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	externals: {
		// Specify the dependencies to be externalized
		'pdf-lib': 'pdf-lib',
	},
	mode: isProduction ? 'production' : 'development',
	devtool: false,
	entry: {
		main: path.join(__dirname, '../electron/main.ts'),
		preload: path.join(__dirname, '../electron/preload.ts'),
	},
	target: 'electron-main',
	resolve: {
		alias: {
			['@']: path.resolve(__dirname, '../src')
		},
		extensions: ['.tsx', '.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../electron')],
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.node$/,
				use: 'file-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		]
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].js'
	},
	plugins:[]
};