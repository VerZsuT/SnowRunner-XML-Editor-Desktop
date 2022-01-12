import { PureComponent, Fragment } from 'react'
import { render } from 'react-dom'
import 'styles/console/main'

import { Lang, MAIN, mainProcess, ParamType } from 'scripts'
import { ANY, OPTIONAL, addCheck, help, Message } from './service'
import { EditorConsole } from './components/EditorConsole'

const { config, paths } = window.provider
const {
    quit, reload, resetConfig, enableDevTools,
    disableDevTools, openXMLDialog, saveBackup,
    recoverFromBackup, checkUpdate, updateFiles,
    unpackFiles, importConfig, exportConfig,
    openWhatsNew, findInDir, templates: mainTemplates,
    getParams
} = mainProcess
const {
    readFileSync, replacePars, existsSync,
    writeFileSync, getModPak, removeDir, join
} = window.consolePreload

interface IState {
    messages: JSX.Element[]
}

class Console extends PureComponent<any, IState> {
    private listeners: {
        [cmd: string]: (args: string[]) => JSX.Element
    }
    private fileDOM: Document
    private filePath: string

    constructor(props: any) {
        super(props)

        this.state = {
            messages: [
                <Fragment key='0'>
                    {Message.info("Командная строка v1.0.\n- Введите 'help' для вывода списка команд.\n- Стрелки на клавиатуре для переключения предложенного варианта.\n- TAB для выбора варианта.\n- Сообщения можно скролить.")}
                </Fragment>
            ]
        }
        this.listeners = this.getListeners()
    }

    render() {
        return (<>
            <div id='messages'>
                {this.state.messages}
            </div>
            <EditorConsole onError={this.pushMessage} listeners={this.listeners} />
        </>)
    }

    private pushMessage = (message: JSX.Element) => {
        this.setState({
            messages: [...this.state.messages, <Fragment key={this.state.messages.length}>{message}</Fragment>]
        })
        document.querySelector('html').scrollTop = 10000000
    }

