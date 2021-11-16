import { mainProcess, Lang } from '../../service'

import AutoComplete from './AutoComplete'
import { EditorConsole, ANY, OPTIONAL } from './EditorConsole'
import help from './help'
import Message from './Message'

import './style.css'

const temp = {
    fileDOM: null,
    filePath: null
}

AutoComplete.init()
EditorConsole.init()

Message.info("Командная строка v1.0.\n- Введите 'help' для вывода списка команд.\n- Стрелки на клавиатуре для переключения предложенного варианта.\n- TAB для выбора варианта.\n- Сообщения можно скролить.")

EditorConsole.onCmd('exit', window.close)
EditorConsole.onCmd('quit', () => mainProcess.quit())
EditorConsole.onCmd('reload', () => mainProcess.reload())
EditorConsole.onCmd('reset', () => mainProcess.resetConfig(false))

EditorConsole.onCmd('devTools', args => {
    const { action } = args
    if (action === 'enable') {
        mainProcess.enableDevTools()
        Message.log('DevTools были включены для всех последующих окон.')
    } else {
        mainProcess.disableDevTools()
        Message.log('DevTools были выключены для всех последующих окон.')
    }
}, {
    action: <unknown>['enable', 'disable'] as 'enable'|'disable'
})

EditorConsole.onCmd('version', () => {
    Message.log(`Текущая версия программы: ${config.version}.`)
})

EditorConsole.onCmd('sset', args => {
    const { name, value } = args

    if (config.settings[name] !== undefined) {
        config.settings[name] = value === 'true' || false
        Message.log(`${name} = ${value}.`)
    }
}, {
    name: <unknown>Object.keys(config.settings) as keyof typeof config.settings,
    value: <unknown>['true', 'false'] as 'true'|'false'
})

EditorConsole.onCmd('lang', args => {
    const { lang } = args

    config.lang = lang
    mainProcess.reload()
}, {
    lang: <unknown>Object.keys(Lang) as ConfigLang
})

EditorConsole.onCmd('read', () => {
    const path = mainProcess.openXMLDialog()
    const parser = new DOMParser()

    if (!path) {
        Message.warn('Вы не выбрали файл для считывания.')
        return
    }
    const fileDOM = parser.parseFromString(`<root>${consolePreload.readFile(path)}</root>`, 'text/xml')

    if (fileDOM.querySelector('parsererror')) {
        Message.error(`Ошибка парсинга файла.\n${fileDOM.querySelector<HTMLDivElement>('parsererror').innerText}`)
        return
    }

    Message.log(`Файл '${path}' успешно считан в память.`)
    temp.fileDOM = fileDOM
    temp.filePath = path
})

EditorConsole.onCmd('set', args => {
    let { selector, attrName, value } = args

    selector = consolePreload.replacePars(selector)
    value = consolePreload.replacePars(value)

    if (!temp.fileDOM) {
        Message.error('Сначала надо считать файл с помощью команды "read".')
        return
    }
    if (!consolePreload.exists(temp.filePath)) {
        Message.error(`Искомый файл '${temp.filePath}' не обнаружен.`)
        return
    }

    const element = temp.fileDOM.querySelector(selector)
    if (!element) {
        Message.error(`Элемент с селектором '${selector}' не обнаружен.`)
        return
    }
    
    const serializer = new XMLSerializer()
    element.setAttribute(attrName, value)
    consolePreload.writeFile(temp.filePath, serializer.serializeToString(temp.fileDOM).replace('<root>', '').replace('</root>', ''))

    Message.log(`${attrName}='${value}'`)
}, {
    selector: ANY,
    attrName: ANY,
    value: ANY
})

EditorConsole.onCmd('backup', args => {
    const { action } = args

    if (action === 'save') {
        mainProcess.saveBackup()
    } else {
        mainProcess.recoverFromBackup()
    }

    Message.log('Операция проведена.')
}, {
    action: <unknown> ['save', 'restore'] as 'save'|'restore'
})

EditorConsole.onCmd('addMod', () => {
    const result = consolePreload.getModPak()
    if (!result) {
        Message.error('Не выбран .pak файл модификации.')
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
})

EditorConsole.onCmd('checkUpdate', () => {
    Message.log('Проверка обновления...')
    Message.log('В случае удачи выведется соответствующее окно.')
    mainProcess.checkUpdate()
})

EditorConsole.onCmd('delMod', args => {
    const { modId } = args

    delete config.modsList[modId]
    consolePreload.removeDir(consolePreload.join(paths.modsTemp, modId))

    config.modsList.length--
    Message.log(`Модификация '${modId}' удалена.`)
}, {
    modId: <unknown>Object.keys(config.modsList) as keyof typeof config.modsList
})

const cmds = Object.keys(help).filter(value=>value!=='toString')
type cmdsType = Exclude<keyof typeof help, 'toString'>

EditorConsole.onCmd('help', args => {
    const { cmd } = args

    if (cmd) {
        if (!help[cmd]) {
            Message.warn(`Неизвестная команда '${cmd}'.`)
            return
        }
        Message.log(`Справка по команде '${cmd}'\n${help[cmd]}`)
    } else {
        Message.log(`Список команд:\n${help.toString()}`)
    }
}, {
    cmd: <unknown>[OPTIONAL, cmds] as cmdsType
})

EditorConsole.onCmd('archive', args => {
    const { action } = args

    if (action === 'save') {
        mainProcess.updateFiles()
        Message.log('Изменения в файлах initial.pak сохранены.')
    } else {
        mainProcess.unpackFiles()
        Message.log('initial.pak был распакован.')
    }
}, {
    action: <unknown>['save', 'unpack'] as 'save'|'unpack'
})

EditorConsole.onCmd('config', args => {
    const { action } = args

    if (action === 'import') {
        if (!consolePreload.exists(consolePreload.join(paths.backupFolder, 'config.json'))) {
            Message.warn('Нет файла для импортирования.')
            return
        }
        mainProcess.importConfig()
        Message.log('Конфиг был успешно импортирован.')
        mainProcess.reload()
    } else {
        mainProcess.exportConfig()
        Message.log('Конфиг был успешно экспортирован.')
    }
}, {
    action: <unknown>['import', 'export'] as 'import'|'export'
})
