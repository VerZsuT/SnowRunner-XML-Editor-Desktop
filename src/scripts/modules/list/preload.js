require('../../../app/mainPreload.js')
const { fromDir } = require('../../../app/service.js')
const { join } = require('path')
const { existsSync } = require('fs')

window.preload = {
    exists(path) {
        return existsSync(join(__dirname, path))
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
