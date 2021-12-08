import { join, basename } from 'path'
import { existsSync, rmSync } from 'fs'
import '@editor-app/mainPreload'

import { findInDir } from '@editor-app/service'
import { mainProcess } from '@editor-service'

const preload: ListPreload = {
    exists: (path: string) => {
        return existsSync(join(__dirname, path))
    },
    removeDir: (path: string) => {
        rmSync(path, {recursive: true})
    },
    getModPak() {
        const path = mainProcess.openInitialDialog()

        return {
            id: basename(path, '.pak'),
            path: path,
            name: basename(path)
        }
    },
    join: (...args: string[]) => join(...args),
    getList: (listType: ListType, from?: FromList) => {
        if (from === 'dlc') {
            const array = []
            for (const dlcItem of config.dlcList) {
                const path = `${dlcItem.path}\\classes`
                let items = []

                if (listType === 'trucks') {
                    items = findInDir(join(path, 'trucks'))
                } else if (listType === 'trailers') {
                    items = findInDir(join(path, 'trucks', 'trailers'))
                } else if (listType === 'cargo') {
                    items = findInDir(join(path, 'trucks', 'cargo'))
                }

                array.push({
                    dlcName: dlcItem.name,
                    items: items
                })
            }
            return array
        } else if (from === 'mods') {
            const array = []
            for (const modId in config.modsList) {
                let items = []
                if (modId === 'length') {
                    continue
                }

                const item = config.modsList[modId]
                if (listType === 'trucks') {
                    items = findInDir(join(paths.modsTemp, modId, 'classes', 'trucks'), false, '.xml', true)
                } else if (listType === 'trailers') {
                    items = findInDir(join(paths.modsTemp, modId, 'classes', 'trucks'), false, '.xml', true)
                } else if (listType === 'cargo') {
                    items = findInDir(join(paths.modsTemp, modId, 'classes', 'trucks', 'cargo'))
                }

                array.push({
                    id: modId,
                    name: item.name,
                    items: items
                })
            }
            return array
        } else {
            if (listType === 'trucks') {
                return findInDir(join(paths.classes, 'trucks'))
            } else if (listType === 'trailers') {
                return findInDir(join(paths.classes, 'trucks', 'trailers'))
            } else if (listType === 'cargo') {
                return findInDir(join(paths.classes, 'trucks', 'cargo'))
            }
        }
    }
}

window.listPreload = preload
