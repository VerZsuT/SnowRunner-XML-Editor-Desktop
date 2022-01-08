const CopyPlugin = require('copy-webpack-plugin')
const {
    existsSync
} = require('fs')
const {
    join
} = require('path')

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
    plugins: [
        new CopyPlugin({
            patterns: [
                process.env.NODE_ENV === 'development' && existsSync(join(__dirname, '../src/main/test-config.json')) ? {
                    from: 'src/main/test-config.json',
                    to: 'config.json'
                } : {
                    from: 'src/main/config.json'
                },
                {
                    from: 'src/main/winrar',
                    to: 'winrar/'
                },
                {
                    from: 'src/images/icons/favicon.ico'
                },
                {
                    from: 'LICENSE',
                    to: '../../'
                },
                {
                    from: 'README.md',
                    to: '../../'
                }
            ]
        })
    ],
    entry: './src/main/index.ts',
    module: {
        rules: require('./webpack.rules'),
    },
    resolve: {
        alias: require('./webpack.aliases'),
        extensions: ['.js', '.ts', '.tsx', '.css', '.scss']
    }
}
