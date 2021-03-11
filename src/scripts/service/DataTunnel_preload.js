/**
 * Позволяет общаться между Renderer и Preload процессами.
 */
class DataTunnel {
    #listeners = {}

    constructor() {
        window.addEventListener('message', event => {
            for (const type in this.#listeners) {
                if (type === event.data.type) {
                    for (const listener of this.#listeners[type]) {
                        listener(event.data.data)
                    }
                }
            }
        })
    }

    /**
     * Вызывает метод с указанными аргументами.
     * @param {string} methodName - имя метода
     * @param {any} args - агрументы (опционально)
     */
    invoke(methodName, args = null) {
        this.send(`method_${methodName}`, args)
    }

    /**
     * Вызывает функцию с переданными параметрами и возвращает результат
     * @param {string} funcName - имя функции
     * @param {any} args - агрументы
     */
    call(funcName, args) {
        return new Promise((resolve, reject) => {
            this.listen(`funcSend_${funcName}`, data => {
                if (!data) reject()
                resolve(data)
            })
            this.send(`funcGet_${funcName}`, args)
        })
    }

    /**
     * Получает значение свойства и возвращает его
     * @param {string} propertyName - название свойства
     */
    get(propertyName) {
        return new Promise((resolve, reject) => {
            this.listen(`send_${propertyName}`, data => {
                if (!data) reject()
                resolve(data)
            })
            this.send(`get_${propertyName}`)
        })
    }

    /**
     * Устанавливает значение свойства на данное
     * @param {string} propertyName - название свойства
     * @param {any} data - новое значение
     */
    set(propertyName, data) {
        this.send(`set_${propertyName}`, data)
    }

    /**
     * На основе объекта создаёт функции/методы/свойства
     * @param {object} object - инициализируемый объект
     */
    create(object) {
        const methods = object.methods
        const funcs = object.funcs
        const props = object.props

        for (const methodName in methods) {
            this.createMethod(methodName, methods[methodName])
        }
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
     * Создаёт метод с данным названием и устанавливает обработчик для него
     * @param {string} name - имя метода
     * @param {Function} listener - обработчик
     */
    createMethod(name, listener) {
        this.listen(`method_${name}`, listener)
    }

    /**
     * Создаёт функцию с данным названием и устанавливает её
     * @param {*} name - название функции
     * @param {*} func - функция обработчик
     */
    createFunc(name, func) {
        this.listen(`funcGet_${name}`, (args) => {
            let data = func(args)
            if (!data) return
            this.send(`funcSend_${name}`, data)
        })
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
            this.listen(`get_${name}`, () => {
                let data = getter()
                if (!data) return
                this.send(`send_${name}`, data)
            })
        }
        if (setter) {
            this.listen(`set_${name}`, setter)
        }
    }

    /**
     * Устанавливает обработчик указанного события
     * @param {string} name - название события
     * @param {Function} func - обработчик
     */
    listen(name, func) {
        if (!this.#listeners[name]) {
            this.#listeners[name] = []
        }
        this.#listeners[name].push(func)
    }

    /**
     * Вызывает обработчик события с данными данными
     * @param {string} name - название события
     * @param {any} data - данные
     */
    send(name, data = null) {
        window.postMessage({
            type: name,
            data: data
        }, '*')
    }
}

module.exports = DataTunnel