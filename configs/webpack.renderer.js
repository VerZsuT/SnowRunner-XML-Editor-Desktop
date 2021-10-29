const rules = require('./webpack.rules');
const { VueLoaderPlugin } = require('vue-loader');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV === 'production'? 'production' : 'development',
    devtool: process.env.NODE_ENV === 'production'? false : 'source-map',
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new VueLoaderPlugin()
    ],
    module: {
        rules,
    },
    resolve: {
        extensions: ['.vue', '.js', '.ts', '.jsx', '.tsx', '.css']
    }
};
