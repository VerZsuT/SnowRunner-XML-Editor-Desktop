import type IConfig from "types/IConfig";

const sendSync = window.ipc.sendSync;

function getConfig() {
    return sendSync("property_config_get").value;
}

/** Конфигурация программы */
const config = <IConfig> new Proxy({}, {
    get(_target, name) {
        const value = getConfig()[name];

        if (!Array.isArray(value) && typeof value === "object" && value !== null) {
            return new Proxy(value, {
                get(_target, name) { return value[name]; },
                set(_target, name1, v) {
                    value[name1] = v;
                    config[name] = value;
                    return true;
                }
            });
        }

        return value;
    },
    set(target, name, value) {
        target[name] = value;
        const result = sendSync("property_config_set", {
            key: name,
            value
        });
        return !result.error;
         

    }
});

export default config;
