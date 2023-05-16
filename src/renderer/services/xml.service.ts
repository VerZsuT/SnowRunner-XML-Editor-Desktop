import { XMLDOM } from '../scripts/xml'
import helpers from './helpers.service'
import system from './system.service'

import { FileType, ParamType } from '#g/enums'
import type {
  IExportedData,
  IGroupParams,
  IInputParams,
  IItem, ISelectParams,
  IXMLElement,
  IXMLTemplate, TemplateParams
} from '#g/types'
import { hasItems, isNonNullable, isNullable } from '#g/utils'
import xmlFiles from '#r/pages/main/editor/services/xmlFiles'
import bridge from '#r/scripts/bridge'
import { extra, templates } from '#r_editor/templates'

interface IHasSelector {
  selector: string
}

interface IConfig {
  filePath: string
  shortMode?: boolean
  mod?: string
  dlc?: string
  fileDOM?: IXMLElement
  templateItems?: TemplateParams
  actions?: IXMLTemplate['extraActions']
}

const paths = bridge.paths

class XMLService {
  private readonly EXPORTED_FILE_VERSION = '2.0'

  /** Добавляет тег в DOM файла */
  addTag(fileDOM: IXMLElement, item: IHasSelector): void {
    if (!fileDOM.has(item.selector)) {
      const array = item.selector.split('>').map(value => value.trim())
      const name = array.pop() as string
      const rootSelector = array.join(' > ')

      fileDOM.select(rootSelector).appendTag(name)
    }
  }

  getDOM(path: string): IXMLElement {
    return XMLDOM.fromPath(path)
  }

  getName(item: IItem, fileDOM: IXMLElement): string {
    let name = helpers.prettyString(item.name)

    if (fileDOM.has('GameData > UiDesc')) {
      const uiName = fileDOM.select('GameData > UiDesc').getAttr('UiName')
      if (uiName) {
        name = helpers.getGameText(uiName, item.modId) || uiName
      }
    }
    return name
  }

  exportFile(config: IConfig, saveName: string): boolean {
    const exported = this.exportToObject(config)
    const path = bridge.saveEPF(saveName)
    if (!path) return false

    system.writeFileSync(path, JSON.stringify(exported, null, '\t'))
    return true
  }

  exportToObject(config: IConfig): IExportedData | IExportedData['data'][string] {
    const { filePath, mod, dlc, shortMode = false } = config
    let { fileDOM, templateItems, actions = undefined } = config

    if (!fileDOM) {
      [fileDOM, templateItems, actions] = this.processFile(filePath)
    }

    const fileName = system.basename(filePath)
    const globalTemplates = this.getGlobalTemplates()

    const extraFiles: IExportedData['data'] = {}
    const main: IExportedData['data'][string] = {}
    const actionsData: IExportedData['actionsData'] = {}

    if (!fileDOM || !hasItems(templateItems)) {
      return {}
    }

    const templates = fileDOM.select('_templates')

    const calcInput = (item: IInputParams): void => {
      const { selector, attribute } = item
      const value = this.getValue(fileDOM!, templates, globalTemplates, item)

      if (isNonNullable(value)) {
        main[selector] = {
          ...main[selector],
          [attribute]: value
        }
      }
    }

    const calcGroup = (item: IGroupParams): void => {
      item.groupItems.forEach(groupItem => {
        if (groupItem.paramType === ParamType.group) {
          calcGroup(groupItem)
        }
        else if (groupItem.type === 'file' && !shortMode) {
          calcFile(groupItem)
        }
        else {
          calcInput(groupItem)
        }
      })
    }

    const calcFile = (item: IInputParams): void => {
      const fileNames: string[] = (String(item.value)).split(',').map(value => value.trim())

      if (item.fileType === FileType.wheels && item.attribute !== 'Type') {
        fileDOM!.selectAll('Truck > TruckData > CompatibleWheels').map(element => {
          const type = element.getAttr('Type')
          if (!fileNames.includes(type as string)) {
            fileNames.push(type as string)
          }
        })
      }

      fileNames.forEach(fileName => {
        const pathsToFiles = [`${paths.classes}\\${item.fileType}\\${fileName}.xml`]
        let mainPath: string | undefined
        let itemMod = mod

        if (dlc) {
          pathsToFiles.push(`${paths.dlc}\\${dlc}\\classes\\${item.fileType}\\${fileName}.xml`)
        }
        else if (mod) {
          pathsToFiles.push(`${paths.modsTemp}\\${mod}\\classes\\${item.fileType}\\${fileName}.xml`)
        }

        pathsToFiles.forEach(path => {
          if (system.existsSync(path)) {
            mainPath = path
          }
        })

        if (!mainPath) {
          mainPath = this.findFromDLC(fileName, item.fileType!)
          itemMod = undefined
        }
        if (!mainPath) return

        const [_, templateItems, actions] = this.processFile(mainPath)

        let fileDOM: IXMLElement | undefined
        xmlFiles.files.forEach(file => {
          if (file.path === mainPath) {
            fileDOM = file.dom
          }
        })

        extraFiles[`${fileName}.xml`] = this.exportToObject({
          fileDOM,
          templateItems,
          actions,
          shortMode: true,
          filePath: mainPath,
          mod: itemMod,
          dlc
        }) as IExportedData['data'][string]
      })
    }

    templateItems!.forEach(tItem => {
      if (tItem.paramType === ParamType.input) {
        if (tItem.type === 'file' && !shortMode) {
          calcFile(tItem)
        }
        else {
          calcInput(tItem)
        }
      }
      else if (tItem.paramType === ParamType.group) {
        calcGroup(tItem)
      }
    })

    if (!shortMode) {
      actions?.forEach(action => {
        const obj = action.data.export(fileDOM!)
        if (!obj) return

        actionsData[action.data.id] = obj
      })

      return <IExportedData>{
        fileName,
        data: {
          [fileName]: main,
          ...extraFiles
        },
        actionsData,
        version: this.EXPORTED_FILE_VERSION
      }
    }

    return main
  }

