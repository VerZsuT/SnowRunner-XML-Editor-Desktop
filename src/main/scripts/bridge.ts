import { ipcMain } from "electron";

import type IFunctions from "types/IFunctions";
import type IProperties from "types/IProperties";

export const info = {
    properties: [],
    functions: []
};

const isMainProcess = !!ipcMain;

type PublicFunction = 
    ((...args: any[])=>any) |
    [(...args: any[])=>any, keyof IFunctions];

type PublicProperties = {
    [name in keyof IProperties]?: (()=>IProperties[name]) | [()=>IProperties[name], (value: IProperties[name])=>void];
}

/** Сделать переменные публичными, позволяя использовать/изменять их из `renderer-process` */
export function regProperties(props: PublicProperties) {
    Object.entries(props).forEach(([key, value]) => publicProperty(<keyof IProperties>key, value));
}

/** Сделать функции публичными, позволяя вызывать их из `renderer-process` */
export function regFunctions(array: PublicFunction[]) {
    array.forEach(item => {
        if (Array.isArray(item))
            regFunction(...item);
        else
            regFunction(item);
    });
}

function regFunction(func: (...args: any[])=>any, name?: keyof IFunctions) {
    const { functions } = info;
    const funcName = name ?? func.name;

    if (!isMainProcess || functions.includes(name))
        return;

    const channel = `function_${funcName}_call`;

    if (!functions.includes(funcName))
        functions.push(funcName);

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

function publicProperty(name: string, value: (()=>any) | [()=>any, (value: any)=>void]) {
    const { properties } = info;

    if (!isMainProcess || properties.includes(name))
        return;

    const getChannel = `property_${name}_get`;
    const setChannel = `property_${name}_set`;

    if (!properties.includes(name))
        properties.push(name);

    if (Array.isArray(value) && value.length > 0) {
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
