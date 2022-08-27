import type {AnyNode, Cheerio, CheerioAPI} from 'cheerio'
import {load} from 'cheerio'
import {FileType, ParamType} from 'enums'
import {XMLFiles} from 'pages/main/editor/xmlFiles'
import {main} from 'scripts/main'
import {extra, templates} from 'templates'
import type {ExportedData, GroupParams, InputParams, SelectParams, TemplateParams, XMLTemplate} from 'types'

const EXPORTED_FILE_VERSION = '2.0'

const { join, basename, readFileSync, existsSync, readdirSync } = window.service
const { paths } = main

interface Config {
    filePath: string
    shortMode?: boolean
    mod?: string
    dlc?: string
    fileDOM?: CheerioAPI
    templateItems?: TemplateParams
    actions?: XMLTemplate['actions']
}

export function getExported(config: Config): ExportedData | ExportedData['data'][string] {
    const {
        filePath,
        mod,
        dlc,
        shortMode = false
    } = config
    let {
        fileDOM,
        templateItems,
        actions
    } = config

    if (!fileDOM)
        [fileDOM, templateItems, actions] = process(filePath)

    const fileName = basename(filePath)
    const globalTemplates = getGlobalTemplates()

    const extraFiles: ExportedData['data'] = {}
    const main: ExportedData['data'][string] = {}
    const actionsData: ExportedData['actionsData'] = {}

    if (!fileDOM || !templateItems.length)
        return

    const templates = fileDOM('_templates').eq(0)

    function calcInput(item: InputParams) {
        const { selector, attribute } = item
        const value = getValue(fileDOM, templates, globalTemplates, item)

        if (value !== null && value !== undefined) {
            main[selector] = {
                ...main[selector],
                [attribute]: value
            }
        }
    }

    function calcGroup(item: GroupParams) {
        item.groupItems.forEach(groupItem => {
            if (groupItem.paramType === ParamType.group)
                calcGroup(groupItem)
            else if (groupItem.type === 'file' && !shortMode)
                calcFile(groupItem)
            else
                calcInput(groupItem)
        })
    }

    function calcFile(item: InputParams) {
        const fileNames: string[] = (String(item.value)).split(',').map(value => value.trim())

        if (item.fileType === FileType.wheels && item.attribute !== 'Type') {
            fileDOM('Truck > TruckData > CompatibleWheels').map((_, el) => {
                const type = fileDOM(el).attr('Type')
                if (!fileNames.includes(type))
                    fileNames.push(type)
            })
        }

        fileNames.forEach(fileName => {
            const pathsToFiles = [`${paths.classes}\\${item.fileType}\\${fileName}.xml`]
            let mainPath: string
            let itemMod = mod

            if (dlc)
                pathsToFiles.push(`${paths.dlc}\\${dlc}\\classes\\${item.fileType}\\${fileName}.xml`)
            else if (mod)
                pathsToFiles.push(`${paths.modsTemp}\\${mod}\\classes\\${item.fileType}\\${fileName}.xml`)

            pathsToFiles.forEach(path => {
                if (existsSync(path))
                    mainPath = path
            })

            if (!mainPath) {
                mainPath = findFromDLC(fileName, item.fileType)
                itemMod = undefined
            }
            if (!mainPath)
                return

            const [_, templateItems, actions] = process(mainPath)

            let fileDOM = null
            XMLFiles.forEach(file => {
                if (file.path === mainPath)
                    fileDOM = file.dom
            })

            extraFiles[`${fileName}.xml`] = getExported({
                fileDOM,
                templateItems,
                actions,
                shortMode: true,
                filePath: mainPath,
                mod: itemMod,
                dlc
            }) as ExportedData['data'][string]
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
        actions.forEach(action => {
            const obj = action.data.export(fileDOM)
            if (!obj) return

            actionsData[action.data.id] = obj
        })

        return <ExportedData> {
            fileName,
            data: {
                [fileName]: main,
                ...extraFiles
            },
            actionsData,
            version: EXPORTED_FILE_VERSION
        }
    }

    return main
}

export function getValueInGlobal(templateName: string, tagName: string, globalTemplates: CheerioAPI, item: InputParams | SelectParams) {
    const template = globalTemplates(`${tagName} > ${templateName}`)

    if (template.length) {
        const templateValue = template.attr(item.attribute)
        if (templateValue)
            return templateValue

        const el2 = template.find(tagName).eq(0)
        if (el2.length) {
            const templateValue2 = el2.attr(item.attribute)
            if (templateValue2)
                return templateValue2
        }
    }
    return item.value
}

export function getGlobalTemplates() {
    const filePath = join(paths.mainTemp, '[media]/_templates/trucks.xml')
    const fileData = readFileSync(filePath)

    return load(fileData, { xmlMode: true })
}

export function process(filePath: string): [CheerioAPI, TemplateParams, XMLTemplate['actions']] {
    const fileData = readFileSync(filePath)
    const fileName = basename(filePath, '.xml')
    const actions: XMLTemplate['actions'] = []
    let dom: CheerioAPI
    let name: keyof typeof templates

    if (!fileData)
        return

    dom = load(fileData, { xmlMode: true })

    for (const tmp in templates) {
        if (templates[tmp].selector && dom(templates[tmp].selector).length) {
            name = tmp as keyof typeof templates
            break
        }
    }
  
    if (!name)
        return [load('<error/>'), [], []]

    const result = getParams(dom.html(), name, fileName)
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

function findFromDLC(fileName: string, type: string) {
    const dlcFolders = readdirSync(paths.dlc)
    for (let i = 0; i < dlcFolders.length; ++i) {
        const path = join(paths.dlc, dlcFolders[i], 'classes', type, `${fileName}.xml`)
        if (existsSync(path))
            return path
    }
}

function getValue(fileDOM: CheerioAPI, templates: Cheerio<AnyNode>, globalTemplates: CheerioAPI, item: InputParams | SelectParams) {
    let value = fileDOM(item.selector).attr(item.attribute) ?? item.value

    if (!value && value !== 0 && templates.length)
        value = getFromTemplates(fileDOM, templates, globalTemplates, item)

    if (value === null || value === undefined)
        value = item.default

    return value
}

function getParentTemplate(el: any) {
    if (el.parentElement) {
        const template = el.parentElement.getAttribute('_template')
        if (template)
            return template
        return getParentTemplate(el.parentElement)
    }
}

export function getParams(domString: string, name: keyof typeof templates, fileName: string) {
    const fileDOM = load(domString, { xmlMode: true })
    const mainActions = templates[name].actions
    const extraActions = extra[fileName]?.actions
    const extraTemplate = extra[fileName]?.template
    const extraExclude = extra[fileName]?.exclude

    let resultActions: XMLTemplate['actions'] = []
    let params = <TemplateParams>templates[name].template({ fileDOM })

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

export function getFromTemplates(fileDOM: CheerioAPI, templates: Cheerio<AnyNode>, globalTemplates: CheerioAPI, item: InputParams | SelectParams) {
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
            templateName = getParentTemplate(el)

        if (templateName) {
            const template = templates.find(templateName).eq(0)
            if (template.length) {
                const templateValue = template.attr(item.attribute)

                if (templateValue)
                    return templateValue

                const el2 = template.find(tagName).eq(0)
                if (el2.length) {
                    const templateValue2 = el2.attr(item.attribute)

                    if (templateValue2)
                        return templateValue2

                    const templateName1 = el2.attr('_template')
                    if (templateName1)
                        return getValueInGlobal(templateName1, tagName, globalTemplates, item)
                }
            }
            else {
                return getValueInGlobal(templateName, tagName, globalTemplates, item)
            }
        }
    }
}
