const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: process.env.NODE_ENV === 'production'? 'production' : 'development',
    devtool: process.env.NODE_ENV === 'production'? false : 'source-map',
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
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json']
    }
};
