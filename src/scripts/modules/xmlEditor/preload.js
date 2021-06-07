require('../../../app/mainPreload.js')
const { ipcRenderer } = require('electron')
const { existsSync, readdirSync } = require('fs')
const { join } = require('path')

window.preload = {
    existsSync: existsSync,
    findFromDLC: (fileName, type) => {
        for (const dlcFolder of readdirSync(config.paths.dlc)) {
            const path = join(config.paths.dlc, dlcFolder, 'classes', type, `${fileName}.xml`)
            if (existsSync(path)) {
                return path
            }
        }
    },
    join: join,
    paths: ipcRenderer.sendSync('property_paths_get').value
}
