const webpack = require('webpack');
const path = require('path');
module.exports = {
    entry: "./src/plugin.js",

    output: {
        filename: 'plugin.js',
        path: path.resolve(__dirname, 'assets')
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
