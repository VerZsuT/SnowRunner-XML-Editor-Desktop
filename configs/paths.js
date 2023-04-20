const { join } = require('path')

class Paths {
  root = join(__dirname, '..')
  src = `${this.root}/src`

  renderer = `${this.src}/renderer`
  webpackConfigs = `${this.root}/configs/webpack`

  rootPreload = `${this.renderer}/scripts/root-preload.main.ts`
  template = `${this.renderer}/template.html`
  pages = `${this.renderer}/pages`

  favicon = `${this.src}/images/favicon.ico`
  bundledFavicon = `${this.root}/.webpack/main/favicon.ico`

  mainConfig = `${this.webpackConfigs}/main.js`
  rendererConfig = `${this.webpackConfigs}/renderer.js`

  tsconfig = `${this.src}/tsconfig.json`
  entryPoint = `${this.src}/main/index.ts`

  config = `${this.src}/main/configs/config.json`
  testConfig = `${this.src}/main/configs/test-config.json`

  winrar = `${this.src}/main/archivers/winrar/files`
  license = `${this.root}/LICENSE`
  readme = `${this.root}/README.md`
}

module.exports = new Paths()
