import { getText, TKeys } from './funcs'

const info: IInfo = ipcRenderer.sendSync('getInfo')
const errorHandler = (error: Error) => {
    ipcRenderer.sendSync('function_alertSync_call', getText(<TKeys>`${error}`.replace('Error: ', '')))
}
/**
 * Предоставляет доступ ко всем публичным методам и функция, установленным в index.js.
*/
export default <IMainProcess>new Proxy({}, {
    get(_, name: string) {
        if (info.properties.includes(name)) {
            const propResult = ipcRenderer.sendSync(`property_${name}_get`)
            if (propResult.error) {
                errorHandler(propResult.error)
                return null
            } else {
                return propResult.value
            }
        } else if (info.functions.includes(name)) {
            return new Proxy(()=>{}, {
                apply(_, _2, args: any[]) {
                    const result = ipcRenderer.sendSync(`function_${name}_call`, ...args)
                    if (result.error) {
                        errorHandler(result.error)
                        return null
                    } else {
                        return result.value
                    }
                }
            })
        }
    },
    set(_, name: string, value: any) {
        if (info.properties.includes(name)) {
            const result = ipcRenderer.sendSync(`property_${name}_set`, value)
            if (result.error) {
                errorHandler(result.error)
                return false
            }
            return true
        }
        return false
    }
})
