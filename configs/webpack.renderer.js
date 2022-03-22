const rules = require('./webpack.rules')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
    plugins: [ new ForkTsCheckerWebpackPlugin() ],
    module: { rules },
    resolve: {
        alias: require('./webpack.aliases'),
        extensions: ['.js', '.ts', '.tsx', '.css', '.scss']
    },
    output: {
        pathinfo: false
    }
}
