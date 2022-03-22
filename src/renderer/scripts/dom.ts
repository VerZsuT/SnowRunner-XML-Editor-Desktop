import { load } from 'cheerio'
import type { Cheerio, Node as CNode } from 'cheerio'
import type { JSXElementConstructor } from 'react'
import type { CheerioAPI } from 'cheerio'
import type ITemplateParams from 'templates/types/ITemplateParams'
import type ActionBase from 'templates/actions/ActionBase'
import type IActionModule from 'templates/types/IActionModule'
import type IActionProps from 'templates/types/IActionProps'
import type IEditorAction from 'modules/editor/types/IEditorAction'
import type IInputParams from 'templates/types/IInputParams'
import type IGroupParams from 'templates/types/IGroupParams'
import type ISelectParams from 'main/templates/types/ISelectParams'
import ParamType from 'templates/enums/ParamType'

import main from 'scripts/main'
import IExportData from 'modules/editor/types/IExportData'
import FileType from 'main/templates/enums/FileType'

const { join, basename, readFileSync, existsSync, readdirSync } = window.service
const { templates, getParams, paths } = main

export function getExported(filePath: string, shortMode=true, modId?: string, dlc?: string) {
    const [fileDOM, tItems, actions] = process(filePath)
    const fileName = basename(filePath)
    const version = '2.0'

    const globalTemplates = getGlobalTemplates()
    let templates: Cheerio<CNode>

    const extraFiles: any = {}
    const main: any = {}
    const actionsData: any = {}

    if (!fileDOM || !tItems.length)
        return

    templates = fileDOM('_templates').eq(0)

    function calcInput(item: IInputParams) {
        if (!main[item.selector])
            main[item.selector] = {}

        main[item.selector][item.name] = getValue(fileDOM, templates, globalTemplates, item)
    }

    function calcGroup(item: IGroupParams) {
        for (const groupItem of item.groupItems) {
            if (groupItem.paramType === ParamType.group)
                calcGroup(groupItem)
            else if (groupItem.type === 'file' && !shortMode)
                calcFile(groupItem)
            else 
                calcInput(groupItem)
        }
    }

    const calcFile = (item: IInputParams) => {
        const fileNames: string[] = (String(item.value)).split(',').map((value) => value.trim())

        if (item.fileType === FileType.wheels && item.name !== 'Type') {
            fileDOM('Truck > TruckData > CompatibleWheels').map((_, el) => {
                const type = fileDOM(el).attr('Type')
                if (!fileNames.includes(type)) {
                    fileNames.push(type)
                }
            })
        }

        for (const fileName of fileNames) {
            const pathsToFiles = [`${paths.classes}/${item.fileType}/${fileName}.xml`]
            let mainPath: string
            let itemMod = modId

            if (dlc)
                pathsToFiles.push(`${paths.dlc}/${dlc}/classes/${item.fileType}/${fileName}.xml`)
            else if (modId)
                pathsToFiles.push(`${paths.modsTemp}/${modId}/classes/${item.fileType}/${fileName}.xml`)

            for (const path of pathsToFiles) {
                if (existsSync(path)) {
                    mainPath = path
                }
            }

            if (!mainPath) {
                mainPath = findFromDLC(fileName, item.fileType)
                itemMod = undefined
            }
            if (!mainPath)
                continue

            extraFiles[`${fileName}.xml`] = getExported(mainPath, true, itemMod, dlc)
        }
    }

    for (const tItem of tItems) {
        switch (tItem.paramType) {
            case ParamType.input:
                if ((<IInputParams>tItem).type === 'file' && !shortMode)
                    calcFile(tItem as IInputParams)
                else
                    calcInput(tItem as IInputParams)
            break
            case ParamType.group:
                calcGroup(tItem as IGroupParams)
            break
        }
    }

    if (!shortMode) {
        for (const action of actions) {
            const obj = action.object.export()
            if (!obj)
                continue

            actionsData[action.id] = obj
        }

        return <IExportData> {
            fileName,
            data: {
                [fileName]: main,
                ...extraFiles
            },
            actionsData,
            version
        }
    }

    return main
}

