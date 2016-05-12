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
    
}

module.exports = createConfig(true);
module.exports.create = createConfig;