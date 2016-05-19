import gulp from "gulp";
import webpack from "webpack";
import chalk from "chalk";

import {create as createServerConfig} from "./webpack.server";
import {create as createClientConfig} from "./webpack.client";

const $ = require("gulp-load-plugins")();

// Public Tasks
gulp.task();

// Private Client Tasks


// Private Server Tasks
const devServerWebpack = webpack(createServerConfig(true));
const prodServerWebpack = webpack(createServerConfig(false));


// Helpers