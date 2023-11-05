const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
	mode: 'development',
	entry: path.join(__dirname, '../electron/renderer'),
	target: 'web',
	devtool: 'source-map',
	devServer: {
		static: {
			directory: path.join(__dirname, '../dist'),
		},
		compress: true,
		port: 9000,
		hot: true,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, '../src'),
		},
		extensions: ['.tsx', '.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../electron')],
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.module\.css$/i,
				include: /src/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[name]__[local]___[hash:base64:5]'
							}
						}
					}
				]
			},
			{
				test: /\.css$/,
				exclude: /\.module\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|jpg|gif)$/i,
				use: 'file-loader',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		]
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'renderer.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'node_modules/pdfjs-dist/build/pdf.worker.min.js',
					to: 'pdfjs-dist/pdf.worker.min.js',
				},
				{
					from: 'node_modules/pdfjs-dist/cmaps',
					to: 'pdfjs-dist/cmaps/',
				},
			],
		}),
	]
};