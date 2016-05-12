var path = require("path"),
	fs = require("fs"),
	webpack = require("webpack");
	
const nodeModules = fs.readdirSync("./node_modules").filter(d => d != ".bin");

function ignoreNodeModules(context, request, callback){
    
}

function createConfig(isDebug){
    const plugins = [];
    
    if (!isDebug) {
		plugins.push(new webpack.optimize.UglifyJsPlugin());
	}
	
	// Webpack Config
	return{
		target : "node",
		devtool : "source-map",
		entry: "./src/server/server.js",
		output: {
			path: path.join(__dirname, "build"),
			filename: "server.js"
		},
		resolve: {
			alias: {
				shared: path.join(__dirname, "src", "shared")
			}
		},
		module: {
			loaders: [
				{ test: /\.js$/, loader: "babel", exclude: /node_modules/ },
				{ test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/ }
			]
		},
		externals: [ignoreNodeModules],
		plugins: plugins
	};
}

module.exports = createConfig(true);
module.exports.create = createConfig;