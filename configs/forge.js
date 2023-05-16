const paths = require('./paths')

class ForgeConfig {
  get = () => ({
    packagerConfig: { icon: paths.bundledFavicon },
    plugins: [
      {
        name: '@electron-forge/plugin-webpack',
        config: {
          mainConfig: paths.mainConfig,
          renderer: {
            config: paths.rendererConfig,
            entryPoints: [
              this.entryPoint('loading', true),
              this.entryPoint('update', true),
              this.entryPoint('settings', true),
              this.entryPoint('whatsnew', true),
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
      main: `${paths.pages}/${name}/index.tsx`,
      preload: `${paths.pages}/${name}/preload.ts`
    }
  }

  entryPoint(name, preloadIsMain = false, moduleName = null) {
    return {
      name,
      html: paths.template,
      js: this.getPage(moduleName ?? name).main,
      preload: {
        js: preloadIsMain ? paths.rootPreload : this.getPage(moduleName ?? name).preload
      }
    }
  }
}

module.exports = new ForgeConfig().get()
