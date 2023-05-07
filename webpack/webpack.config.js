const electronConfiguration = require('./webpack.electron.js');
const reactConfiguration = require('./webpack.react.js');

module.exports = [
	electronConfiguration,
	reactConfiguration
];