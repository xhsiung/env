
var path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry:  './src/index.js',
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'app.bundle.js',
		//publicPath: '/build/'
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env',"@babel/preset-react"]
					}
				}
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html'
		      })
	],
	optimization: {
		minimizer: [new UglifyJsPlugin()],
	},
}