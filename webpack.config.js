const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');

module.exports = {
    mode: "development",
    entry: "./src/app.ts",
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {'buffer':require.resolve("buffer/")}
    },
    output: {
        filename: "app.bundle.js",
        path: path.join(__dirname, 'dist')
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader"
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{
            from: path.join(__dirname, 'static'),
            to: path.join(__dirname, 'dist')
            }],
        }),
/*         new UglifyJsPlugin({
            sourceMap: true
        }) */
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
      },
    
};
