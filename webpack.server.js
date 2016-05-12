var path = require("path"),
	fs = require("fs"),
	webpack = require("webpack");
	
const nodeModules = fs.readdirSync("./node_modules").filter(d => d != ".bin");

function ignoreNodeModules(context, request, callback){
    
}

function createConfig(isDebug){
    
}

module.exports = createConfig(true);
module.exports.create = createConfig;