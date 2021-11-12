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
                            name: 'categories',
                            html: './src/pages/template.html',
                            js: './src/scripts/modules/categories/main.ts',
                            preload: {
                                js: './src/app/mainPreload.ts'
                            }
                        },
                        {
                            name: 'setup',
                            html: './src/pages/template.html',
                            js: './src/scripts/modules/setup/main.ts',
                            preload: {
                                js: './src/scripts/modules/setup/preload.ts'
                            }
                        },
                        {
                            name: 'loading',
                            html: './src/pages/loading.html',
                            js: './src/scripts/modules/loading/main.ts',
                            preload: {
                                js: './src/scripts/modules/setup/preload.ts'
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
                            js: './src/scripts/modules/updateWindow/main.ts'
                        },
                        {
                            name: 'editor',
                            html: './src/pages/editor.html',
                            js: './src/scripts/modules/editor/main.ts',
                            preload: {
                                js: './src/scripts/modules/editor/preload.ts'
                            }
                        }
                    ]
                }
            }
        ]
    ]
}
