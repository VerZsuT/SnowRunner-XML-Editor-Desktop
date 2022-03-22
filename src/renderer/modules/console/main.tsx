import { PureComponent, Fragment } from 'react'
import { render } from 'react-dom'
import type { CheerioAPI } from 'cheerio'
import type IFindItem from 'modules/list/types/IFindItem'
import type IConfigSettings from 'main/types/IConfigSettings'
import Lang from 'main/enums/Lang'

import { MAIN } from 'scripts/funcs'
import { getExported } from 'scripts/dom'
import config from 'scripts/config'
import main from 'scripts/main'
import { OPTIONAL, addCheck, help, Message } from './service'

import EditorConsole from './components/EditorConsole'

import 'styles/console'

const {
    quit, reload, resetConfig, enableDevTools,
    disableDevTools, saveBackup,
    recoverFromBackup, checkUpdate, updateFiles,
    unpackFiles, importConfig, exportConfig,
    openWhatsNew, findInDir,
    seeEPF, joinEPF, paths
} = main
const { existsSync, writeFileSync, join } = window.service

interface IState {
    messages: JSX.Element[]
}

class Console extends PureComponent<any, IState> {
    private listeners: {
        [cmd: string]: (args: string[]) => JSX.Element
    }

    constructor(props: any) {
        super(props)
        this.state = {
            messages: [
                <Fragment key='0'>
                    {Message.info("Командная строка v1.1.")}
                </Fragment>
            ]
        }
        this.listeners = this.getListeners()
    }

    render() {
        const { messages } = this.state
        
        return <>
            <div id='messages' onClick={this.onMessagesClick}>
                {messages}
            </div>
            <EditorConsole onError={this.pushMessage} listeners={this.listeners}/>
        </>
    }

    private onMessagesClick = () => (document.querySelector('#input') as HTMLInputElement).focus()

    private pushMessage = (message: JSX.Element) => {
        this.setState(({ messages }) => ({
            messages: [...messages, <Fragment key={messages.length}>{message}</Fragment>]
        }))
        document.querySelector('#messages').scrollTop = 10_000_000
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
                const items: IFindItem[] = []
                const exported: any = {}

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

                for (const item of items) {
                    const obj = getExported(item.path)
                    if (!obj)
                        continue

                    exported[`${item.name}.xml`] = obj
                }

                writeFileSync(join(paths.backupFolder, 'exported.json'), JSON.stringify(exported, null, '\t'))
                this.pushMessage(Message.log('Все параметры были экпортированы в backups/exported.json'))
            }),

            'devTools': addCheck(args => {
                const { action } = args

                if (action === 'enable') {
                    enableDevTools()
                    this.pushMessage(Message.log('DevTools были включены для всех последующих окон.'))
                }
                else {
                    disableDevTools()
                    this.pushMessage(Message.log('DevTools были выключены для всех последующих окон.'))
                }
            }, {
                action: ['enable', 'disable'] as unknown as 'enable' | 'disable'
            }),

            'epf': addCheck(args => {
                const { action } = args

                if (action === 'see')
                    seeEPF()
                else
                    joinEPF()
            }, {
                action: ['see', 'join'] as unknown as 'see' | 'join'
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
                name: Object.keys(config.settings) as unknown as keyof IConfigSettings,
                value: ['true', 'false'] as unknown as 'true' | 'false'
            }),

            'lang': addCheck(args => {
                const { lang } = args

                config.lang = lang
                reload()
            }, {
                lang: Object.keys(Lang) as unknown as Lang
            }),

            'backup': addCheck(args => {
                const { action } = args

                if (action === 'save')
                    saveBackup()
                else
                    recoverFromBackup()

                this.pushMessage(Message.log('Операция проведена.'))
            }, {
                action: ['save', 'restore'] as unknown as 'save' | 'restore'
            }),

            'checkUpdate': addCheck(() => {
                this.pushMessage(Message.log('Проверка обновления...'))
                this.pushMessage(Message.log('В случае удачи выведется соответствующее окно.'))
                checkUpdate()
            }),

            'help': addCheck(args => {
                const { cmd } = args

                if (cmd) {
                    if (!help[cmd]) {
                        this.pushMessage(Message.warn(`Неизвестная команда '${cmd}'.`))
                        return
                    }
                    this.pushMessage(Message.log(`Справка по команде '${cmd}'\n${help[cmd]}`))
                }
                else {
                    this.pushMessage(Message.log(`Список команд:\n${help.toString()}`))
                }
            }, {
                cmd: [OPTIONAL, cmds] as unknown as cmdsType
            }),

            'archive': addCheck(args => {
                const { action } = args

                if (action === 'saveChanges') {
                    updateFiles()
                    this.pushMessage(Message.log('Изменения в файлах initial.pak сохранены.'))
                }
                else {
                    unpackFiles()
                    this.pushMessage(Message.log('initial.pak был распакован.'))
                }
            }, {
                action: ['saveChanges', 'unpack'] as unknown as 'saveChanges' | 'unpack'
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
                }
                else {
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

render(<Console/>, MAIN)