    private getListeners() {
        const cmds = Object.keys(help).filter(value => value !== 'toString')
        type cmdsType = Exclude<keyof typeof help, 'toString'>

        return {
            'exit': addCheck(() => window.close()),
            'quit': addCheck(() => quit()),
            'reload': addCheck(() => reload()),
            'reset': addCheck(() => resetConfig(false)),
            'exportAll': addCheck(() => {
                const items: FindItem[] = []
                for (const dlcItem of config.dlc) {
                    const path = `${dlcItem.path}\\classes`
                    items.push(...findInDir(join(path, 'trucks')))
                    items.push(...findInDir(join(path, 'trucks/trailers')))
                    items.push(...findInDir(join(path, 'gearboxes')))
                    items.push(...findInDir(join(path, 'engines')))
                    items.push(...findInDir(join(path, 'suspensions')))
                    items.push(...findInDir(join(path, 'winches')))
                    items.push(...findInDir(join(path, 'wheels')))
                }

                items.push(...findInDir(join(paths.classes, 'trucks')))
                items.push(...findInDir(join(paths.classes, 'trucks/trailers')))
                items.push(...findInDir(join(paths.classes, 'gearboxes')))
                items.push(...findInDir(join(paths.classes, 'engines')))
                items.push(...findInDir(join(paths.classes, 'suspensions')))
                items.push(...findInDir(join(paths.classes, 'winches')))
                items.push(...findInDir(join(paths.classes, 'wheels')))

                const filePath = join(paths.mainTemp, '[media]/_templates/trucks.xml')
                const fileData = readFileSync(filePath).toString()
                const globalTemplates = new DOMParser().parseFromString(fileData, 'text/xml')

                const exported: any = {}
                for (const item of items) {
                    const [fileDOM, tItems] = getDOM(item.path)
                    if (!fileDOM) continue
                    const templates = fileDOM.querySelector('_templates')

                    for (let tItem of tItems) {
                        if (!exported[item.name+'.xml']) {
                            exported[item.name+'.xml'] = {}
                        }
                        function calcInput(i: any) {
                            if (!exported[item.name+'.xml'][i.selector]) {
                                exported[item.name+'.xml'][i.selector] = {}
                            }
                            exported[item.name+'.xml'][i.selector][i.name] = getValue(fileDOM, templates, globalTemplates, i)
                        }
                        function calcGroup(i: any) {
                            for (const groupItem of i.groupItems) {
                                if (groupItem.paramType === ParamType.group) {
                                    calcGroup(groupItem)
                                } else {
                                    calcInput(groupItem)
                                }
                            }
                        }
                        if (tItem.paramType === ParamType.input) {
                            calcInput(tItem)
                        } else if (tItem.paramType === ParamType.group) {
                            calcGroup(tItem)
                        }
                    }
                }

                writeFileSync(join(paths.backupFolder, 'exported.json'), JSON.stringify(exported, null, '\t'))
                Message.log('Все параметры были экпортированы в backups/exported.json')
            }),
            'devTools': addCheck(args => {
                const { action } = args
                if (action === 'enable') {
                    enableDevTools()
                    this.pushMessage(Message.log('DevTools были включены для всех последующих окон.'))
                } else {
                    disableDevTools()
                    this.pushMessage(Message.log('DevTools были выключены для всех последующих окон.'))
                }
            }, {
                action: ['enable', 'disable'] as unknown as 'enable' | 'disable'
            }),
            'version': addCheck(() => {
                this.pushMessage(Message.log(`Текущая версия программы: ${config.version}.`))
            }),
            'sset': addCheck(args => {
                const { name, value } = args

                if (config.settings[name] !== undefined) {
                    config.settings[name] = value === 'true' || false
                    this.pushMessage(Message.log(`${name} = ${value}.`))
                }
            }, {
                name: Object.keys(config.settings) as unknown as keyof typeof config.settings,
                value: ['true', 'false'] as unknown as 'true' | 'false'
            }),
            'lang': addCheck(args => {
                const { lang } = args

                config.lang = lang
                reload()
            }, {
                lang: Object.keys(Lang) as unknown as Lang
            }),
            'read': addCheck(() => {
                const path = openXMLDialog()
                const parser = new DOMParser()

                if (!path) {
                    this.pushMessage(Message.warn('Вы не выбрали файл для считывания.'))
                    return
                }
                const fileDOM = parser.parseFromString(`<root>${readFileSync(path).toString()}</root>`, 'text/xml')

                if (fileDOM.querySelector('parsererror')) {
                    this.pushMessage(Message.error(`Ошибка парсинга файла.\n${fileDOM.querySelector<HTMLDivElement>('parsererror').innerText}`))
                    return
                }

                this.pushMessage(Message.log(`Файл '${path}' успешно считан в память.`))
                this.fileDOM = fileDOM
                this.filePath = path
            }),
            'set': addCheck(args => {
                let { selector, attrName, value } = args

                selector = replacePars(selector)
                value = replacePars(value)

                if (!this.fileDOM) {
                    this.pushMessage(Message.error('Сначала надо считать файл с помощью команды "read".'))
                    return
                }
                if (!existsSync(this.filePath)) {
                    this.pushMessage(Message.error(`Искомый файл '${this.filePath}' не обнаружен.`))
                    return
                }

                const element = this.fileDOM.querySelector(selector)
                if (!element) {
                    this.pushMessage(Message.error(`Элемент с селектором '${selector}' не обнаружен.`))
                    return
                }

                const serializer = new XMLSerializer()
                element.setAttribute(attrName, value)
                writeFileSync(this.filePath, serializer.serializeToString(this.fileDOM).replace('<root>', '').replace('</root>', ''))

                this.pushMessage(Message.log(`${attrName}='${value}'`))
            }, {
                selector: ANY,
                attrName: ANY,
                value: ANY
            }),
            'backup': addCheck(args => {
                const { action } = args

                if (action === 'save') {
                    saveBackup()
                } else {
                    recoverFromBackup()
                }

                this.pushMessage(Message.log('Операция проведена.'))
            }, {
                action: ['save', 'restore'] as unknown as 'save' | 'restore'
            }),
            'addMod': addCheck(() => {
                const result = getModPak()
                if (!result) {
                    this.pushMessage(Message.error('Не выбран .pak файл модификации.'))
                    return
                }

                if (!config.mods.items[result.id]) {
                    config.mods.length++
                }
                config.mods.items[result.id] = {
                    name: result.name,
                    path: result.path
                }

                reload()
            }),
            'checkUpdate': addCheck(() => {
                this.pushMessage(Message.log('Проверка обновления...'))
                this.pushMessage(Message.log('В случае удачи выведется соответствующее окно.'))
                checkUpdate()
            }),
            'delMod': addCheck(args => {
                const { modId } = args

                delete config.mods.items[modId]
                removeDir(join(paths.modsTemp, modId))

                config.mods.length--
                this.pushMessage(Message.log(`Модификация '${modId}' удалена.`))
            }, {
                modId: Object.keys(config.mods) as unknown as keyof typeof config.mods
            }),
            'help': addCheck(args => {
                const { cmd } = args

                if (cmd) {
                    if (!help[cmd]) {
                        this.pushMessage(Message.warn(`Неизвестная команда '${cmd}'.`))
                        return
                    }
                    this.pushMessage(Message.log(`Справка по команде '${cmd}'\n${help[cmd]}`))
                } else {
                    this.pushMessage(Message.log(`Список команд:\n${help.toString()}`))
                }
            }, {
                cmd: [OPTIONAL, cmds] as unknown as cmdsType
            }),
            'archive': addCheck(args => {
                const { action } = args

                if (action === 'save') {
                    updateFiles()
                    this.pushMessage(Message.log('Изменения в файлах initial.pak сохранены.'))
                } else {
                    unpackFiles()
                    this.pushMessage(Message.log('initial.pak был распакован.'))
                }
            }, {
                action: ['save', 'unpack'] as unknown as 'save' | 'unpack'
            }),
            'config': addCheck(args => {
                const { action } = args

                if (action === 'import') {
                    if (!existsSync(join(paths.backupFolder, 'config.json'))) {
                        this.pushMessage(Message.warn('Нет файла для импортирования.'))
                        return
                    }
                    importConfig()
                    this.pushMessage(Message.log('Конфиг был успешно импортирован.'))
                } else {
                    exportConfig()
                    this.pushMessage(Message.log('Конфиг был успешно экспортирован.'))
                }
            }, {
                action: ['import', 'export'] as unknown as 'import' | 'export'
            }),
            'whatsNew': addCheck(() => {
                openWhatsNew()
            })
        }
    }
}

