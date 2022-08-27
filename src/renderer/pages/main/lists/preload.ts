import {existsSync, readdirSync, readFileSync, rmSync} from 'fs'
import {homedir, userInfo} from 'os'
import {basename, extname, join} from 'path'

import {Category, SrcType} from 'enums'
import {findInDir} from 'main/scripts/service'
import {config} from 'scripts/config'
import {main} from 'scripts/main'
import type {FindItem, Item, ListPreload} from 'types'

const ipc = window.ipc
const { unpack, getInitial, paths } = main
const { dlc, mods } = config

function removeDir(path: string) {
    rmSync(path, { recursive: true })
}

async function findMods() {
    const pathToUser = userInfo().homedir || homedir() || process.env.HOME
    const out: { name: string; path: string }[] = []

    if (!existsSync(pathToUser))
        return []

    const pathToMods = join(pathToUser, 'Documents/My Games/SnowRunner/base/Mods/.modio/mods')
    if (!existsSync(pathToMods))
        return []

    readdirSync(pathToMods, { withFileTypes: true }).forEach(folder => {
        if (folder.isFile())
            return

        const modFolder = join(pathToMods, folder.name)

        readdirSync(modFolder, { withFileTypes: true }).forEach(file => {
            if (file.isDirectory())
                return

            const filePath = join(modFolder, file.name)
            const tempModFolder = join(paths.modsTemp, file.name)
            if (extname(file.name) === '.pak') {
                unpack(filePath, tempModFolder, true)
                if (existsSync(join(tempModFolder, 'classes'))) {
                    const pathToModio = join(modFolder, 'modio.json')
                    let modName = basename(file.name, '.pak')
                    if (existsSync(pathToModio))
                        modName = JSON.parse(readFileSync(pathToModio).toString()).name

                    out.push({
                        name: modName,
                        path: filePath
                    })
                }
            }
        })
    })

    for (const enabledModName in mods.items) {
        const enabledModPath = mods.items[enabledModName].path
        let isExists = false

        for (const foundedModName in out) {
            if (out[foundedModName].path === enabledModPath)
                isExists = true
        }
    
        if (!isExists)
            out.push(mods.items[enabledModName])
    }

    return out
}

function getModPak() {
    const path = getInitial()
    if (!path)
        return

    const name = basename(path)
    const id = basename(path, '.pak')
    unpack(path, join(paths.modsTemp, id), true)
    if (!existsSync(join(paths.modsTemp, id, 'classes')))
        return

    return { id, path, name }
}

function getList(category: Category, from?: SrcType) {
    if (from === SrcType.dlc) {
        const array = []

        dlc.forEach(dlcItem => {
            const path = `${dlcItem.path}/classes`
            let items: FindItem[] = []

            if (category === Category.trucks)
                items = findInDir(join(path, 'trucks'))
            else if (category === Category.trailers)
                items = findInDir(join(path, 'trucks/trailers'))

            array.push({
                dlcName: dlcItem.name,
                items
            })
        })

        return array
    }
    if (from === SrcType.mods) {
        const array: Item[] = []

        for (const modId in mods.items) {
            const item = mods.items[modId]
            let items: FindItem[] = []

            if (category === Category.trucks)
                items = findInDir(join(paths.modsTemp, modId, 'classes/trucks'), false, '.xml', true)
            else if (category === Category.trailers)
                items = findInDir(join(paths.modsTemp, modId, 'classes/trucks'), false, '.xml', true)

            array.push({
                id: modId,
                name: item.name,
                items
            })
        }
        return array
    }

    if (category === Category.trucks)
        return findInDir(join(paths.classes, 'trucks'))
    
    if (category === Category.trailers)
        return findInDir(join(paths.classes, 'trucks/trailers'))
}

window['listPreload'] = <ListPreload>{
    findMods,
    getList,
    getModPak,
    removeDir
}

const resizeHandlers = new Set<()=>void>()
let resizeIsHandled = false
ipc.on('window-resize', () => resizeHandlers.forEach(handler => handler()))

window['onResize'] = (callback: ()=>void) => {
    if (!resizeIsHandled) {
        ipc.send('enable-list-resize')
        resizeIsHandled = true
    }
    resizeHandlers.add(callback)
}
window['removeResizeHandler'] = (callback: ()=>void) => {
    resizeHandlers.delete(callback)
}
