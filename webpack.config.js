const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
require("@babel/register");

// Webpack Configuration
const config = {
    mode: 'development',

    entry: ['babel-polyfill', './src/index.js'],
    
    devtool: 'inline-source-map',

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },

    module: {
        rules : [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.png$/,
                use: ['file-loader'],
            }
        ]
    },

    plugins: [
        new htmlWebpackPlugin({
            title: 'Ceros Ski'
        })
    ],
};

module.exports = config;