const electronConfiguration = require('./webpack.electron.js');
const reactConfiguration = require('./webpack.react.js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

//electronConfiguration.plugins.push(new BundleAnalyzerPlugin());
// reactConfiguration.plugins.push(new BundleAnalyzerPlugin());
module.exports = [
	electronConfiguration,
	reactConfiguration
];