import { get, setHotKey } from '../../service/funcs'
import mainProcess from '../../service/mainProcess'
import AutoComplete from './AutoComplete'
import Message from './Message'

const $input = get<HTMLInputElement>('#input')

/**
 * Класс консоли программы. 
*/
export default class EditorConsole {
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
            mainProcess.openDevTools()
        })
    }

    /**
     * Устанавливает обработчик на команду. Сработает при введении команды в поле и нажатии Enter.
    */
    static onCmd(cmd: string, listener: (args: string[]) => any) {
        this.listeners[cmd] = listener
    }
}
