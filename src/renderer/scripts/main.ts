import type IInfo from "types/IInfo";
import type IMainProcess from "types/IMainProcess";
import type IPC from "types/IPC";

const isRender = !!window.ipc;

let sendSync: IPC["sendSync"];
if (isRender)
    sendSync = window.ipc.sendSync;
else
    sendSync = global.ipc.sendSync;

const info: IInfo = sendSync("getInfo");
function errorHandler(error: Error, channel: string) {
    if (window.ipcErrorHandler)
        window.ipcErrorHandler(error.message, channel);
    else if (isRender)
        console.error(`Error on ${channel}.\n${error}`.replace("Error: ", ""));
}

/** Предоставляет доступ ко всем публичным методам и функциям, установленным в `index.ts`. */
export default <IMainProcess> new Proxy({}, {
    get(_, name: string) {
        if (info.properties.includes(name)) {
            const channel = `property_${name}_get`;
            const propResult = sendSync(channel);

            if (propResult.error) {
                errorHandler(propResult.error, channel);
                return null;
            }

            return propResult.value;
        }
        if (info.functions.includes(name)) {
            return (...args: any[]) => {
                const channel = `function_${name}_call`;
                const result = sendSync(channel, ...args);

                if (result.error) {
                    errorHandler(result.error, channel);
                    return null;
                }

                return result.value;
            };
        }
    },
    set(_, name: string, value: any) {
        if (info.properties.includes(name)) {
            const channel = `property_${name}_set`;
            const result = sendSync(channel, value);

            if (result.error) {
                errorHandler(result.error, channel);
                return false;
            }
            return true;
        }
        return false;
    }
});
