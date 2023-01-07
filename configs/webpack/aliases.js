const { join } = require('path')

class Aliases {
  get = () => ({
    '#consts': this.src('/consts'),
    '#types': this.src('/types'),
    '#gl-texts': this.src('/texts'),
    '#gl-helpers': this.src('/helpers'),
    '#enums': this.src('/enums'),
    '#images': this.src('/images'),
    '#classes': this.main('/classes'),
    '#m-scripts': this.main('/scripts'),
    '#windows': this.main('/windows'),
    '#m': this.main(),
    '#r': this.renderer(),
    '#templates': this.renderer('/templates'),
    '#r-scripts': this.renderer('/scripts'),
    '#services': this.renderer('/services'),
    '#pages': this.renderer('/pages'),
    '#components': this.renderer('/components'),
    '#helpers': this.renderer('/helpers'),
    '#hooks': this.renderer('/hooks'),
    '#src': this.src()
  })

  resolve = (...paths) => join(__dirname, ...paths)
  src = (path = '') => this.resolve(`../../src${path}`)
  main = (path = '') => this.src(`/main${path}`)
  renderer = (path = '') => this.src(`/renderer${path}`)
}

module.exports = new Aliases().get()
