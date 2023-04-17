const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
	mode: 'development',
	entry: {
		main: path.join(__dirname, '../src/main.ts'),
		preload: path.join(__dirname, '../src/preload.ts'),
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
				include: /src/,
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
};