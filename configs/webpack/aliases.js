const { readFileSync } = require('fs')

const paths = require('../paths')

class Aliases {
  obj = {}

  constructor() {
    const aliases = JSON.parse(readFileSync(paths.tsconfig)).compilerOptions.paths
    for (const key in aliases) {
      if (key in this.obj) continue
      const objKey = key.replace('/*', '')
      const objVal = `${paths.src}/${aliases[key][0].replace(/\/(index|\*)/g, '')}`
      this.obj[objKey] = objVal
    }
  }

  get = () => this.obj
}

module.exports = new Aliases().get()
