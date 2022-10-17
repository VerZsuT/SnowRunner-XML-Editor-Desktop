import type { AnyNode, Cheerio, CheerioAPI } from 'cheerio'
import { Bridge } from 'emr-bridge/renderer'

import { xmlFiles } from '../services/xmlFiles'

import { FileType, PreloadType } from '#enums'
import { paramsDefaults } from '#r-scripts/defaults'
import { preload, system, xml } from '#services'
import type { IDefaults, IEditorPreload, IInputParams, IMPC, TemplateParams } from '#types'

const bridge = Bridge.as<IMPC>()
const paths = bridge.paths

const { findFromDLC } = preload.get<IEditorPreload>(PreloadType.editor)

interface InnerItem {
  filePath: string
  fileName: string
  fileDOM: CheerioAPI
  mod: string
  dlc: string
  templates: Cheerio<AnyNode>
  tableItems: TemplateParams
  defaults: IDefaults[string]
}

interface Config {
  item: IInputParams
  dlc: string
  mod: string
  fileDOM: CheerioAPI
  regFiles?: boolean
}

export function parseFile(config: Config) {
  const { dlc, mod, fileDOM, item, regFiles } = config
  const items: InnerItem[] = []
  const propsItem: IInputParams = item
  const fileNames: string[] = (String(propsItem.value)).split(',').map(value => value.trim())

  if (propsItem.fileType === FileType.wheels && propsItem.attribute !== 'Type') {
    fileDOM('Truck > TruckData > CompatibleWheels').map((_, el) => {
      const type = fileDOM(el).attr('Type')
      if (type && !fileNames.includes(type)) {
        fileNames.push(type)
      }
    })
  }

  fileNames.forEach(fileName => {
    const pathsToFiles = [`${paths.classes}\\${propsItem.fileType}\\${fileName}.xml`]
    let mainPath: string | undefined
    let itemDLC: string | undefined
    let itemMod: string | undefined

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
      if (system.existsSync(path)) {
        mainPath = path
      }
    })

    if (!mainPath) {
      const path = findFromDLC(fileName, propsItem.fileType as string)
      if (!path) return

      mainPath = path
      itemMod = undefined
    }

    const [fileDOM, tableItems] = xml.processFile(mainPath)

    if (regFiles) {
      xmlFiles.add({
        mod: itemMod!,
        dlc: itemDLC!,
        dom: fileDOM,
        path: mainPath,
        type: propsItem.fileType!
      })
    }

    items.push({
      filePath: mainPath,
      fileName,
      fileDOM,
      dlc: itemDLC!,
      mod: itemMod!,
      templates: fileDOM('_templates'),
      tableItems,
      defaults: paramsDefaults[`${fileName}.xml`] || {}
    })
  })

  return items
}
