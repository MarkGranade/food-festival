const webpack = require("webpack");
const path = require("path");

module.exports = {
	// The "entry" point is the root of the bundle and the beginning of the dependency graph...
	// ... so give it the relative path to the client's code
	entry: "./assets/js/script.js",
	// Webpack will next take the entry point we have provided, bundle that code...
	// ... and "output" that bundled code to a folder that we specify
	output: {
		path: path.join(__dirname + "/dist"),
		filename: "main.bundle.js",
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
		}),
	],
	// The final piece of our basic setup will provide the "mode" in which we want webpack to run.
	// By default, webpack wants to run in "production" mode. We want our code to run in "development" mode.
	mode: "development",
};