export function getGlobalTemplates() {
    const filePath = join(paths.mainTemp, '[media]/_templates/trucks.xml')
    const fileData = readFileSync(filePath)

    return load(fileData, { xmlMode: true })
}

export function process(filePath: string): [CheerioAPI, ITemplateParams, IEditorAction[]] {
    const fileData = readFileSync(filePath)
    const fileName = basename(filePath, '.xml')
    const actions: IEditorAction[] = []
    let dom: CheerioAPI
    let name: keyof typeof templates
    let result: any

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

    result = getParams(dom.html(), name, fileName)
    dom = load(result.dom, { xmlMode: true })

    if (result.actions.length) {
        for (const actionPath of result.actions) {
            const module = <IActionModule>require(`templates/actions/${actionPath}`)
            let object: ActionBase
            if (module.data.isActive(dom, fileName)) {
                object = new module.default({ dom }, null, null)
                actions.push({
                    ...module.data,
                    component: module.default as unknown as JSXElementConstructor<IActionProps>,
                    object: object
                })
            }
        }
    }

    return [dom, result.params, actions]
}

function findFromDLC(fileName: string, type: string) {
    for (const dlcFolder of readdirSync(paths.dlc)) {
        const path = join(paths.dlc, dlcFolder, 'classes', type, `${fileName}.xml`)
        if (existsSync(path))
            return path
    }
}

function getValue(fileDOM: CheerioAPI, templates: Cheerio<CNode>, globalTemplates: CheerioAPI, item: IInputParams | ISelectParams) {
    let value = item.value

    if (!value && value !== 0 && templates.length) {
        value = getFromTemplates(fileDOM, templates, globalTemplates, item)
    }
    if (value === null || value === undefined) {
        value = item.default
    }

    return value
}

function getFromTemplates(fileDOM: CheerioAPI, templates: Cheerio<CNode>, globalTemplates: CheerioAPI, item: IInputParams | ISelectParams) {
    let el = fileDOM(item.selector)
    const array = item.selector.split(' ')
        .map(value => value.trim())
        .filter(value => value !== '>')
    const innerName = array.slice(array.length - 1)[0]
    const tagName = innerName.split('[')[0]

    if (!el.length) {
        el = fileDOM(array.slice(0, array.length - 1).join(' > '))
    }
    if (el.length) {
        let templateName = el.attr('_template')
        if (!templateName)
            templateName = getParentTemplate(el)

        if (templateName) {
            const template = templates.find(templateName).eq(0)
            if (template.length) {
                const templateValue = template.attr(item.name)
                let el2: Cheerio<CNode>

                if (templateValue)
                    return templateValue

                el2 = template.find(tagName).eq(0)
                if (el2.length) {
                    const templateValue2 = el2.attr(item.name)
                    let templateName1: string

                    if (templateValue2)
                        return templateValue2

                    templateName1 = el2.attr('_template')
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

function getParentTemplate(el: any) {
    if (el.parentElement) {
        const template = el.parentElement.getAttribute('_template')
        if (template)
            return template
        else
            return getParentTemplate(el.parentElement)
    }
}

function getValueInGlobal(templateName: string, tagName: string, globalTemplates: CheerioAPI, item: IInputParams | ISelectParams) {
    const template = globalTemplates(`${tagName} > ${templateName}`)

    if (template.length) {
        const templateValue = template.attr(item.name)
        if (templateValue) {
            return templateValue
        }
        else {
            const el2 = template.find(tagName).eq(0)
            if (el2.length) {
                const templateValue2 = el2.attr(item.name)
                if (templateValue2)
                    return templateValue2
            }
        }
    }
    return item.value
}
