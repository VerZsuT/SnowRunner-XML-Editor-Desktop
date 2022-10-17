const { existsSync } = require('fs')
const { join } = require('path')

const CopyPlugin = require('copy-webpack-plugin')

const alias = require('./aliases.js')
const rules = require('./rules.js')

class MainConfig {
  mode = process.env.NODE_ENV || 'development'
  isDev = this.mode === 'development'
  devtool = this.isDev && 'inline-source-map'
  hasTestConfig = existsSync(join(__dirname, '../../src/main/test-config.json'))
  entryPoint = './src/main/index.ts'
  
  winrar = { from: 'src/main/winrar', to: 'winrar/' }
  favicon = { from: 'src/images/favicon.ico' }
  license = { from: 'LICENSE', to: '../../' }
  readme = { from: 'README.md', to: '../../' }
  config = this.isDev && this.hasTestConfig
    ? { from: 'src/main/test-config.json', to: 'config.json' }
    : { from: 'src/main/config.json' }

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
    entry: this.entryPoint,
    module: { rules },
    resolve: {
      alias,
      extensions: ['.js', '.ts', '.tsx']
    }
  })
}

module.exports = new MainConfig().get()
