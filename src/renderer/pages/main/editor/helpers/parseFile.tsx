import type {AnyNode, Cheerio, CheerioAPI} from 'cheerio'
import {FileType} from 'enums'
import {addXMLFile} from 'pages/main/editor/xmlFiles'
import {paramsDefaults} from 'scripts/defaults'
import {process} from 'scripts/dom'
import {getPreload} from 'scripts/getPreload'
import {main} from 'scripts/main'
import type {Defaults, EditorPreload, InputParams, TemplateParams} from 'types'

const { findFromDLC } = getPreload<EditorPreload>('editorPreload')
const { existsSync } = window.service
const { paths } = main

interface InnerItem {
    filePath: string
    fileName: string
    fileDOM: CheerioAPI
    mod: string
    dlc: string
    templates: Cheerio<AnyNode>
    tableItems: TemplateParams
    defaults: Defaults[string]
}

interface Config {
    item: InputParams
    dlc: string
    mod: string
    fileDOM: CheerioAPI
    regFiles?: boolean
}

export function parseFile(config: Config) {
    const { dlc, mod, fileDOM, item, regFiles } = config
    const items: InnerItem[] = []
    const propsItem: InputParams = item
    const fileNames: string[] = (String(propsItem.value)).split(',').map(value => value.trim())

    if (propsItem.fileType === FileType.wheels && propsItem.attribute !== 'Type') {
        fileDOM('Truck > TruckData > CompatibleWheels').map((_, el) => {
            const type = fileDOM(el).attr('Type')
            if (!fileNames.includes(type))
                fileNames.push(type)
        })
    }

    fileNames.forEach(fileName => {
        const pathsToFiles = [`${paths.classes}\\${propsItem.fileType}\\${fileName}.xml`]
        let mainPath: string
        let itemDLC: string
        let itemMod: string

        if (dlc) {
            const dlcPath = `${paths.dlc}\\${dlc}\\classes\\${propsItem.fileType}\\${fileName}.xml`
            pathsToFiles.push(dlcPath)
            itemDLC = dlc
        }
        else if (mod) {
            const modPath = `${paths.modsTemp}\\${mod}\\classes\\${propsItem.fileType}\\${fileName}.xml`
            pathsToFiles.push(modPath)
            itemMod = mod
        }

        pathsToFiles.forEach(path => {
            if (existsSync(path))
                mainPath = path
        })

        if (!mainPath) {
            mainPath = findFromDLC(fileName, propsItem.fileType)
            itemMod = undefined
        }
        if (!mainPath)
            return

        const [fileDOM, tableItems] = process(mainPath)

        if (regFiles) {
            addXMLFile({
                mod: itemMod,
                dlc: itemDLC,
                dom: fileDOM,
                path: mainPath,
                type: propsItem.fileType
            })
        }

        items.push({
            filePath: mainPath,
            fileName,
            fileDOM,
            dlc: itemDLC,
            mod: itemMod,
            templates: fileDOM('_templates'),
            tableItems,
            defaults: paramsDefaults[`${fileName}.xml`] || {}
        })
    })

    return items
}
