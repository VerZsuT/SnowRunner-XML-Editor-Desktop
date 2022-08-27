const alias = require('./aliases.js')
const rules = require('./rules.js')

const mode = process.env.NODE_ENV || 'development'
const devtool = mode !== 'production' && 'inline-source-map'

module.exports = {
    mode,
    devtool,
    module: { rules },
    resolve: {
        alias,
        extensions: ['.js', '.ts', '.tsx', '.css', '.scss', '.sass']
    },
    output: { pathinfo: false },
    optimization: {
        splitChunks: { chunks: 'all' }
    }
}
