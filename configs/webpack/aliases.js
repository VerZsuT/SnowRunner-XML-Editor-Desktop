const { join } = require('path')

class Aliases {
  get = () => ({
    '#consts': this.src('/consts'),
    '#types': this.src('/types'),
    '#globalTexts': this.src('/globalTexts'),
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

  resolve(...paths) {
    return join(__dirname, ...paths)
  }

  src(path = '') {
    return this.resolve(`../../src${path}`)
  }

  main(path = '') {
    return this.src(`/main${path}`)
  }

  renderer(path = '') {
    return this.src(`/renderer${path}`)
  }
}

module.exports = new Aliases().get()
