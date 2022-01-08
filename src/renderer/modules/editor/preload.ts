import { existsSync, readdirSync, writeFileSync, readFileSync } from 'fs'
import { join, basename } from 'path'
import 'scripts/provider'
import { findInDir } from 'main/service'

const { paths } = window.provider

class EditorPreload implements IEditorPreload {
    findFromDLC = (fileName: string, type: string) => {
        for (const dlcFolder of readdirSync(paths.dlc)) {
            const path = join(paths.dlc, dlcFolder, 'classes', type, `${fileName}.xml`)
            if (existsSync(path)) {
                return path
            }
        }
    }

    getAddons = (truckName: string, modId?: string, filter?: (fileDOM: Document) => boolean) => {
        const allAddons: FindItem[] = []

        const pathToTuning = join(paths.classes, `trucks/${truckName}_tuning`)
        if (existsSync(pathToTuning)) {
            allAddons.push(...readdirSync(pathToTuning, { withFileTypes: true }).map(item => {
                if (item.isDirectory()) return null
                return {
                    name: item.name,
                    path: join(pathToTuning, item.name)
                }
            }))
        }

        const pathToBasic = join(paths.classes, `trucks/addons`)
        if (existsSync(pathToBasic)) {
            allAddons.push(...readdirSync(pathToBasic).map(name => {
                return {
                    name,
                    path: join(pathToBasic, name)
                }
            }))
        }

        for (const dlcFolder of readdirSync(paths.dlc)) {
            const pathToDLCTrucks = join(paths.dlc, dlcFolder, 'classes/trucks')
            if (existsSync(pathToDLCTrucks)) {
                const pathToDLCBasic = join(pathToDLCTrucks, 'addons')
                if (existsSync(pathToDLCBasic)) {
                    allAddons.push(...readdirSync(pathToDLCBasic).map(name => {
                        return {
                            name,
                            path: join(pathToDLCBasic, name)
                        }
                    }))
                }
                for (const item of readdirSync(pathToDLCTrucks, { withFileTypes: true })) {
                    if (item.isDirectory() && item.name.endsWith('_tuning')) {
                        allAddons.push(...readdirSync(join(pathToDLCTrucks, item.name)).map(name => {
                            return {
                                name,
                                path: join(pathToDLCTrucks, item.name, name)
                            }
                        }))
                    }
                }
            }
        }

        if (modId) {
            allAddons.push(...findInDir(join(paths.modsTemp, modId, 'classes'), false, '.xml', true).filter(item => {
                const parser = new DOMParser()
                if (!existsSync(item.path)) return false
                const fileData = `<root>${readFileSync(item.path).toString()}</root>`
                if (parser.parseFromString(fileData, 'text/xml').querySelector('TruckAddon')) {
                    return true
                }
                return false
            }))
        }

        const out: FindItem[] = []
        for (const addon of allAddons) {
            if (filter) {
                const parser = new DOMParser()
                const fileData = `<root>${readFileSync(addon.path).toString()}</root>`
                if (filter(parser.parseFromString(fileData, 'text/xml'))) {
                    out.push(addon)
                }
            } else {
                out.push(addon)
            }
        }

        return out
    }

    saveFile = writeFileSync
    join = join
    basename = basename
    existsSync = existsSync
    readFile = readFileSync
}

window.editorPreload = new EditorPreload()
