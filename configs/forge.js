class ForgeConfig {
  renderer = './src/renderer'
  webpackConfigs = './configs/webpack'
  
  rootPreload = `${this.renderer}/scripts/root-preload.main.ts`
  template = `${this.renderer}/template.html`
  pages = `${this.renderer}/pages`
  favicon = '.webpack/main/favicon.ico'
  
  mainConfig = `${this.webpackConfigs}/main.js`
  rendererConfig = `${this.webpackConfigs}/renderer.js`

  get = () => ({
    packagerConfig: { icon: this.favicon },
    plugins: [
      {
        name: '@electron-forge/plugin-webpack',
        config: {
          mainConfig: this.mainConfig,
          renderer: {
            config: this.rendererConfig,
            entryPoints: [
              this.entryPoint('loading', true),
              this.entryPoint('update', true),
              this.entryPoint('settings', true),
              this.entryPoint('whatsNew', true),
              this.entryPoint('main'),
              this.entryPoint('setup')
            ]
          }
        }
      }
    ]
  })

  /**
   * Возвращает путь к модулю
   * @param {string} name
   */
  getPage(name) {
    return {
      main: `${this.pages}/${name}/index.tsx`,
      preload: `${this.pages}/${name}/preload.ts`
    }
  }

  entryPoint(name, preloadIsMain = false, moduleName = null) {
    return {
      name,
      html: this.template,
      js: this.getPage(moduleName ?? name).main,
      preload: {
        js: preloadIsMain ? this.rootPreload : this.getPage(moduleName ?? name).preload
      }
    }
  }
}

module.exports = new ForgeConfig().get()
