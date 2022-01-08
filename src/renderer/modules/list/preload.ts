import { join, basename, extname } from 'path'
import { existsSync, rmSync, readdirSync, readFileSync } from 'fs'
import { homedir, userInfo } from 'os'
import 'scripts/provider'
import { findInDir } from 'main/service'
import { mainProcess } from 'scripts'
import { ListType, SrcType } from './enums'

const { config, paths } = window.provider
const { unpack, openInitialDialog } = mainProcess

class ListPreload implements IListPreload {
    exists = (path: string) => {
        return existsSync(join(__dirname, path))
    }

    removeDir = (path: string) => {
        rmSync(path, { recursive: true })
    }

    findMods = () => {
        const pathToUser = userInfo().homedir || homedir() || process.env.HOME
        if (!existsSync(pathToUser)) return []

        const pathToMods = join(pathToUser, 'Documents/My Games/SnowRunner/base/Mods/.modio/mods')
        if (!existsSync(pathToMods)) return []

        const out: { name: string, path: string }[] = []

        for (const folder of readdirSync(pathToMods, { withFileTypes: true })) {
            if (folder.isFile()) continue
            const modFolder = join(pathToMods, folder.name)

            for (const file of readdirSync(modFolder, { withFileTypes: true })) {
                if (file.isDirectory()) continue
                const filePath = join(modFolder, file.name)

                if (extname(file.name) === '.pak') {
                    unpack(filePath, join(paths.modsTemp, file.name), true)

                    if (existsSync(join(paths.modsTemp, file.name, 'classes'))) {
                        const pathToModio = join(modFolder, 'modio.json')

                        let modName = basename(file.name, '.pak')
                        if (existsSync(pathToModio)) {
                            modName = JSON.parse(readFileSync(pathToModio).toString()).name
                        }

                        out.push({
                            name: modName,
                            path: filePath
                        })
                    }
                }
            }
        }
        for (const enabledModName in config.mods.items) {
            const enabledModPath = config.mods.items[enabledModName].path
            let isExists = false
            for (const founedModName in out) {
                if (out[founedModName].path === enabledModPath) {
                    isExists = true
                }
            }
            if (!isExists) {
                out.push(config.mods.items[enabledModName])
            }
        }

        return out
    }

    getModPak = () => {
        const path = openInitialDialog()
        if (!path) return undefined

        const id = basename(path, '.pak')
        const name = basename(path)
        unpack(path, join(paths.modsTemp, id), true)
        if (!existsSync(join(paths.modsTemp, id, 'classes'))) return undefined

        return { id, path, name }
    }

    getList = (listType: ListType, from?: SrcType) => {
        if (from === SrcType.dlc) {
            const array = []
            for (const dlcItem of config.dlc) {
                const path = `${dlcItem.path}\\classes`
                let items: FindItem[] = []

                if (listType === ListType.trucks) {
                    items = findInDir(join(path, 'trucks'))
                } else if (listType === ListType.trailers) {
                    items = findInDir(join(path, 'trucks', 'trailers'))
                }

                array.push({
                    dlcName: dlcItem.name,
                    items: items
                })
            }
            return array
        } else if (from === SrcType.mods) {
            const array: Item[] = []
            for (const modId in config.mods.items) {
                let items: FindItem[] = []

                const item = config.mods.items[modId]
                if (listType === ListType.trucks) {
                    items = findInDir(join(paths.modsTemp, modId, 'classes', 'trucks'), false, '.xml', true)
                } else if (listType === ListType.trailers) {
                    items = findInDir(join(paths.modsTemp, modId, 'classes', 'trucks'), false, '.xml', true)
                }

                array.push({
                    id: modId,
                    name: item.name,
                    items: items
                })
            }
            return array
        } else {
            if (listType === ListType.trucks) {
                return findInDir(join(paths.classes, 'trucks'))
            } else if (listType === ListType.trailers) {
                return findInDir(join(paths.classes, 'trucks', 'trailers'))
            }
        }
    }

    join = join
    basename = basename
}

window.listPreload = new ListPreload()
