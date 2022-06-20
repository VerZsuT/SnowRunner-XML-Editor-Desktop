import { useEffect } from "react";

import makeCallback from "hooks/makeCallback";
import type ISetHotKeyConfiguration from "types/ISetHotKeyParams";

import useConstFunc from "./useConstFunc";

type Handler = (event: KeyboardEvent) => void;

/**
 * Устанавливает обработчик события нажатия кнопки
 * @param config - параметры
 * @param handler - обработчик события
 * @param deps - зависимости как в `useEffect`
 */
export default (config: ISetHotKeyConfiguration, handler: Handler, deps?: any[]) => {
    const {
        key,
        ctrlKey,
        shiftKey,
        prevent,
        eventName = (key === "Escape")? "keydown" : "keypress"
    } = config;
    const listener = makeCallback([handler, deps ?? []]);

    const eventHandler = useConstFunc((event: KeyboardEvent) => {
        // Работает - не трогай!
        if (event.code === key && ((ctrlKey && event.ctrlKey) || !ctrlKey) && ((shiftKey && event.shiftKey) || !shiftKey)) {
            if (prevent)
                event.preventDefault();
            listener(event);
        }
    });

    useEffect(() => {
        document.addEventListener(eventName, eventHandler);
        return () => {
            document.removeEventListener(eventName, eventHandler);
        };
    }, [eventHandler, eventName, listener]);
};
