const mainPreload = "./src/renderer/scripts/mainPreload.ts";
const template = "./src/renderer/template.html";

const appEntry = {
    name: "app",
    html: template,
    js: "./src/renderer/App.tsx",
    preload: {
        js: "./src/renderer/preload.ts"
    }
};

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
            js: preloadIsMain? mainPreload : getPage(moduleName ?? name).preload
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
                        appEntry,
                        entryPoint("loading", true),
                        entryPoint("update", true),
                        entryPoint("settings", true),
                        entryPoint("console", true),
                        entryPoint("whats_new", true, "whatsNew"),
                        entryPoint("setup")
                    ]
                }
            }
        ]
    ]
};
