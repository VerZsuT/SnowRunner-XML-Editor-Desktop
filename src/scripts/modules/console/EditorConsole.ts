import { get, setHotKey, mainProcess } from '../../service'

import AutoComplete from './AutoComplete'
import Message from './Message'

const $input = get<HTMLInputElement>('#input')

type CmdListener<T  extends ArgsCheckObj> = (args: CheckedArgs<T>) => any
type ArgsType = typeof ANY | string | string[]
type CheckedArgs<T  extends ArgsCheckObj> = {
    [name in keyof T]: T[name]
}

interface ArgsCheckObj {
    [propName: string]: ArgsType | [typeof OPTIONAL, ArgsType]
}

export const ANY = 'ANY_ARGUMENT'
export const OPTIONAL = 'OPTIONAL_ARGUMENT'

/**
 * Класс консоли программы. 
*/
export class EditorConsole {
    private static listeners = {}

    /**
     * Инициализирует консоль.
    */
    static init() {
        $input.focus()

        setHotKey({
            key: 'Enter'
        }, () => {
            const params = $input.value.split(' ')
            const cmd = params[0]
    
            if (this.listeners[cmd]) {
                this.listeners[cmd](params.slice(1))
            } else {
                Message.warn(`Неверная команда '${cmd}'`)
            }
    
            $input.value = ''
            AutoComplete.reset()
        })

        setHotKey({
            key: 'KeyI',
            ctrlKey: true,
            shiftKey: true
        }, () => {
            mainProcess.toggleDevTools()
        })

        document.body.addEventListener('click', () => {
            $input.focus()
        })
    }

    /**
     * Устанавливает обработчик на команду. Сработает при введении команды в поле и нажатии Enter.
    */
    static onCmd<T extends ArgsCheckObj>(cmd: string, listener: CmdListener<T>, argsCheckObj?: T): void {
        /**
         * Проверяет аргументы на соответствие шаблону.
        */
        const checkArgs = (args: string[]) => {
            let checkedArgs: {[name: string]: string} = {}
            let counter = 0
            if (!argsCheckObj) {
                return checkedArgs as CheckedArgs<T>
            }
            for (const propName in argsCheckObj) {
                let isOptional = false
                let checker = argsCheckObj[propName]
                const argument = args[counter]
                if (checker instanceof Array && checker[0] === OPTIONAL) {
                    checker = <T[Extract<keyof T, string>]><unknown>checker[1]
                    isOptional = true
                }

                if (argument === undefined) {
                    if (isOptional) {
                        continue
                    }
                    const message = checker instanceof Array? `[${checker.join(' | ')}]` : checker
                    Message.warn(`Недостаточно аргументов для выполнения команды. На позиции ${counter + 1} ожидалось ${message}`)
                    return
                }

                if (checker === ANY) {
                    continue
                }
                if (checker instanceof Array) {
                    if (!checker.includes(argument)) {
                        Message.warn(`Неверный аргумент на позиции ${counter + 1}. Ожидалось [${checker.join(' | ')}]`)
                        return
                    }
                } else {
                    if (checker !== argument) {
                        Message.warn(`Неверный аргумент на позиции ${counter + 1}. Ожидалось ${checker}`)
                        return
                    }
                }
                ++counter
                checkedArgs[propName] = argument
            }
            return checkedArgs as CheckedArgs<T>
        } 


        this.listeners[cmd] = (args: string[]) => {
            const checkedArgs = checkArgs(args)
            if (checkedArgs) listener(checkedArgs)
        }
    }
}
