export const ANY = 'ANY_ARGUMENT'
export const OPTIONAL = 'OPTIONAL_ARGUMENT'

type CmdListener<T extends ArgsCheckObj> = (args: CheckedArgs<T>, error?: JSX.Element) => any
type ArgsType = typeof ANY | string | string[]
type CheckedArgs<T extends ArgsCheckObj> = {
    [name in keyof T]: T[name]
}

interface ArgsCheckObj {
    [propName: string]: ArgsType | [typeof OPTIONAL, ArgsType]
}

/** Позволяет создавать элементы сообщений. */
export class Message {
    /** Сообщение в стиле лога. */
    static log(text: string) {
        return this.message(text)
    }

    /** Сообщение в стиле предупреждения. */
    static warn(text: string) {
        return this.message(text, 'warn')
    }

    /** Сообщение в стиле ошибки. */
    static error(text: string) {
        return this.message(text, 'error')
    }

    /** Сообщение в стиле информации. */
    static info(text: string) {
        return this.message(text, 'info')
    }

    private static message(text: string, type?: MessageType) {
        let color = 'white'
        switch (type) {
            case 'warn':
                color = 'yellow'
            break
            case 'error':
                color = 'red'
            break
            case 'info':
                color = 'lightblue'
            break
        }

        return <p style={{color}}>&gt; {text}</p>
    }
}

/** 
 * Оборачивает функцию для автоматической проверки агрументов. Для проверки используется `argsCheckObj`.
 * 
 * В случае ошибки `listener` не будет вызван, а в консоль выведется ошибка.
*/
export function checkArgs<T extends ArgsCheckObj>(listener: CmdListener<T>, argsCheckObj?: T) {
    const checkArgs = (args: string[]) => {
        let checkedArgs: {[name: string]: string} = {}
        let counter = 0
        if (!argsCheckObj) {
            return {checkedArgs: checkedArgs as CheckedArgs<T>}
        }
        for (const propName in argsCheckObj) {
            let isOptional = false
            let checker = argsCheckObj[propName]
            const argument = args[counter]
            if (checker instanceof Array && checker[0] === OPTIONAL) {
                checker = checker[1] as unknown as T[Extract<keyof T, string>]
                isOptional = true
            }

            if (argument === undefined) {
                if (isOptional) {
                    continue
                }
                const message = checker instanceof Array? `[${checker.join(' | ')}]` : checker
                return {error: Message.warn(`Недостаточно аргументов для выполнения команды. На позиции ${counter + 1} ожидалось ${message}`)}
                
            }

            if (checker === ANY) {
                continue
            }
            if (checker instanceof Array) {
                if (!checker.includes(argument)) {
                    return {error: Message.warn(`Неверный аргумент на позиции ${counter + 1}. Ожидалось [${checker.join(' | ')}]`)}
                }
            } else {
                if (checker !== argument) {
                    return {error: Message.warn(`Неверный аргумент на позиции ${counter + 1}. Ожидалось ${checker}`)}
                }
            }
            ++counter
            checkedArgs[propName] = argument
        }
        return {checkedArgs: checkedArgs as CheckedArgs<T>}
    } 

    return ((args: string[]) => {
        const { checkedArgs, error } = checkArgs(args)
        if (checkedArgs) {
            listener(checkedArgs)
        } else if (error) {
            return error
        }
    })
}

export const help = {
    help: '- help [cmd_name]\ncmd_name - имя команды.\nПомощь по командам консоли.',
    exit: '- exit\nЗакрытие консоли.',
    quit: '- quit\nЗакрытие программы.',
    version: '- version\nТекущая версия программы.',
    reload: '- reload\nПерезагрузка программы.',
    reset: '- reset\nСброс настроек программы.',
    checkUpdate: '- checkUpdate\nПринудительная проверка обновления (игнорирует настройку "обновления").',
    read: '- read\nОткрывает окно выбора .xml файла.\nСчитывает файл в память для его дальнейшего изменения с помощью команды "set".',
    set: '- set <selector> <attribute> <value>\nНаходит элемент xml файла по селектору и устанавливает значение атрибута.\nВажно! Селектор и значение должны быть БЕЗ ПРОБЕЛОВ.',
    addMod: '- addMod\nОткрывает окно выбора .pak файла модификации и добавляет его в программу.',
    delMod: '- delMod <mod_id>\nУдаляет указанную модификацию из программы.',
    devTools: '- devTools <"enable"|"disable">\nВключает/выключает devTools на всех последующих страницах.',
    sset: '- sset <setting_name> <"true"|"false">\nУстанавливает значение настройки.',
    backup: '- backup <"save"|"restore">\nСохраняет/восстанавливает бэкап initial.pak',
    archive: '- archive <"save"|"unpack">\nСохраняет изменения или распаковывает initial.pak',
    lang: '- lang <"RU"|"EN"|"DE">\nУстанавливает язык перевода программы.',
    config: '- config <"import"|"export">\nИмпорт/экспорт конфиг-файла.',
    toString: () => {
        const array = []
        for (const cmdName in help) {
            if (cmdName === 'toString') continue
            array.push(help[cmdName])
        }
        return array.join('\n\n')
    }
}
