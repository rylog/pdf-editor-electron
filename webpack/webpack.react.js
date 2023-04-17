const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const { warn } = require('console');

module.exports = {
	mode: 'development',
	entry: path.join(__dirname, '../src/renderer'),
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
				include: /src/,
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