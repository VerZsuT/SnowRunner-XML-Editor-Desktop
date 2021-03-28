/**
 * Позволяет общаться между Renderer и Preload процессами.
 * Предоставляет методы для Preload процесса.
*/
class PreloadProcess {
    #listeners = {}

    constructor() {
        window.addEventListener('message', event => {
            const data = event.data.data
            for (const type in this.#listeners) {
                if (type === event.data.type) {
                    const listener = this.#listeners[type]
                    if (data) {
                        if (Array.isArray(data)) listener(...data)
                        else listener(data)
                    }
                    else listener()
                }
            }
        })
    }

    /**
     * Создаёт функцию с данным названием и устанавливает её.
     * @param {string} name - название функции.
     * @param {Function} func - функция обработчик.
     */
    createFunc(name, func) {
        const listenerName = `func_${name}_call`
        this.#on(listenerName, (...args) => {
            func({
                resolve: this.#getResolver(listenerName),
                reject: this.#getRejecter(listenerName)
            }, ...args)
        })
    }

    /**
     * Создаёт свойство с данными именем и устанавливает геттер и сеттер для него.
     * @param {string} name - имя свойства.
     * @param {object} object - объект с геттером и сеттером.
     */
    createProperty(name, object) {
        const getter = object.get
        const setter = object.set

        if (getter) {
            const listenerName = `prop_${name}_get`
            this.#on(listenerName, (...args) => {
                getter({
                    resolve: this.#getResolver(listenerName),
                    reject: this.#getRejecter(listenerName)
                }, ...args)
            })
        }
        if (setter) {
            const listenerName = `prop_${name}_set`
            this.#on(listenerName, (...args) => {
                setter({
                    resolve: this.#getResolver(listenerName),
                    reject: this.#getRejecter(listenerName)
                }, ...args)
            })
        }
    }

    /**
     * Создаёт и возвращает функцию resolve для данного имени.
     * @param {string} name - имя.
     * @returns Function(value=null). value - значение для возврата из функции обработчика.
     */
    #getResolver(name) {
        return (value=null) => {
            this.#send(`${name}_resolve`, value)
        }
    }

    /**
     * Создаёт и возвращает функцию reject для данного имени.
     * @param {string} name  - имя.
     * @returns Function(value=null). value - значение для возврата из функции обработчика.
     */
    #getRejecter(name) {
        return (message) => {
            this.#send(`${name}_reject`, new Error(message))
        }
    }

    /**
     * Устанавливает обработчик указанного события.
     * @param {string} name - название события.
     * @param {Function} func - обработчик.
     */
    #on(name, func) {
        this.#listeners[name] = func
    }

    /**
     * Вызывает обработчик события с данными данными.
     * @param {string} name - название события.
     * @param {any} data - данные.
     */
    #send(name, data=null) {
        if (data) {
            window.postMessage({
                type: name,
                data: data
            }, '*')
        }
        else {
            window.postMessage({
                type: name
            }, '*')
        }
    }
}

module.exports = new Proxy(new PreloadProcess(), {
    set(target, propName, value) {
        if (typeof value === 'function') {
            target.createFunc(propName, value)
            return true
        }
        else if (typeof value === 'object') {
            if (!value.get && !value.set) {
                return false
            }
            else {
                target.createProperty(propName, value)
                return true
            }
        }
    }
})