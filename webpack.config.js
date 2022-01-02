const BundleAnalyzerPlugin =
	require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const webpack = require("webpack");
const path = require("path");

module.exports = {
	// The "entry" point is the root of the bundle and the beginning of the dependency graph...
	// ... so give it the relative path to the client's code
	entry: {
		app: "./assets/js/script.js",
		events: "./assets/js/events.js",
		schedule: "./assets/js/schedule.js",
		tickets: "./assets/js/tickets.js",
	},
	devServer: {
		static: "./",
	},
	// Webpack will next take the entry point we have provided, bundle that code...
	// ... and "output" that bundled code to a folder that we specify
	output: {
		filename: "[name].bundle.js",
		path: __dirname + "/dist",
	},
	module: {
		rules: [
			// This object will identify the type of files to pre-process using the <test> property to find a regular expression, or regex.
			{
				test: /\.jpg$/i,
				// implement loader
				use: [
					{
						loader: "file-loader",
						options: {
							esModule: false,
							// <name> function that returns the name of the file with the file extension
							name(file) {
								return "[path][name].[ext]";
							},
							// <publicPath> property, which is also a function that changes our assignment URL by replacing the <../> from out <require()> statement with </assets/>
							publicPath: function (url) {
								return url.replace("../", "/assets/");
							},
						},
					},
					{
						loader: "image-webpack-loader",
					},
				],
			},
		],
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: "static", // the report outputs to an HTML file in the dist folder
		}),
	],
	// The final piece of our basic setup will provide the "mode" in which we want webpack to run.
	// By default, webpack wants to run in "production" mode. We want our code to run in "development" mode.
	mode: "development",
};
