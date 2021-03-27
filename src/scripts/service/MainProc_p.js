/**
 * Позволяет общаться между Renderer и Preload процессами.
*/
class MainProc {
    #listeners = {}

    constructor() {
        window.addEventListener('message', event => {
            const data = event.data.data
            for (const type in this.#listeners) {
                if (type === event.data.type) {
                    const listener = this.#listeners[type]
                    if (data) {
                        listener(data)
                    }
                    else {
                        listener()
                    }
                }
            }
        })
    }

    /**
     * Вызывает функцию с переданными параметрами и возвращает результат
     * @param {string} funcName - имя функции
     * @param {any} args - агрументы
     */
    call(funcName, data=null, then=null) {
        const promise = new Promise((resolve, reject) => {
            this.#resAndRej(`func_${funcName}_call`, resolve, reject)
            this.#send(`func_${funcName}_call`, data)
        })
        if (then) promise.then(then)
        promise.catch(alert)
    }

    /**
     * Получает значение свойства и возвращает его
     * @param {string} propertyName - название свойства
     */
    get(propertyName, then=null) {
        const promise = new Promise((resolve, reject) => {
            this.#resAndRej(`prop_${propertyName}_get`, resolve, reject)
            this.#send(`prop_${propertyName}_get`, data)
        })
        if (then) promise.then(then)
        promise.catch(alert)
    }

    /**
     * Устанавливает значение свойства на данное
     * @param {string} propertyName - название свойства
     * @param {any} data - новое значение
     */
    set(propertyName, data, then=null) {
        const promise = new Promise((resolve, reject) => {
            this.#resAndRej(`prop_${propertyName}_set`, resolve, reject)
            this.#send(`prop_${propertyName}_set`, data)
        })
        if (then) promise.then(then)
        promise.catch(alert)
    }

    /**
     * На основе объекта создаёт функции/методы/свойства
     * @param {object} object - инициализируемый объект
     */
    init(object) {
        const funcs = object.functions
        const props = object.props

        for (const propName in props) {
            this.createProperty(propName, {
                get: props[propName].get,
                set: props[propName].set
            })
        }
        for (const funcName in funcs) {
            this.createFunc(funcName, funcs[funcName])
        }
    }

    /**
     * Создаёт функцию с данным названием и устанавливает её
     * @param {*} name - название функции
     * @param {*} func - функция обработчик
     */
    createFunc(name, func) {
        this.#on(`func_${name}_call`, func.bind({
            resolve: this.#resolve(`func_${name}_call_resolve`),
            reject: this.#reject(`func_${name}_call_reject`)
        }))
    }

    /**
     * Создаёт свойство с данными именем и устанавливает геттер и сеттер для него
     * @param {string} name - имя свойства
     * @param {object} object - объект с геттером и сеттером
     */
    createProperty(name, object) {
        const getter = object.get
        const setter = object.set

        if (getter) {
            this.#on(`prop_${name}_get`, getter.bind({
                resolve: this.#resolve(`prop_${name}_get_resolve`),
                reject: this.#reject(`prop_${name}_get_reject`)
            }))
        }
        if (setter) {
            this.#on(`prop_${name}_set`, setter.bind({
                resolve: this.#resolve(`prop_${name}_set_resolve`),
                reject: this.#reject(`prop_${name}_set_reject`)
            }))
        }
    }

    #resolve(name) {
        return (value=null) => {
            this.#send(name, value)
        }
    }

    #reject(name) {
        return (message) => {
            this.#send(name, new Error(message))
        }
    }

    /**
     * Устанавливает обработчик указанного события
     * @param {string} name - название события
     * @param {Function} func - обработчик
     */
    #on(name, func) {
        this.#listeners[name] = func
    }

    #resAndRej(name, resolve, reject) {
        this.#listeners[`${name}_resolve`] = (...args) => {
            resolve(...args)
            this.#listeners[`${name}_resolve`] = () => {}
            this.#listeners[`${name}_reject`] = () => {}
        }
        this.#listeners[`${name}_reject`] = (...args) => {
            reject(...args)
            this.#listeners[`${name}_resolve`] = () => {}
            this.#listeners[`${name}_reject`] = () => {}
        }
    }

    /**
     * Вызывает обработчик события с данными данными
     * @param {string} name - название события
     * @param {any} data - данные
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

module.exports = MainProc