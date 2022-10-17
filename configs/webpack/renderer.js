const alias = require('./aliases.js')
const rules = require('./rules.js')

class RendererConfig {
  mode = process.env.NODE_ENV || 'development'
  devtool = this.mode !== 'production' && 'inline-source-map'

  get = () => ({
    mode: this.mode,
    devtool: this.devtool,
    module: { rules },
    resolve: {
      alias,
      extensions: ['.js', '.ts', '.tsx', '.css', '.scss', '.sass']
    },
    output: {
      pathinfo: false
    }
  })
}

module.exports = new RendererConfig().get()
