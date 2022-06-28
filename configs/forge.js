const rootPreload = "./src/renderer/scripts/rootPreload.ts";
const template = "./src/renderer/template.html";

/**
 * Возвращает путь к модулю
 * @param {string} name
 */
function getPage(name) {
    const pages = "./src/renderer/pages";
    return {
        main: `${pages}/${name}/index.tsx`,
        preload: `${pages}/${name}/preload.ts`
    };
}

/**
 * Возвращает путь к конфигу
 * @param {string} name
 */
function getConfig(name) {
    return `./configs/${name}`;
}

function entryPoint(name, preloadIsMain=false, moduleName=null) {
    const entry = {
        name,
        html: template,
        js: getPage(moduleName ?? name).main,
        preload: {
            js: preloadIsMain? rootPreload : getPage(moduleName ?? name).preload
        }
    }

    return entry;
}

module.exports = {
    packagerConfig: { icon: ".webpack/main/favicon.ico" },
    plugins: [
        [
            "@electron-forge/plugin-webpack",
            {
                mainConfig: getConfig("webpack.main.js"),
                renderer: {
                    config: getConfig("webpack.renderer.js"),
                    entryPoints: [
                        entryPoint("loading", true),
                        entryPoint("update", true),
                        entryPoint("settings", true),
                        entryPoint("whats_new", true, "whatsNew"),
                        entryPoint("main"),
                        entryPoint("setup")
                    ]
                }
            }
        ]
    ]
};
