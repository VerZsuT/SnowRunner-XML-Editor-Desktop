import type {ReactNode} from 'react'

import {message} from 'antd'
import type {CheerioAPI} from 'cheerio'
import {ParamType} from 'enums'
import memoizee from 'memoizee'
import {main} from 'scripts/main'
import type {ExportedData, TemplateParams, XMLTemplate} from 'types'

import {Group} from './components/Group'
import {Parameter} from './components/Parameter'
import {importHandlers} from './import'
import {editorTexts} from './texts'
import {XMLFiles} from './xmlFiles'


const { basename, readFileSync } = window.service
const { getEPF } = main
const { PARAMS_FILE_NOT_FOUND, WAS_IMPORTED, BREAK_IMPORT_INVALID_NAME } = editorTexts

interface HasSelector {
    selector: string
}

export const parseItems = memoizee((items: TemplateParams) => {
    const children: ReactNode[] = []

    items.forEach(item => {
        const isGroup = item.paramType === ParamType.group
        const hasItems = item.groupItems.length > 0

        if (isGroup && hasItems)
            children.push(<Group key={item.selector} item={item} />)
        else if (!isGroup)
            children.push(<Parameter key={item.selector} item={item} />)
    })

    return children
})

export function importFile(currentPath: string, fileDOM: CheerioAPI, actions: XMLTemplate['actions'], importPath?: string) {
    const currentFileName = basename(currentPath)
    let pathToImport = importPath

    if (typeof importPath !== 'string')
        pathToImport = getEPF()

    if (!pathToImport) {
        message.error(PARAMS_FILE_NOT_FOUND)
        return
    }
    const data: ExportedData | ExportedData[] = JSON.parse(readFileSync(pathToImport))

    function importData(item: ExportedData) {
        for (const fileName in item.data) {
            let dom: CheerioAPI
            XMLFiles.forEach(file => {
                if (basename(file.path) === fileName)
                    dom = file.dom
            })

            for (const selector in item.data[fileName]) {
                addTag(dom, { selector })
                for (const attribute in item.data[fileName][selector])
                    dom(selector).attr(attribute, item.data[fileName][selector][attribute].toString())
            }
        }

        for (const actionID in item.actionsData) {
            actions.forEach(action => {
                if (action.data.id === actionID)
                    action.data.import(fileDOM, item.actionsData[actionID])
            })
        }

        message.success(WAS_IMPORTED)
        return true
    }

    if (Array.isArray(data)) {
        let imported = false
        data.forEach(item => {
            if (item.fileName === currentFileName && importData(item))
                imported = true
        })
        if (!imported)
            message.error(BREAK_IMPORT_INVALID_NAME.replace('%file', currentFileName))
    }
    else if (currentFileName !== data.fileName) {
        message.error(BREAK_IMPORT_INVALID_NAME.replace('%file', currentFileName))
    }
    else {
        importData(data)
    }
    importHandlers.forEach(handler => handler())
}


/** Добавляет тег в ДОМ файла */
export function addTag(fileDOM: CheerioAPI, item: HasSelector) {
    if (!fileDOM(item.selector).length) {
        const array = item.selector.split('>').map(value => value.trim())
        const name = array.pop()
        const rootSelector = array.join(' > ')
        fileDOM(rootSelector).eq(0).append(`<${name}></${name}>`)
    }
}
