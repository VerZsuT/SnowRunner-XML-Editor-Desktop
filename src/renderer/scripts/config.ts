import type {Config} from 'types'

const { sendSync } = window.ipc

function getConfig() {
    return sendSync('property_config_get').value
}

/** Конфигурация программы */
export const config = new Proxy({}, {
    get(_target, name) {
        const value = getConfig()[name]

        if (!Array.isArray(value) && typeof value === 'object' && value !== null) {
            return new Proxy(value, {
                get: (_target, name) => value[name],
                set(_target, name1, v) {
                    value[name1] = v
                    config[name] = value
                    return true
                }
            })
        }

        return value
    },
    set(target, name, value) {
        target[name] = value
        const result = sendSync('property_config_set', {
            key: name,
            value
        })
        return !result.error
    }
}) as Config
