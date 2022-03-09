import type IInfo from 'main/types/IInfo'
import type IMainProcess from 'main/types/IMainProcess'
import type IPC from './types/IPC'

let sendSync: IPC['sendSync']
if (window.ipc)
    sendSync = window.ipc.sendSync
else
    sendSync = global['ipc'].sendSync

const info: IInfo = sendSync('getInfo')
const errorHandler = (error: Error) => {
    if (window['errorHandler'])
        window['errorHandler'](error.message)
    else
        sendSync('function_alertSync_call', `${error}`.replace('Error: ', ''))
}

/** Предоставляет доступ ко всем публичным методам и функциям, установленным в `index.ts`. */
export default <IMainProcess>new Proxy({}, {
    get: (_, name: string) => {
        if (info.properties.includes(name)) {
            const propResult = sendSync(`property_${name}_get`)

            if (propResult.error) {
                errorHandler(propResult.error)
                return null
            }
            else {
                return propResult.value
            }
        }
        else if (info.functions.includes(name)) {
            return (...args: any[]) => {
                const result = sendSync(`function_${name}_call`, ...args)

                if (result.error) {
                    errorHandler(result.error)
                    return null
                }
                else {
                    return result.value
                }
            }
        }
    },
    set: (_, name: string, value: any) => {
        if (info.properties.includes(name)) {
            const result = sendSync(`property_${name}_set`, value)
            
            if (result.error) {
                errorHandler(result.error)
                return false
            }
            return true
        }
        return false
    }
})
