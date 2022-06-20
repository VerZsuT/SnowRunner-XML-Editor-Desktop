import { createRoot } from "react-dom/client";

import main from "./main";

const { texts } = main;
const ROOT = document.querySelector("#main");

/** Заменяет `_` на пробелы и делает первую букву большой. */
export function prettify(str: string): string {
    const text = str.replaceAll("_", " ");
    const firstChar = text[0].toUpperCase();

    return `${firstChar}${text.slice(1)}`;
}

/** Рендерит компонент в `root` контейнер страницы */
export function render(element: JSX.Element) {
    createRoot(ROOT).render(element);
}

/**
 * Возвращает игровой перевод по ключу.
 * @param key
 * @param modId - id модификации.
 */
export function getGameText(key: string, modId?: string): string {
    let value: string;

    if (modId && texts.mods[modId] && texts.mods[modId][key])
        value = texts.mods[modId][key];
    else if (texts.game[key])
        value = texts.game[key];

    if (value)
        return value;
}

export function callback(_: any, key: string, descriptor: PropertyDescriptor) {
    let fn = descriptor.value;

    return {
        configurable: true,
        get() {
            const boundFn = fn.bind(this);

            Object.defineProperty(this, key, {
                configurable: true,
                get() {
                    return boundFn;
                },
                set(value) {
                    fn = value;
                    delete this[key];
                }
            });

            return boundFn;
        },
        set(value: any) {
            fn = value;
        }
    };
}
