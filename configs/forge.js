const renderer = './src/renderer'
const webpackConfigs = './configs/webpack'

const rootPreload = `${renderer}/scripts/rootPreload.ts`
const template = `${renderer}/template.html`
const pages = `${renderer}/pages`
const favicon = '.webpack/main/favicon.ico'

const mainConfig = `${webpackConfigs}/main.js`
const rendererConfig = `${webpackConfigs}/renderer.js`

/**
 * Возвращает путь к модулю
 * @param {string} name
 */
function getPage(name) {
    return {
        main: `${pages}/${name}/index.tsx`,
        preload: `${pages}/${name}/preload.ts`
    }
}

function entryPoint(name, preloadIsMain=false, moduleName=null) {
    return {
        name,
        html: template,
        js: getPage(moduleName ?? name).main,
        preload: {
            js: preloadIsMain? rootPreload : getPage(moduleName ?? name).preload
        }
    }
}

module.exports = {
    packagerConfig: { icon: favicon },
    plugins: [
        [
            '@electron-forge/plugin-webpack',
            {
                mainConfig,
                renderer: {
                    config: rendererConfig,
                    entryPoints: [
                        entryPoint('loading', true),
                        entryPoint('update', true),
                        entryPoint('settings', true),
                        entryPoint('whatsNew', true),
                        entryPoint('main'),
                        entryPoint('setup')
                    ]
                }
            }
        ]
    ]
}
