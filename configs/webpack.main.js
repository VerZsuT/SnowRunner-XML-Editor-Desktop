const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    devtool: process.env.NODE_ENV === 'production'? false : 'inline-source-map',
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: 'src/app/config.json'
                },
                {
                    from: 'src/scripts/winrar',
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
    entry: './src/app/index.ts',
    module: {
        rules: require('./webpack.rules'),
    },
    resolve: {
        alias: require('./webpack.aliases'),
        extensions: ['.js', '.ts', '.tsx', '.css', '.scss']
    }
}
