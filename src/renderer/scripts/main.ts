import type {Info, MainProcess} from 'types'

const { sendSync } = window.ipc

const info: Info = sendSync('getInfo')
function errorHandler(error: Error, channel: string) {
    if (window.ipcErrorHandler)
        window.ipcErrorHandler(error.message, channel)
    else
        console.error(`Error on ${channel}.\n${error}`.replace('Error: ', ''))
}

/** Предоставляет доступ ко всем публичным методам и функциям, установленным в `index.ts`. */
export const main = new Proxy({}, {
    get(_, name: string) {
        if (info.properties.includes(name)) {
            const channel = `property_${name}_get`
            const propResult = sendSync(channel)

            if (propResult.error) {
                errorHandler(propResult.error, channel)
                return null
            }

            return propResult.value
        }
        if (info.functions.includes(name)) {
            return (...args: any[]) => {
                const channel = `function_${name}_call`
                const result = sendSync(channel, ...args)

                if (result.error) {
                    errorHandler(result.error, channel)
                    return null
                }

                return result.value
            }
        }
    },
    set(_, name: string, value: any) {
        if (info.properties.includes(name)) {
            const channel = `property_${name}_set`
            const result = sendSync(channel, value)

            if (result.error) {
                errorHandler(result.error, channel)
                return false
            }
            return true
        }
        return false
    }
}) as MainProcess
