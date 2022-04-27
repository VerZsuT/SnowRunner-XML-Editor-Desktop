import type IConfig from "main/types/IConfig";
import type IPC from "./types/IPC";

let sendSync: IPC["sendSync"];
if (window.ipc)
    sendSync = window.ipc.sendSync;
else if (global["ipc"])
    sendSync = global["ipc"].sendSync;

function getConfig() {
    return sendSync("property_config_get").value;
}

const config = <IConfig>new Proxy({}, {
    get: (_target, name) => {
        const value = getConfig()[name];

        if (!Array.isArray(value) && typeof value === "object" && value !== null) {
            return new Proxy(value, {
                get: (_target, name) => {
                    return value[name];
                },
                set: (_target, name1, v) => {
                    value[name1] = v;
                    config[name] = value;
                    return true;
                }
            });
        }
        else {
            return value;
        }
    },
    set(target, name, value) {
        target[name] = value;
        const result = sendSync(`property_config_set`, {
            key: name,
            value: value
        });
        if (result.error)
            return false;
        else
            return true;
    }
})

export default config;
