require('../../../app/mainPreload.js')
const { fromDir } = require('../../../app/service.js')
const { join, dirname, basename } = require('path')
const { existsSync } = require('fs')

const openInitialDialog = () => ipcRenderer.sendSync('function_openInitialDialog_call').value

window.preload = {
    exists(path) {
        return existsSync(join(__dirname, path))
    },
    getModPak() {
        const path = openInitialDialog()[0]
        return {id: basename(dirname(path)), path: path, name: basename(path)}
    },
    getList: (listType, from=null) => {
        if (from === 'dlc') {
            const array = []
            for (const dlcItem of config.dlcList) {
                const path = `${dlcItem.path}\\classes`
    
                if (listType === 'trucks') {
                    array.push({dlcName: dlcItem.name, items: fromDir(join(path, 'trucks')) || []})
                }
                else if (listType === 'trailers') {
                    array.push({dlcName: dlcItem.name, items: fromDir(join(path, 'trucks', 'trailers')) || []})
                }
                else if (listType === 'cargo') {
                    array.push({dlcName: dlcItem.name, items: fromDir(join(path, 'trucks', 'cargo')) || []})
                }
                else {
                    throw new Error('[UNDEFINED_LIST_TYPE]')
                }
    
            }
            return array
        }
        else if (from === 'mods') {
            const array = []
            for (const modId in config.modsList) {
                if (modId === 'length') {
                    continue
                }
                const item = config.modsList[modId]
                if (listType === 'trucks') {
                    array.push({id: modId, name: item.name, items: fromDir(join(paths.modsTemp, modId, 'classes', 'trucks')) || []})
                }
                else if (listType === 'trailers') {
                    array.push({id: modId, name: item.name, items: fromDir(join(paths.modsTemp, modId, 'classes', 'trucks', 'trailers')) || []})
                }
                else if (listType === 'cargo') {
                    array.push({id: modId, name: item.name, items: fromDir(join(paths.modsTemp, modId, 'classes', 'trucks', 'cargo')) || []})
                }
                else {
                    throw new Error('[UNDEFINED_LIST_TYPE]')
                }
            }
            return array
        }
        else {
            if (listType === 'trucks') {
                return fromDir(join(paths.classes, 'trucks'))
            }
            else if (listType === 'trailers') {
                return fromDir(join(paths.classes, 'trucks', 'trailers'))
            }
            else if (listType === 'cargo') {
                return fromDir(join(paths.classes, 'trucks', 'cargo'))
            }
            else {
                throw new Error('[UNDEFINED_LIST_TYPE]')
            }
        }
    }
}
