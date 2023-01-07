import type { AnyNode, Cheerio, CheerioAPI } from 'cheerio'
import { load } from 'cheerio'

import helpers from './helpers'
import system from './system'

import { FileType, ParamType } from '#enums'
import { isNonNullable, isNullable } from '#gl-helpers'
import xmlFiles from '#pages/main/editor/services/xmlFiles'
import bridge from '#r-scripts/bridge'
import { extra, templates } from '#templates'
import type {
  IExportedData,
  IGroupParams,
  IInputParams,
  IItem, ISelectParams,
  IXMLTemplate, TemplateParams
} from '#types'

interface IHasSelector {
  selector: string
}

interface IConfig {
  filePath: string
  shortMode?: boolean
  mod?: string
  dlc?: string
  fileDOM?: CheerioAPI
  templateItems?: TemplateParams
  actions?: IXMLTemplate['actions']
}

const paths = bridge.paths

class XMLService {
  private readonly EXPORTED_FILE_VERSION = '2.0'

  /** Добавляет тег в ДОМ файла */
  addTag(fileDOM: CheerioAPI, item: IHasSelector) {
    if (!fileDOM(item.selector).length) {
      const array = item.selector.split('>').map(value => value.trim())
      const name = array.pop()
      const rootSelector = array.join(' > ')
      fileDOM(rootSelector).eq(0).append(`<${name}></${name}>`)
    }
  }

  getDOM(path: string): CheerioAPI {
    return load(system.readFileSync(path), { xmlMode: true })
  }

