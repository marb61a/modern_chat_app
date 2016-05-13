var path = require("path"),
	webpack = require("webpack"),
	ExtractTextPlugin = require("extract-text-webpack-plugin");

const vendorModules = [
	"jquery", 
	"lodash",
	"socket.io-client", 
	"rxjs", 
	"moment",
	"moment-duration-format"];
	
const dirname = path.resolve("./");

function createConfig(isDebug){
    
    // Webpack Config
    return{
    	devtool : devTool,
    	entry: {
			application: appEntry,
			vendor: vendorModules
		},
		output: {
			path: path.join(dirname, "public", "build"),
			filename: "[name].js",
			publicPath: "/build/"
		},
		resolve: {
			alias: {
				shared: path.join(dirname, "src", "shared")
			}
		},
		module: {
			loaders: [
				{ test: /\.js$/, loader: "babel", exclude: /node_modules/ },
				{ test: /\.js$/, loader: "eslint", exclude: /node_modules/ },
				{ test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)/, loader: "url-loader?limit=1024" },
				cssLoader,
				sassLoader
			]
		},
		plugins: plugins
    };
    
}

module.exports = createConfig(true);
module.exports.create = createConfig;