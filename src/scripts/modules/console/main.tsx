import { PureComponent, Fragment } from 'react'
import { render } from 'react-dom'
import './style.css'

import { mainProcess, Lang, MAIN } from '@editor-service'
import { ANY, checkArgs, OPTIONAL, help, Message } from './service'
import EditorConsole from './components/EditorConsole'

const temp = {
    fileDOM: null,
    filePath: null
}

interface IState {
    messages: JSX.Element[]
}

const cmds = Object.keys(help).filter(value=>value!=='toString')
type cmdsType = Exclude<keyof typeof help, 'toString'>

class Console extends PureComponent<any, IState> {
    private listeners = this.getListeners()

    state = {
        messages: [
            <Fragment key='0'>
                {Message.info("Командная строка v1.0.\n- Введите 'help' для вывода списка команд.\n- Стрелки на клавиатуре для переключения предложенного варианта.\n- TAB для выбора варианта.\n- Сообщения можно скролить.")}
            </Fragment>
        ]
    }

    render() {
        return (<>
            <div id='messages'>
                {this.state.messages}
            </div>
            <EditorConsole onError={this.pushMessage} listeners={this.listeners}/>
        </>)
    }

    private pushMessage = (message: JSX.Element) => {
        this.setState({
            messages: [...this.state.messages, <Fragment key={this.state.messages.length}>{message}</Fragment>]
        })
    }

    private getListeners() {
        return {
            exit: checkArgs(() => window.close()),
            quit: checkArgs(() => mainProcess.quit()),
            reload: checkArgs(() => mainProcess.reload()),
            reset: checkArgs(() => mainProcess.resetConfig(false)),
            devTools: checkArgs(args => {
                const { action } = args
                if (action === 'enable') {
                    mainProcess.enableDevTools()
                    this.pushMessage(Message.log('DevTools были включены для всех последующих окон.'))
                } else {
                    mainProcess.disableDevTools()
                    this.pushMessage(Message.log('DevTools были выключены для всех последующих окон.'))
                }
            }, {
                action: ['enable', 'disable'] as unknown as 'enable'|'disable'
            }),
            version: checkArgs(() => {
                this.pushMessage(Message.log(`Текущая версия программы: ${config.version}.`))
            }),
            sset: checkArgs(args => {
                const { name, value } = args
            
                if (config.settings[name] !== undefined) {
                    config.settings[name] = value === 'true' || false
                    this.pushMessage(Message.log(`${name} = ${value}.`))
                }
            }, {
                name: Object.keys(config.settings) as unknown as keyof typeof config.settings,
                value: ['true', 'false'] as unknown as 'true'|'false'
            }),
            lang: checkArgs(args => {
                const { lang } = args
            
                config.lang = lang
                mainProcess.reload()
            }, {
                lang: Object.keys(Lang) as unknown as Lang
            }),
            read: checkArgs(() => {
                const path = mainProcess.openXMLDialog()
                const parser = new DOMParser()
            
                if (!path) {
                    this.pushMessage(Message.warn('Вы не выбрали файл для считывания.'))
                    return
                }
                const fileDOM = parser.parseFromString(`<root>${consolePreload.readFile(path)}</root>`, 'text/xml')
            
                if (fileDOM.querySelector('parsererror')) {
                    this.pushMessage(Message.error(`Ошибка парсинга файла.\n${fileDOM.querySelector<HTMLDivElement>('parsererror').innerText}`))
                    return
                }
            
                this.pushMessage(Message.log(`Файл '${path}' успешно считан в память.`))
                temp.fileDOM = fileDOM
                temp.filePath = path
            }),
            set: checkArgs(args => {
                let { selector, attrName, value } = args
            
                selector = consolePreload.replacePars(selector)
                value = consolePreload.replacePars(value)
            
                if (!temp.fileDOM) {
                    this.pushMessage(Message.error('Сначала надо считать файл с помощью команды "read".'))
                    return
                }
                if (!consolePreload.exists(temp.filePath)) {
                    this.pushMessage(Message.error(`Искомый файл '${temp.filePath}' не обнаружен.`))
                    return
                }
            
                const element = temp.fileDOM.querySelector(selector)
                if (!element) {
                    this.pushMessage(Message.error(`Элемент с селектором '${selector}' не обнаружен.`))
                    return
                }
                
                const serializer = new XMLSerializer()
                element.setAttribute(attrName, value)
                consolePreload.writeFile(temp.filePath, serializer.serializeToString(temp.fileDOM).replace('<root>', '').replace('</root>', ''))
            
                this.pushMessage(Message.log(`${attrName}='${value}'`))
            }, {
                selector: ANY,
                attrName: ANY,
                value: ANY
            }),
            backup: checkArgs(args => {
                const { action } = args
            
                if (action === 'save') {
                    mainProcess.saveBackup()
                } else {
                    mainProcess.recoverFromBackup()
                }
            
                this.pushMessage(Message.log('Операция проведена.'))
            }, {
                action: ['save', 'restore'] as unknown as 'save'|'restore'
            }),
            addMod: checkArgs(() => {
                const result = consolePreload.getModPak()
                if (!result) {
                    this.pushMessage(Message.error('Не выбран .pak файл модификации.'))
                    return
                }
            
                if (!config.modsList[result.id]) {
                    config.modsList.length++
                }
                config.modsList[result.id] = {
                    name: result.name,
                    path: result.path
                }
                
                mainProcess.reload()
            }),
            checkUpdate: checkArgs(() => {
                this.pushMessage(Message.log('Проверка обновления...'))
                this.pushMessage(Message.log('В случае удачи выведется соответствующее окно.'))
                mainProcess.checkUpdate()
            }),
            delMod: checkArgs(args => {
                const { modId } = args
            
                delete config.modsList[modId]
                consolePreload.removeDir(consolePreload.join(paths.modsTemp, modId))
            
                config.modsList.length--
                this.pushMessage(Message.log(`Модификация '${modId}' удалена.`))
            }, {
                modId: Object.keys(config.modsList) as unknown as keyof typeof config.modsList
            }),
            help: checkArgs(args => {
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
            archive: checkArgs(args => {
                const { action } = args
            
                if (action === 'save') {
                    mainProcess.updateFiles()
                    this.pushMessage(Message.log('Изменения в файлах initial.pak сохранены.'))
                } else {
                    mainProcess.unpackFiles()
                    this.pushMessage(Message.log('initial.pak был распакован.'))
                }
            }, {
                action: ['save', 'unpack'] as unknown as 'save'|'unpack'
            }),
            config: checkArgs(args => {
                const { action } = args
            
                if (action === 'import') {
                    if (!consolePreload.exists(consolePreload.join(paths.backupFolder, 'config.json'))) {
                        this.pushMessage(Message.warn('Нет файла для импортирования.'))
                        return
                    }
                    mainProcess.importConfig()
                    this.pushMessage(Message.log('Конфиг был успешно импортирован.'))
                    mainProcess.reload()
                } else {
                    mainProcess.exportConfig()
                    this.pushMessage(Message.log('Конфиг был успешно экспортирован.'))
                }
            }, {
                action: ['import', 'export'] as unknown as 'import'|'export'
            })
        }
    }
}

render(<Console/>, MAIN)
