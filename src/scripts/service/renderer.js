import { getText } from './funcs.js'

/**
 * Позволяет общаться между Renderer и Preload процессами.
 * Предоставляет методы для Renderer процесса.
*/
class RendererProcess {
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
                    else listener()
                }
            }
        })
    }

   /**
    * Вызывает функцию с переданными параметрами.
    * @param {string} funcName - имя функции.
    * @param {any} args - агрументы. Может быть как одиночным, так и массивом (автоматически распакуется при передаче в функцию).
    * @param {Function} onSuccess - вызывается при удачном завершении операции.
    * @param {Function} onError - вызывается при возникновении ошибки. Функции передаётся ошибка. По умолчанию: alert.
    */
    call(funcName, args=null, onSuccess=(()=>{}), onError=(error => alert(getText(error)))) {
        new Promise((resolve, reject) => {
           this.#listenResAndRej(`func_${funcName}_call`, resolve, reject)
           this.#send(`func_${funcName}_call`, args)
        }).then(onSuccess).catch(onError)
    }

   /**
    * Получает значение свойства.
    * @param {string} propertyName - название свойства.
    * @param {Function} onSuccess - вызывается при удачном завершении операции.
    * @param {Function} onError - вызывается при возникновении ошибки. Функции передаётся ошибка. По умолчанию: alert.
    */
    get(propertyName, onSuccess=(()=>{}), onError=(error => alert(getText(error)))) {
        new Promise((resolve, reject) => {
            this.#listenResAndRej(`prop_${propertyName}_get`, resolve, reject)
            this.#send(`prop_${propertyName}_get`)
        }).then(onSuccess).catch(onError)
    }

   /**
    * Устанавливает значение свойства.
    * @param {string} propertyName - название свойства.
    * @param {any} data - новое значение.
    * @param {Function} onSuccess - вызывается при удачном завершении операции.
    * @param {Function} onError - вызывается при возникновении ошибки. Функции передаётся ошибка. По умолчанию: alert.
    */
    set(propertyName, data, onSuccess=(()=>{}), onError=(error => alert(getText(error)))) {
        new Promise((resolve, reject) => {
            this.#listenResAndRej(`prop_${propertyName}_set`, resolve, reject)
            this.#send(`prop_${propertyName}_set`, data)
        }).then(onSuccess).catch(onError)
    }

   /**
    * Устанавливает обработчики resolve и reject для данного имени.
    * @param {string} name - имя.
    * @param {Function} resolve
    * @param {Function} reject 
    */
    #listenResAndRej(name, resolve, reject) {
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

const renderer = new RendererProcess()

export default renderer
