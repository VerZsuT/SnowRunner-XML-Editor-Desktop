import { MessageType } from 'modules/console/enums'
import { Attrs } from './Attrs'
import { Parser } from './Parser'
import { IMessage, ITemp, Tag, TaskAction, TaskAttr } from './types'

const { readFileSync, writeFileSync } = window.consolePreload

export class Processor {
    constructor(
        private temp: ITemp,
        private attrs: Attrs,
        private parser: Parser
    ) {}

    async procTaskBlock($taskBlock: Element) {
        const messages: IMessage[] = []

        for (const attribute of Array.from($taskBlock.attributes)) {
            this.temp[attribute.name] = attribute.value
        }
        for (const $task of Array.from($taskBlock.querySelectorAll(Tag.task))) {
            try {
                messages.push(...await this.procTask($task))
            } catch (error) {
                throw new Error(`${error.message}\nОшибка на <${$taskBlock.tagName.toLowerCase()}>.`)
            }
        }

        this.temp = {}
        return messages
    }

    async procTask($task: Element) {
        const messages: IMessage[] = []
        const action = await this.attrs.get($task, TaskAttr.action)

        try {
            switch (action) {
                case TaskAction.writeFile:
                    this.temp.currentAction = TaskAction.writeFile
                    await this.procWriteFile($task, messages)
                    break
                case TaskAction.setAttribute:
                    this.temp.currentAction = TaskAction.setAttribute
                    await this.procSetAttribute($task, messages)
                    break
                default:
                    throw new Error(`Неверное содержимое атрибута <${Tag.task} ${TaskAttr.action}='${action}'/>`)
            }    
        } catch (error) {
            throw new Error(`${error.message}\nОшибка на <${$task.tagName.toLowerCase()}>.`)
        }
        
        return messages
    }

    async procWriteFile($task: Element, messages: IMessage[]) {
        const serializer = new XMLSerializer()
        const path = await this.attrs.getPath($task, messages)
        let fileData: string

        if (!$task.children.length) throw new Error(`Пустое содержимое тега <${Tag.task}>.`)
        for (const child of Array.from($task.children)) {
            fileData += serializer.serializeToString(child) + '\n'
        }

        writeFileSync(path, fileData)
        messages.push({
            text: `Файл "${$task.getAttribute('path')}" был успешно перезаписан.`,
            type: MessageType.info
        })
    }

    async procSetAttribute($task: Element, messages: IMessage[]) {
        const selector = await this.attrs.get($task, TaskAttr.attrSelector)
        const name = await this.attrs.get($task, TaskAttr.attrName)
        const path = await this.attrs.getPath($task, messages)
        const dom = new DOMParser().parseFromString(`<root>${readFileSync(path).toString()}</root>`, 'text/xml')
        let value: string
        let element: Element

        this.temp.currentDOM = dom
        this.temp.currentAttribute = name
        this.temp.currentSelector = selector
        
        if (!(element = dom.querySelector(selector)))
            throw new Error(`Элемент с селектором "${selector}" не найден.`)
        
        value = await this.parser.parse(await this.attrs.get($task, TaskAttr.attrValue))

        element.setAttribute(name, value)
        messages.push(...[
            {
                text: `Изменено значение атрибута "${name}" на "${value}".\nСелектор: "${selector}".`,
                type: MessageType.info
            }
        ])
        writeFileSync(path, new XMLSerializer().serializeToString(dom).replace('<root>', '').replace('</root>', ''))
    }
}
