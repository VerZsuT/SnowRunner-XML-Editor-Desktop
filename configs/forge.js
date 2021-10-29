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
                            html: './src/pages/template.html',
                            js: './src/scripts/modules/main/main.ts',
                            preload: {
                                js: './src/app/mainPreload.ts'
                            }
                        },
                        {
                            name: 'first_steps',
                            html: './src/pages/template.html',
                            js: './src/scripts/modules/firstSteps/main.ts',
                            preload: {
                                js: './src/scripts/modules/firstSteps/preload.ts'
                            }
                        },
                        {
                            name: 'download',
                            html: './src/pages/download.html',
                            js: './src/scripts/modules/download/main.ts',
                            preload: {
                                js: './src/scripts/modules/firstSteps/preload.ts'
                            }
                        },
                        {
                            name: 'console',
                            html: './src/pages/console.html',
                            js: './src/scripts/modules/console/main.ts',
                            preload: {
                                js: './src/scripts/modules/console/preload.ts'
                            }
                        },
                        {
                            name: 'list',
                            html: './src/pages/template.html',
                            js: './src/scripts/modules/list/main.ts',
                            preload: {
                                js: './src/scripts/modules/list/preload.ts'
                            }
                        },
                        {
                            name: 'settings',
                            html: './src/pages/template.html',
                            js: './src/scripts/modules/settings/main.ts',
                            preload: {
                                js: './src/scripts/modules/settings/preload.ts'
                            }
                        },
                        {
                            name: 'update',
                            html: './src/pages/template.html',
                            js: './src/scripts/modules/updateMessage/main.ts'
                        },
                        {
                            name: 'editor',
                            html: './src/pages/xmlEditor.html',
                            js: './src/scripts/modules/xmlEditor/main.ts',
                            preload: {
                                js: './src/scripts/modules/xmlEditor/preload.ts'
                            }
                        }
                    ]
                }
            }
        ]
    ]
}
