import { ipcMain } from "electron";
import type IFunctions from "./types/IFunctions";
import type IProperties from "./types/IProperties";

export const info = {
    properties: [],
    functions: []
};

export function linkWithRenderAs(name: keyof IFunctions): MethodDecorator {
    return (target: any, _: string, descriptor: PropertyDescriptor) => {
        linkWithRender(target, name, descriptor);
    }
}

export function linkWithRender(target: any, methodName: keyof IFunctions, descriptor: PropertyDescriptor) {
    const fn = <Function>descriptor.value;
    const originalInit = target.initRender;

    target.initRender = function() {
        if (originalInit)
            originalInit.call(this);

        linkFunction(methodName, fn.bind(this));
    }
}

/** Сделать функцию публичной, позволяя вызывать её из `renderer-process`. */
export function linkFunction(name: keyof IFunctions, func: Function) {
    info.functions.push(name);
    ipcMain.on(`function_${name}_call`, (event, ...args) => {
        try {
            const result = func(...args);
            if (!(result instanceof Promise))
                event.returnValue = { value: result };
            else
                event.returnValue = { value: undefined };
        }
        catch (error) {
            event.returnValue = { error: error };
        }
    });
}

/** Сделать переменную публичной, позволяя использовать/изменять её из `renderer-process`. */
export function linkProperty(name: keyof IProperties, value: any) {
    info.properties.push(name);

    if (value instanceof Array && value.length > 0) {
        const getter = value[0];
        const setter = value[1];

        if (typeof getter === "function") {
            ipcMain.on(`property_${name}_get`, event => {
                try {
                    const result = getter();
                    event.returnValue = { value: result };
                }
                catch (error) {
                    event.returnValue = { error: error };
                }
            });
        }
        if (typeof setter === "function") {
            ipcMain.on(`property_${name}_set`, (event, ...args) => {
                try {
                    const result = setter(args[0]);
                    event.returnValue = { value: result };
                }
                catch (error) {
                    event.returnValue = { error: error };
                }
            });
        }
    }
    else if (typeof value === "function") {
        ipcMain.on(`property_${name}_get`, event => {
            try {
                const result = value();
                event.returnValue = { value: result };
            }
            catch (error) {
                event.returnValue = { error: error };
            }
        });
    }
}
