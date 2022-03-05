import { MessageType } from './enums'
import { Typography } from '@mui/material'
import { Fragment } from 'react'

/** Агрумент любого содержания (кроме пустого) */
export const ANY = 'ANY_ARGUMENT'
/** Опциональный аргумент (может быть пустым) */
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
        return this.create(text)
    }

    /** Сообщение в стиле предупреждения. */
    static warn(text: string) {
        return this.create(text, MessageType.warn)
    }

    /** Сообщение в стиле ошибки. */
    static error(text: string) {
        return this.create(text, MessageType.error)
    }

    /** Сообщение в стиле информации. */
    static info(text: string) {
        return this.create(text, MessageType.info)
    }

    static create(text: string, type?: MessageType) {
        const items = text.split('\n')
        let color = 'white'
        switch (type) {
            case MessageType.warn:
                color = 'yellow'
                break
            case MessageType.error:
                color = 'red'
                break
            case MessageType.info:
                color = 'lightblue'
                break
        }

        return <Typography style={{color}}>
            #&nbsp;
            {items.map((item, key) => <Fragment key={key}>
                <Typography component='span' style={{wordBreak: 'break-all'}}>
                    {item}
                </Typography>
                <br />
            </Fragment>)}
        </Typography>
    }
}

export function checkArgs<T extends ArgsCheckObj>(argsCheckObj?: T): PropertyDecorator {
    return function (target, pKey) {
        target[pKey] = addCheck(target[pKey].bind(this), argsCheckObj)
    }
}

/** 
 * Оборачивает функцию для автоматической проверки агрументов. Для проверки используется `argsCheckObj`.
 * 
 * В случае ошибки `listener` не будет вызван, а в консоль выведется ошибка.
*/
export function addCheck<T extends ArgsCheckObj>(listener: CmdListener<T>, argsCheckObj?: T) {
    const checkArgs = (args: string[]) => {
        let checkedArgs: { [name: string]: string } = {}
        let counter = 0
        if (!argsCheckObj) {
            return { checkedArgs: checkedArgs as CheckedArgs<T> }
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
                const message = checker instanceof Array ? `[${checker.join(' | ')}]` : checker
                return { error: Message.warn(`Недостаточно аргументов для выполнения команды. На позиции ${counter + 1} ожидалось ${message}`) }

            }

            if (checker === ANY) {
                continue
            }
            if (checker instanceof Array) {
                if (!checker.includes(argument)) {
                    return { error: Message.warn(`Неверный аргумент на позиции ${counter + 1}. Ожидалось [${checker.join(' | ')}]`) }
                }
            } else {
                if (checker !== argument) {
                    return { error: Message.warn(`Неверный аргумент на позиции ${counter + 1}. Ожидалось ${checker}`) }
                }
            }
            ++counter
            checkedArgs[propName] = argument
        }
        return { checkedArgs: checkedArgs as CheckedArgs<T> }
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
    help: '- help [<cmd_name>] \ncmd_name - имя команды.\nПомощь по командам консоли.',
    exit: '- exit \nЗакрытие консоли.',
    quit: '- quit \nЗакрытие программы.',
    version: '- version \nТекущая версия программы.',
    reload: '- reload \nПерезагрузка программы.',
    reset: '- reset \nСброс настроек программы.',
    checkUpdate: '- checkUpdate \nПринудительная проверка обновления (игнорирует настройку "обновления").',
    read: '- read \nОткрывает окно выбора .xml файла.\nСчитывает файл в память для его дальнейшего изменения с помощью команды "set".',
    set: '- set <selector> <attribute> <value> \nНаходит элемент xml файла по селектору и устанавливает значение атрибута.\nВажно! Селектор и значение должны быть БЕЗ ПРОБЕЛОВ.',
    addMod: '- addMod \nОткрывает окно выбора .pak файла модификации и добавляет его в программу.',
    delMod: '- delMod <mod_id> \nУдаляет указанную модификацию из программы.',
    devTools: '- devTools enable|disable \nВключает/выключает devTools на всех последующих страницах.',
    sset: '- sset <setting_name> true|false \nУстанавливает значение настройки.',
    backup: '- backup save|restore \nСохраняет/восстанавливает бэкап initial.pak',
    archive: '- archive saveChanges|unpack \nСохраняет изменения или распаковывает initial.pak',
    lang: '- lang RU|EN|DE \nУстанавливает язык перевода программы.',
    config: '- config import|export \nИмпорт/экспорт конфиг-файла.',
    whatsNew: '- whatsNew \nОткрывает окно "Что нового".',
    exportAll: '- exportAll \nЭкспортирует все параметры всех авто и их зависимостей в файл в папке backups.',
    epf: '- epf see|join \nПозволяет работать с файлами .epf.',
    exec: '- exec [-force] \nПозволяет использовать систему SXMLE_Execute.\nФлаг -force убирает предупреждения о DLC, модах и версии игры.',
    toString: () => {
        const array = []
        for (const cmdName in help) {
            if (cmdName === 'toString') continue
            array.push(help[cmdName])
        }
        return array.join('\n\n')
    }
}