const { existsSync } = require('fs')

const CopyPlugin = require('copy-webpack-plugin')

const alias = require('./aliases.js')
const rules = require('./rules.js')
const paths = require('../paths')

class MainConfig {
  mode = process.env.NODE_ENV || 'development'
  isDev = this.mode === 'development'
  devtool = this.isDev && 'inline-source-map'
  hasTestConfig = existsSync(paths.testConfig)

  // CopyPlugin patterns
  winrar = { from: paths.winrar, to: 'winrar/' }
  favicon = { from: paths.favicon }
  license = { from: paths.license, to: '../../' }
  readme = { from: paths.readme, to: '../../' }
  config = this.isDev && this.hasTestConfig
    ? { from: paths.testConfig, to: 'config.json' }
    : { from: paths.config }

  get = () => ({
    mode: this.mode,
    devtool: this.devtool,
    plugins: [
      new CopyPlugin({
        patterns: [
          this.config,
          this.winrar,
          this.favicon,
          this.license,
          this.readme
        ]
      })
    ],
    entry: paths.entryPoint,
    module: { rules },
    resolve: {
      alias,
      extensions: ['.js', '.ts', '.tsx']
    }
  })
}

module.exports = new MainConfig().get()
