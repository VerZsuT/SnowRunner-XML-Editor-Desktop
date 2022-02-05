import { MessageType } from 'modules/console/enums'
import { mainProcess } from '../mainProcess'
import { Attrs } from './Attrs'
import { Checker } from './Checker'
import { Parser } from './Parser'
import { Processor } from './Processor'
import { Props } from './Props'
import {
    IMessage,
    MainAttr,
    ConfirmFunc,
    Tag,
    PromptFunc,
    ITemp
} from './types'
import { Vars } from './Vars'

const { openXMLDialog } = mainProcess
const { readFileSync } = window.consolePreload

export class Executor {
    private vars: Vars
    private checker: Checker
    private parser: Parser
    private attrs: Attrs
    private props: Props
    private temp: ITemp
    private processor: Processor

    private fileVersion = '1.0'

    constructor(confirm: ConfirmFunc, prompt: PromptFunc) {
        this.temp = {}
        this.checker = new Checker(confirm)
        this.parser = new Parser(this.temp, prompt)
        this.attrs = new Attrs(this.parser, this.temp)
        this.vars = new Vars(this.parser)
        this.props = new Props(this.parser)
        this.processor = new Processor(this.temp, this.attrs, this.parser)

        this.parser.init(this.vars, this.props)
    }

    async exec(ignoreChecks?: boolean): Promise<IMessage[]> {
        const pathToFile = openXMLDialog()
        const messages = [] as IMessage[]
        let $data: Document
        let $root: Element

        if (!pathToFile)
            throw new Error('Файл не выбран.')

        $data = this.getDocument($data, pathToFile)
        $root = this.getRoot($root, $data)

        if (!ignoreChecks) {
            await this.checker.checkGameVersion($root)
            await this.checker.checkDLC($root)
        }

        await this.vars.set($root.querySelector(Tag.vars))

        for (const child of Array.from($root.children)) {
            if (child.nodeName.toLowerCase() === Tag.task) {
                messages.push(...await this.processor.procTask(child))
            }
            else if (child.nodeName.toLowerCase() === Tag.taskBlock) {
                messages.push(...await this.processor.procTaskBlock(child))
            }
        }

        messages.push({
            text: 'Не забудьте сохранить изменения.\nДля сохранения в консоли можете использовать команду\n"archive saveChanges".',
            type: MessageType.warn
        })

        return messages
    }

    private getRoot($root: Element, $data: Document) {
        let version: string
        $root = $data.querySelector(Tag.main)
        if (!$root)
            throw new Error(`Не найден тег <${Tag.main}>.`)

        version = $root.getAttribute(MainAttr.version)
        if (version !== this.fileVersion)
            throw new Error(`Неподдерживаемая версия файла: "${version}".\nАктуальная версия - "${this.fileVersion}".`)

        return $root
    }

    private getDocument($data: Document, pathToFile: string) {
        $data = new DOMParser().parseFromString(readFileSync(pathToFile).toString(), 'text/html')
        if ($data.querySelector('parsererror'))
            throw new Error('Файл повреждён или имеет ошибки.')
        return $data
    }
}
