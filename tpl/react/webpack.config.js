
var path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry:  './src/index.js',
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
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
	devServer: {
		port: 9000
	}
}