  getValueInGlobal(
    templateName: string,
    tagName: string,
    globalTemplates: IXMLElement,
    item: IInputParams | ISelectParams
  ): string | number | undefined {
    const template = globalTemplates.select(`${tagName} > ${templateName}`)

    if (template.exists) {
      const templateValue = template.getAttr(item.attribute)
      if (templateValue) return templateValue

      const el2 = template.select(tagName)
      if (el2.exists) {
        const templateValue2 = el2.getAttr(item.attribute)
        if (templateValue2) return templateValue2
      }
    }
    return item.value
  }

  getGlobalTemplates(): IXMLElement {
    const filePath = system.join(paths.mainTemp, '[media]/_templates/trucks.xml')
    return XMLDOM.fromPath(filePath)
  }

  processFile(filePath: string): [IXMLElement, TemplateParams, IXMLTemplate['extraActions']] | never {
    const fileData = system.readFileSync(filePath)
    const fileName = system.basename(filePath, '.xml')
    const actions: IXMLTemplate['extraActions'] = []
    let dom: IXMLElement
    let name: keyof typeof templates | undefined

    if (!fileData) {
      throw new Error('File process failed')
    }

    dom = XMLDOM.fromString(fileData)

    for (const tmp in templates) {
      if (templates[tmp].selector && dom.has(templates[tmp].selector)) {
        name = <keyof typeof templates>tmp
        break
      }
    }

    if (!name) {
      return [XMLDOM.fromString('<error/>'), [], []]
    }

    const result = this.getParameters(dom.toHTML()!, name, fileName)
    dom = XMLDOM.fromString(result.domString)

    if (hasItems(result.actions)) {
      result.actions.forEach(action => {
        const actionData = action.data
        if (actionData.isActive(dom, fileName)) {
          actions.push(action)
        }
      })
    }

    return [dom, result.params, actions]
  }

  getParameters(
    domString: string,
    name: keyof typeof templates,
    fileName: string
  ) {
    const fileDOM = XMLDOM.fromString(domString)
    const mainActions = templates[name].extraActions
    const extraActions = extra[fileName]?.actions
    const extraTemplate = extra[fileName]?.template
    const extraExclude = extra[fileName]?.exclude

    let resultActions: IXMLTemplate['extraActions'] = []
    let params = templates[name].template.getParams({ fileDOM })

    if (mainActions) {
      resultActions.push(...mainActions)
    }

    if (extraTemplate) {
      params = [
        ...params,
        ...extraTemplate({ fileDOM })
      ]
    }

    if (extraActions) {
      resultActions.push(...extraActions)
    }

    if (extraExclude) {
      resultActions = resultActions.filter(action => !extraExclude.includes(action))
    }

    return {
      domString: fileDOM.toHTML(),
      actions: resultActions,
      params
    }
  }

  getFromTemplates(
    fileDOM: IXMLElement,
    templates: IXMLElement,
    globalTemplates: IXMLElement,
    item: IInputParams | ISelectParams
  ): string | number | undefined {
    let el: IXMLElement
    const array = item.selector.split(' ')
      .map(value => value.trim())
      .filter(value => value !== '>')
    const innerName = array.slice(array.length - 1)[0]
    const tagName = innerName.split('[')[0]

    if (!fileDOM.has(item.selector)) {
      el = fileDOM.select(array.slice(0, array.length - 1).join(' > '))
    }
    else {
      el = fileDOM.select(item.selector)
    }

    let templateName = el.getAttr('_template')
    if (!templateName) {
      templateName = this.getParentTemplate(el)
    }

    if (templateName) {
      const template = templates.select(templateName)
      if (template.exists) {
        const templateValue = template.getAttr(item.attribute)
        if (templateValue) return templateValue

        const el2 = template.select(tagName)
        if (el2.exists) {
          const templateValue2 = el2.getAttr(item.attribute)
          if (templateValue2) return templateValue2

          const templateName1 = el2.getAttr('_template')
          if (templateName1) return this.getValueInGlobal(templateName1, tagName, globalTemplates, item)
        }
      }
      else {
        return this.getValueInGlobal(templateName, tagName, globalTemplates, item)
      }
    }
  }

  private findFromDLC(fileName: string, type: string): string | undefined {
    const dlcFolders = system.readdirSync(paths.dlc)
    for (let i = 0; i < dlcFolders.length; ++i) {
      const path = system.join(paths.dlc, dlcFolders[i], 'classes', type, `${fileName}.xml`)
      if (system.existsSync(path)) {
        return path
      }
    }
  }

  private getValue(
    fileDOM: IXMLElement,
    templates: IXMLElement,
    globalTemplates: IXMLElement,
    item: IInputParams | ISelectParams
  ): string | number | undefined {
    let value = fileDOM.select(item.selector).getAttr(item.attribute) ?? item.value

    if (!value && value !== 0) {
      value = this.getFromTemplates(fileDOM, templates, globalTemplates, item)
    }

    if (isNullable(value)) {
      value = item.default
    }

    return value
  }

  private getParentTemplate(el: any): string | undefined {
    if (el.parentElement) {
      const template = el.parentElement.getAttribute('_template')
      if (template) return template

      return this.getParentTemplate(el.parentElement)
    }
  }
}

const xml = new XMLService()

export default xml
