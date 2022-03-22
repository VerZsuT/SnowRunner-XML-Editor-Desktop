const template = './src/renderer/template.html'
const mainPreload = './src/renderer/scripts/mainPreload.ts'

/**
 * Возвращает путь к модулю
 * @param {string} name
 */
function getModule(name) {
    const modules = './src/renderer/modules'
    return {
        main: `${modules}/${name}/main.tsx`,
        preload: `${modules}/${name}/preload.ts`
    }
}

/**
 * Позвращает путь к конфигу
 * @param {string} name
 */
function getConfig(name) {
    return `./configs/${name}`
}

function entryPoint(name, preloadIsMain=false, moduleName=null) {
    return {
        name,
        html: template,
        js: getModule(moduleName ?? name).main,
        preload: {
            js: preloadIsMain ? mainPreload : getModule(moduleName ?? name).preload
        }
    }
}

module.exports = {
    packagerConfig: { icon: '.webpack/main/favicon.ico' },
    plugins: [
        [
            '@electron-forge/plugin-webpack',
            {
                mainConfig: getConfig('webpack.main.js'),
                renderer: {
                    config: getConfig('webpack.renderer.js'),
                    entryPoints: [
                        entryPoint('setup'),
                        entryPoint('loading', true),
                        entryPoint('categories', true),
                        entryPoint('console'),
                        entryPoint('list'),
                        entryPoint('settings'),
                        entryPoint('update', true),
                        entryPoint('editor'),
                        entryPoint('whats_new', true, 'whatsNew')
                    ]
                }
            }
        ]
    ]
}