function getFromTemplates(fileDOM: Document, templates: Element, globalTemplates: Document, item: IInputParams | ISelectParams) {
    let el = fileDOM.querySelector(item.selector)
    const array = item.selector.split(' ')
        .map(value => value.trim())
        .filter(value => value !== '>')
    const innerName = array.slice(array.length - 1)[0]
    const tagName = innerName.split('[')[0]
    if (!el) {
        el = fileDOM.querySelector(array.slice(0, array.length - 1).join(' > '))
    }
    if (el) {
        let templateName = el.getAttribute('_template')
        if (!templateName) {
            templateName = getParentTemplate(el)
        }
        if (templateName) {
            const template = templates.querySelector(templateName)
            if (template) {
                const templateValue = template.getAttribute(item.name)
                if (templateValue) {
                    return templateValue
                }

                const el2 = template.querySelector(tagName)
                if (el2) {
                    const templateValue2 = el2.getAttribute(item.name)
                    if (templateValue2) {
                        return templateValue2
                    }
                    const templateName1 = el2.getAttribute('_template')
                    if (templateName1) {
                        return getValueInGlobal(templateName1, tagName, globalTemplates, item)
                    }
                }
            } else {
                return getValueInGlobal(templateName, tagName, globalTemplates, item)
            }
        }
    }
}

function getParentTemplate(el: any) {
    if (el.parentElement) {
        const template = el.parentElement.getAttribute('_template')
        if (template) {
            return template
        } else {
            return getParentTemplate(el.parentElement)
        }
    }
}

function getValueInGlobal(templateName: string, tagName: string, globalTemplates: Document, item: IInputParams | ISelectParams) {
    const template = globalTemplates.querySelector(`${tagName} > ${templateName}`)
    if (template) {
        const templateValue = template.getAttribute(item.name)
        if (templateValue) {
            return templateValue
        } else {
            const el2 = template.querySelector(tagName)
            if (el2) {
                const templateValue2 = el2.getAttribute(item.name)
                if (templateValue2) {
                    return templateValue2
                }
            }
        }
    }
    return item.value
}

function getValue(fileDOM: Document, templates: Element, globalTemplates: Document, item: IInputParams | ISelectParams) {
    let value = item.value
    if (!value && value !== 0 && templates) {
        value = getFromTemplates(fileDOM, templates, globalTemplates, item)
    }
    if (value === null || value === undefined) {
        value = item.default
    }

    return value
}

function getDOM(filePath: string): [Document, ITemplateParams] {
    const fileData = readFileSync(filePath).toString()
    if (!fileData) return

    const parser = new DOMParser()
    const $dom = parser.parseFromString(`<root>${fileData}</root>`, 'text/xml')
    const $root = $dom.querySelector('root')
    $root.childNodes.forEach(child => {
        if (child.nodeType === 8) {
            child.remove()
        }
    })

    if ($root.childNodes[0].nodeValue === '\n') {
        $root.childNodes[0].remove()
    }

    const tempDOM = $dom
    const templates = mainTemplates
    let name: string
    for (let tmp in templates) {
        let selector = `root > ${templates[tmp].selector}`
        if (tempDOM.querySelector(selector)) {
            name = tmp
            break
        }
    }
    if (!name) return [undefined, undefined]

    const domString = new XMLSerializer().serializeToString(tempDOM)
    const result = getParams(domString, name)

    return [parser.parseFromString(result.dom, 'text/xml'), result.params]
}

render(<Console />, MAIN)
