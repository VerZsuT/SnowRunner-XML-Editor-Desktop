import { get, create } from '../../service/funcs'

const $messages = get('#messages')

/**
 * Позволяет писать сообщения в консоль.
*/
export default class Message {
    /**
     * Сообщение в стиле лога.
    */
    static log(text: string) {
        this.message(text)
    }

    /**
     * Сообщение в стиле предупреждения.
    */
    static warn(text: string) {
        this.message(text, 'warn')
    }

    /**
     * Сообщение в стиле ошибки.
    */
    static error(text: string) {
        this.message(text, 'error')
    }

    /**
     * Сообщение в стиле информации.
    */
    static info(text: string) {
        this.message(text, 'info')
    }

    private static message(text: string, type?: MessageType) {
        const el = create<HTMLParagraphElement>('p')
        el.innerText = `> ${text}`

        switch (type) {
            case 'warn':
                el.style.color = 'yellow'
            break
            case 'error':
                el.style.color = 'red'
            break
            case 'info':
                el.style.color = 'lightblue'
            break
        }

        $messages.append(el)
        document.scrollingElement.scrollBy(0, 1000)
    }
}
