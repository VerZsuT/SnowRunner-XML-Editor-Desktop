import { ipcMain } from "electron";

import type IFunctions from "types/IFunctions";
import type IProperties from "types/IProperties";

export const info = {
    properties: [],
    functions: []
};

const isMainProcess = !!ipcMain;

/** Сделать функцию публичной, позволяя вызывать её из `renderer-process` */
export function publicFunction(name: keyof IFunctions, func: (...any: any[]) => any) {
    const { functions } = info;

    if (!isMainProcess || functions.includes(name))
        return;

    const channel = `function_${name}_call`;

    if (!functions.includes(name))
        functions.push(name);

    ipcMain.on(channel, (event, ...args) => {
        try {
            const result = func(...args);
            if (result instanceof Promise)
                event.returnValue = {value: undefined};
            else
                event.returnValue = {value: result};
        }
        catch (error) {
            event.returnValue = {error};
        }
    });
}

/** Сделать переменную публичной, позволяя использовать/изменять её из `renderer-process` */
export function publicProperty(name: keyof IProperties, value: any) {
    const { properties } = info;

    if (!isMainProcess || properties.includes(name))
        return;

    const getChannel = `property_${name}_get`;
    const setChannel = `property_${name}_set`;

    if (!properties.includes(name))
        properties.push(name);

    if (value instanceof Array && value.length > 0) {
        const getter = value[0];
        const setter = value[1];

        if (typeof getter === "function") {
            ipcMain.on(getChannel, event => {
                try {
                    const result = getter();
                    event.returnValue = {value: result};
                }
                catch (error) {
                    event.returnValue = {error};
                }
            });
        }

        if (typeof setter === "function") {
            ipcMain.on(setChannel, (event, ...args) => {
                try {
                    const result = setter(args[0]);
                    event.returnValue = {value: result};
                }
                catch (error) {
                    event.returnValue = {error};
                }
            });
        }
    }
    else if (typeof value === "function") {
        ipcMain.on(getChannel, event => {
            try {
                const result = value();
                event.returnValue = {value: result};
            }
            catch (error) {
                event.returnValue = {error};
            }
        });
    }
}
