import { MessageType } from 'modules/console/enums'
import { Parser } from './Parser'
import { FileType, IMessage, ITemp, Tag, TaskAttr } from './types'

const { join, existsSync } = window.consolePreload
const { paths } = window.provider

export class Attrs {
    constructor(
        private parser: Parser,
        private temp: ITemp
    ) {}
    
    async getPath($task: Element, messages: IMessage[]) {
        const path = await this.parser.parse(await this.get($task, TaskAttr.filePath))
        const source = this.getSource($task, messages)
        const absolutePath = join(source, path)

        if (!existsSync(absolutePath))
            throw new Error(`Неверный путь "${path}".`)

        return absolutePath
    }

    async get($el: Element, name: string) {
        let value = $el.getAttribute(name)
        
        if (value === null) {
            if (this.temp[name] !== undefined)
                value = this.temp[name]
            else
                throw new Error(`Не найден атрибут <${$el.tagName.toLowerCase()} ${name}>, либо он имеет недопустимое значение.`)
        }
        value = value.split('\n').filter(item => item.trim()).join(' ')

        return await this.parser.parse(value)
    }

    getSource($task: Element, messages: IMessage[]) {
        const type = $task.getAttribute(TaskAttr.fileType) ?? FileType.main
        if (!Object.keys(FileType).includes(type)) {
            messages.push({
                text: `Неверное содержимое атрибута <${Tag.task} ${TaskAttr.fileType}="${type}"/>\nТип файла был установлен как "${FileType.main}".`,
                type: MessageType.warn
            })
            return paths.mainTemp
        }
        else {
            return type === FileType.main ? paths.mainTemp : paths.modsTemp
        }
    }
}
