module.exports = {
    packagerConfig: {
        icon: '.webpack/main/favicon.ico'
    },
    plugins: [
        [
            '@electron-forge/plugin-webpack',
            {
                mainConfig: './configs/webpack.main.js',
                renderer: {
                    config: './configs/webpack.renderer.js',
                    entryPoints: [
                        {
                            name: 'main',
                            html: './src/pages/main.html',
                            js: './src/scripts/modules/main/main.js',
                            preload: {
                                js: './src/app/mainPreload.js'
                            }
                        },
                        {
                            name: 'first_steps',
                            html: './src/pages/firstSteps.html',
                            js: './src/scripts/modules/firstSteps/main.js',
                            preload: {
                                js: './src/scripts/modules/firstSteps/preload.js'
                            }
                        },
                        {
                            name: 'download',
                            html: './src/pages/download.html',
                            js: './src/scripts/modules/download/main.js',
                            preload: {
                                js: './src/scripts/modules/firstSteps/preload.js'
                            }
                        },
                        {
                            name: 'console',
                            html: './src/pages/console.html',
                            js: './src/scripts/modules/console/main.js',
                            preload: {
                                js: './src/scripts/modules/console/preload.js'
                            }
                        },
                        {
                            name: 'list',
                            html: './src/pages/list.html',
                            js: './src/scripts/modules/list/main.js',
                            preload: {
                                js: './src/scripts/modules/list/preload.js'
                            }
                        },
                        {
                            name: 'settings',
                            html: './src/pages/settings.html',
                            js: './src/scripts/modules/settings/main.js',
                            preload: {
                                js: './src/scripts/modules/settings/preload.js'
                            }
                        },
                        {
                            name: 'update',
                            html: './src/pages/updateMessage.html',
                            js: './src/scripts/modules/updateMessage/main.js'
                        },
                        {
                            name: 'editor',
                            html: './src/pages/xmlEditor.html',
                            js: './src/scripts/modules/xmlEditor/main.js',
                            preload: {
                                js: './src/scripts/modules/xmlEditor/preload.js'
                            }
                        }
                    ]
                }
            }
        ]
    ]
}
