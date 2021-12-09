const template = './src/pages/template.html'
const mainPreload = './src/app/mainPreload.ts'

function getModule(name) {
    const modules = './src/scripts/modules'
    return {
        main: `${modules}/${name}/main.tsx`,
        preload: `${modules}/${name}/preload.ts`
    }
}

function getConfig(name) {
    return `./configs/${name}`
}

module.exports = {
    packagerConfig: {
        icon: '.webpack/main/favicon.ico'
    },
    plugins: [
        [
            '@electron-forge/plugin-webpack',
            {
                mainConfig: getConfig('webpack.main.js'),
                renderer: {
                    config: getConfig('webpack.renderer.js'),
                    entryPoints: [
                        {
                            name: 'setup',
                            html: template,
                            js: getModule('setup').main,
                            preload: {
                                js: getModule('setup').preload
                            }
                        },
                        {
                            name: 'loading',
                            html: template,
                            js: getModule('loading').main,
                            preload: {
                                js: getModule('setup').preload
                            }
                        },
                        {
                            name: 'categories',
                            html: template,
                            js: getModule('categories').main,
                            preload: {
                                js: mainPreload
                            }
                        },
                        {
                            name: 'console',
                            html: template,
                            js: getModule('console').main,
                            preload: {
                                js: getModule('console').preload
                            }
                        },
                        {
                            name: 'list',
                            html: template,
                            js: getModule('list').main,
                            preload: {
                                js: getModule('list').preload
                            }
                        },
                        {
                            name: 'settings',
                            html: template,
                            js: getModule('settings').main,
                            preload: {
                                js: getModule('settings').preload
                            }
                        },
                        {
                            name: 'update',
                            html: template,
                            js: getModule('update').main
                        },
                        {
                            name: 'editor',
                            html: template,
                            js: getModule('editor').main,
                            preload: {
                                js: getModule('editor').preload
                            }
                        },
                        {
                            name: 'whats_new',
                            html: template,
                            js: getModule('whatsNew').main
                        }
                    ]
                }
            }
        ]
    ]
}
