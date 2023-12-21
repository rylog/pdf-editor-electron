const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	mode: isProduction ? 'production' : 'development',
	devtool: isProduction ? false : 'source-map',
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
	optimization: {
		minimize: true,
		minimizer: [
		  // Use TerserPlugin for JavaScript minification
		  new TerserPlugin({
			parallel: true,
		  })
		]
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].js'
	},
	plugins:[]
};