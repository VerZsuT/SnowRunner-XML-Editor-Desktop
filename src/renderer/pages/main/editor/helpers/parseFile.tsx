import XMLFiles from '../services/xmlFiles'

import { FileType, PreloadType } from '#g/enums'
import type { IDefaults, IEditorPreload, IInputParams, IXMLElement, TemplateParams } from '#g/types'
import Bridge from '#r/scripts/bridge'
import paramsDefaults from '#r/scripts/defaults'
import { Preload, System, XML } from '#r/services'

interface InnerItem {
  filePath: string
  fileName: string
  fileDOM: IXMLElement
  mod: string
  dlc: string
  templates: IXMLElement
  tableItems: TemplateParams
  defaults: IDefaults[string]
}

interface Config {
  item: IInputParams
  dlc: string
  mod: string
  fileDOM: IXMLElement
  regFiles?: boolean
}

export default function parseFile(config: Config) {
  const paths = Bridge.paths
  const preload = Preload.get<IEditorPreload>(PreloadType.editor)

  const { dlc, mod, fileDOM, item, regFiles } = config
  const items: InnerItem[] = []
  const propsItem: IInputParams = item
  const fileNames: string[] = (String(propsItem.value)).split(',').map(value => value.trim())

  if (propsItem.fileType === FileType.wheels && propsItem.attribute !== 'Type') {
    fileDOM.selectAll('Truck > TruckData > CompatibleWheels').map(element => {
      const type = element.getAttr('Type')
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
      if (System.existsSync(path)) {
        mainPath = path
      }
    })

    if (!mainPath) {
      const path = preload.findFromDLC(fileName, propsItem.fileType!)
      if (!path) return

      mainPath = path
      itemMod = undefined
    }

    const [fileDOM, tableItems] = XML.processFile(mainPath)

    if (regFiles) {
      XMLFiles.add({
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
      templates: fileDOM.select('_templates'),
      tableItems,
      defaults: paramsDefaults[`${fileName}.xml`] || {}
    })
  })

  return items
}
