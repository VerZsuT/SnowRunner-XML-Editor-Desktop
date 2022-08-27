const { existsSync } = require('fs')
const { join } = require('path')

const CopyPlugin = require('copy-webpack-plugin')

const alias = require('./aliases.js')
const rules = require('./rules.js')

const mode = process.env.NODE_ENV || 'development'
const isDev = mode === 'development'
const devtool = isDev && 'inline-source-map'
const hasTestConfig = existsSync(join(__dirname, '../../src/main/test-config.json'))
const entryPoint = './src/main/index.ts'

const winrar = { from: 'src/main/winrar', to: 'winrar/' }
const favicon = { from: 'src/images/favicon.ico' }
const license = { from: 'LICENSE', to: '../../' }
const readme = { from: 'README.md', to: '../../' }
const config = isDev && hasTestConfig
    ? { from: 'src/main/test-config.json', to: 'config.json' }
    : { from: 'src/main/config.json' }

module.exports = {
    mode,
    devtool,
    plugins: [
        new CopyPlugin({
            patterns: [
                config,
                winrar,
                favicon,
                license,
                readme
            ]
        })
    ],
    entry: entryPoint,
    module: { rules },
    resolve: {
        alias,
        extensions: ['.js', '.ts', '.tsx']
    }
}
