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
                            name: 'setup',
                            html: './src/pages/template.html',
                            js: './src/scripts/modules/setup/main.tsx',
                            preload: {
                                js: './src/scripts/modules/setup/preload.ts'
                            }
                        },
                        {
                            name: 'loading',
                            html: './src/pages/template.html',
                            js: './src/scripts/modules/loading/main.tsx',
                            preload: {
                                js: './src/scripts/modules/setup/preload.ts'
                            }
                        },
                        {
                            name: 'categories',
                            html: './src/pages/template.html',
                            js: './src/scripts/modules/categories/main.tsx',
                            preload: {
                                js: './src/app/mainPreload.ts'
                            }
                        },
                        {
                            name: 'console',
                            html: './src/pages/template.html',
                            js: './src/scripts/modules/console/main.tsx',
                            preload: {
                                js: './src/scripts/modules/console/preload.ts'
                            }
                        },
                        {
                            name: 'list',
                            html: './src/pages/template.html',
                            js: './src/scripts/modules/list/main.tsx',
                            preload: {
                                js: './src/scripts/modules/list/preload.ts'
                            }
                        },
                        {
                            name: 'settings',
                            html: './src/pages/template.html',
                            js: './src/scripts/modules/settings/main.tsx',
                            preload: {
                                js: './src/scripts/modules/settings/preload.ts'
                            }
                        },
                        {
                            name: 'update',
                            html: './src/pages/template.html',
                            js: './src/scripts/modules/updateWindow/main.tsx'
                        },
                        {
                            name: 'editor',
                            html: './src/pages/template.html',
                            js: './src/scripts/modules/editor/main.tsx',
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
