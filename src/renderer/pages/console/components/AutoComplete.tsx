import { memo } from "react";

import Lang from "enums/Lang";
import config from "scripts/config";
import type IACKeys from "types/IACKeys";
import type IACPresets from "types/IACPresets";

import useControls from "../hooks/useControls";
import { help } from "../service";

interface IProps {
    cmd: string;
    onInput(value: string): void;
}

/** Подсказки для авто ввода. */
export default memo((props: IProps) => {
    const { cmd, onInput } = props;

    let value: string;
    const items = getItems(cmd.split(" ").filter(value => value !== ""));

    value = useControls(items, onInput);

    if (!items.includes(value))
        value = items[0];

    return (
        <select
            id="info"
            value={[value]}
            onInput={e => onInput(e.currentTarget.value)}
            style={{ height: items.length * 20 }}
            multiple
        >
            {items.map(value => (
                <option key={value}>{value}</option>
            ))}
        </select>
    );
});

/** Возвращает список подсказок. */
function getItems(params: string[], k = keys): string[] {
    const items: string[] = [];

    if (params.length === 0 && k !== keys) {
        if (k instanceof Array) {
            for (const key of k) 
                items.push(key);
        }
        else if (k !== undefined) {
            for (const key in k) 
                items.push(key);
        }
    }

    if (params.length === 1) {
        if (k instanceof Array) {
            for (const key of k) { 
                if (key.startsWith(params[0]) && key !== params[0])
                    items.push(key);
            }
        }
        else if (k !== undefined) {
            for (const key in k) {
                if (key === params[0])
                    items.push(...getItems(params.slice(1), k[params[0]]));
                else if (key.startsWith(params[0]))
                    items.push(key);
            }
        }
    }
    else if (params.length > 0) {
        if (!k) return;
        
        items.push(...getItems(params.slice(1), k[params[0]]));
    }
    return items;
}

/** Для каждого ключа в списке устанавливает переданное значение. */
function setPreset(keys: string[], value: string | string[]): IACKeys {
    const object = {};
    for (const key of keys)
        object[key] = value;
  
    return object;
}

interface ICombineObject {
    [name: string]: string[] | IACKeys;
}

/**
 * Объединяет переданные параметры в один объект.
 * Параметры-объекты добавляются неизменными, значение элемента массива становится ключом, а значение устанавливается `null`.
*/
function combine(...params: (ICombineObject | string[])[]): IACKeys {
    const object = {};

    for (const objOrArr of params) {
        if (objOrArr instanceof Array) {
            for (const item of objOrArr)
                object[item] = null;
        }
        else if (typeof objOrArr === "object") {
            for (const name in objOrArr)
                object[name] = objOrArr[name];
        }
    }
  
    return object;
}

/** Набор пресетов. */
const presets: IACPresets = {
    bool: [
        "true",
        "false"
    ],
    fileType: [
        "truck",
        "wheel",
        "engine",
        "suspension",
        "trailer",
        "gearbox",
        "winch"
    ]
};

const keys: IACKeys = combine([
    "exit",
    "quit",
    "version",
    "reload",
    "reset",
    "checkUpdate",
    "whatsNew",
    "exportAll"
], {
    help: Object.keys(help).filter(value => value !== "toString"),
    devTools: [
        "enable",
        "disable"
    ],
    epf: [
        "see",
        "join"
    ],
    config: [
        "import",
        "export"
    ],
    set: setPreset(Object.keys(config.settings), presets.bool),
    backup: [
        "save",
        "restore"
    ],
    archive: [
        "saveChanges",
        "unpack"
    ],
    lang: Object.keys(Lang)
});