  getName(item: IItem, fileDOM: CheerioAPI): string {
    let name = helpers.prettyString(item.name)
    
    if (fileDOM('GameData > UiDesc').length) {
      const uiName = fileDOM('GameData > UiDesc').attr('UiName')
      if (uiName)
        name = helpers.getGameText(uiName, item.modId) || uiName
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

    if (!fileDOM)
      [fileDOM, templateItems, actions] = this.processFile(filePath)

    const fileName = system.basename(filePath)
    const globalTemplates = this.getGlobalTemplates()

    const extraFiles: IExportedData['data'] = {}
    const main: IExportedData['data'][string] = {}
    const actionsData: IExportedData['actionsData'] = {}

    if (!fileDOM || !templateItems?.length)
      return {}

    const templates = fileDOM('_templates').eq(0)

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
        if (groupItem.paramType === ParamType.group)
          calcGroup(groupItem)
        else if (groupItem.type === 'file' && !shortMode)
          calcFile(groupItem)
        else
          calcInput(groupItem)
      })
    }

    const calcFile = (item: IInputParams): void => {
      const fileNames: string[] = (String(item.value)).split(',').map(value => value.trim())

      if (item.fileType === FileType.wheels && item.attribute !== 'Type') {
        fileDOM!('Truck > TruckData > CompatibleWheels').map((_, el) => {
          const type = fileDOM!(el).attr('Type')
          if (!fileNames.includes(<string>type))
            fileNames.push(<string>type)
        })
      }

      fileNames.forEach(fileName => {
        const pathsToFiles = [`${paths.classes}\\${item.fileType}\\${fileName}.xml`]
        let mainPath: string | undefined
        let itemMod = mod

        if (dlc)
          pathsToFiles.push(`${paths.dlc}\\${dlc}\\classes\\${item.fileType}\\${fileName}.xml`)
        else if (mod)
          pathsToFiles.push(`${paths.modsTemp}\\${mod}\\classes\\${item.fileType}\\${fileName}.xml`)

        pathsToFiles.forEach(path => {
          if (system.existsSync(path))
            mainPath = path
        })

        if (!mainPath) {
          mainPath = this.findFromDLC(fileName, item.fileType!)
          itemMod = undefined
        }
        if (!mainPath) return

        const [_, templateItems, actions] = this.processFile(mainPath)

        let fileDOM: CheerioAPI | undefined
        xmlFiles.files.forEach(file => {
          if (file.path === mainPath)
            fileDOM = file.dom
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

    templateItems.forEach(tItem => {
      if (tItem.paramType === ParamType.input) {
        if (tItem.type === 'file' && !shortMode)
          calcFile(tItem)
        else
          calcInput(tItem)
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
    globalTemplates: CheerioAPI,
    item: IInputParams | ISelectParams
  ): string | number | undefined {
    const template = globalTemplates(`${tagName} > ${templateName}`)

    if (template.length) {
      const templateValue = template.attr(item.attribute)
      if (templateValue) return templateValue

      const el2 = template.find(tagName).eq(0)
      if (el2.length) {
        const templateValue2 = el2.attr(item.attribute)
        if (templateValue2) return templateValue2
      }
    }
    return item.value
  }

  getGlobalTemplates(): CheerioAPI {
    const filePath = system.join(paths.mainTemp, '[media]/_templates/trucks.xml')
    const fileData = system.readFileSync(filePath)

    return load(fileData, { xmlMode: true })
  }

  processFile(filePath: string): [CheerioAPI, TemplateParams, IXMLTemplate['actions']] | never {
    const fileData = system.readFileSync(filePath)
    const fileName = system.basename(filePath, '.xml')
    const actions: IXMLTemplate['actions'] = []
    let dom: CheerioAPI
    let name: keyof typeof templates | undefined

    if (!fileData)
      throw new Error('File process failed')

    dom = load(fileData, { xmlMode: true })

    for (const tmp in templates) {
      if (templates[tmp].selector && dom(templates[tmp].selector).length) {
        name = <keyof typeof templates> tmp
        break
      }
    }

    if (!name)
      return [load('<error/>'), [], []]

    const result = this.getParameters(dom.html(), name, fileName)
    dom = load(result.dom, { xmlMode: true })

    if (result.actions.length) {
      result.actions.forEach(action => {
        const actionData = action.data
        if (actionData.isActive(dom, fileName))
          actions.push(action)
      })
    }

    return [dom, result.params, actions]
  }

  getParameters(
    domString: string,
    name: keyof typeof templates,
    fileName: string
  ) {
    const fileDOM = load(domString, { xmlMode: true })
    const mainActions = templates[name].actions
    const extraActions = extra[fileName]?.actions
    const extraTemplate = extra[fileName]?.template
    const extraExclude = extra[fileName]?.exclude

    let resultActions: IXMLTemplate['actions'] = []
    let params = templates[name].template.getParams({ fileDOM })

    if (mainActions)
      resultActions.push(...mainActions)

    if (extraTemplate) {
      params = [
        ...params,
        ...extraTemplate({ fileDOM })
      ]
    }

    if (extraActions)
      resultActions.push(...extraActions)

    if (extraExclude)
      resultActions = resultActions.filter(action => !extraExclude.includes(action))

    return {
      dom: fileDOM.html(),
      actions: resultActions,
      params
    }
  }

  getFromTemplates(
    fileDOM: CheerioAPI,
    templates: Cheerio<AnyNode>,
    globalTemplates: CheerioAPI,
    item: IInputParams | ISelectParams
  ): string | number | undefined {
    let el = fileDOM(item.selector)
    const array = item.selector.split(' ')
      .map(value => value.trim())
      .filter(value => value !== '>')
    const innerName = array.slice(array.length - 1)[0]
    const tagName = innerName.split('[')[0]

    if (!el.length)
      el = fileDOM(array.slice(0, array.length - 1).join(' > '))

    if (el.length) {
      let templateName = el.attr('_template')
      if (!templateName)
        templateName = this.getParentTemplate(el)

      if (templateName) {
        const template = templates.find(templateName).eq(0)
        if (template.length) {
          const templateValue = template.attr(item.attribute)
          if (templateValue) return templateValue

          const el2 = template.find(tagName).eq(0)
          if (el2.length) {
            const templateValue2 = el2.attr(item.attribute)
            if (templateValue2) return templateValue2

            const templateName1 = el2.attr('_template')
            if (templateName1) return this.getValueInGlobal(templateName1, tagName, globalTemplates, item)
          }
        }
        else {
          return this.getValueInGlobal(templateName, tagName, globalTemplates, item)
        }
      }
    }
  }

  private findFromDLC(fileName: string, type: string): string | undefined {
    const dlcFolders = system.readdirSync(paths.dlc)
    for (let i = 0; i < dlcFolders.length; ++i) {
      const path = system.join(paths.dlc, dlcFolders[i], 'classes', type, `${fileName}.xml`)
      if (system.existsSync(path))
        return path
    }
  }

  private getValue(
    fileDOM: CheerioAPI,
    templates: Cheerio<AnyNode>,
    globalTemplates: CheerioAPI,
    item: IInputParams | ISelectParams
  ): string | number | undefined {
    let value = fileDOM(item.selector).attr(item.attribute) ?? item.value

    if (!value && value !== 0 && templates.length)
      value = this.getFromTemplates(fileDOM, templates, globalTemplates, item)

    if (isNullable(value))
      value = item.default

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

export default new XMLService()
