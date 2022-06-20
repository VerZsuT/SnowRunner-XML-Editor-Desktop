import { useState } from "react";

import useHandleKey from "hooks/useHandleKey";

type InputHandler = (value: string) => void;

export default (items: string[], onInput: InputHandler) => {
    const [value, setValue] = useState("");

    useHandleKey({
        key: "ArrowDown",
        prevent: true,
        eventName: "keydown"
    }, () => {
        if (!items.includes(value)) {
            setValue(items[1]);
            return;
        }
        if (items.indexOf(value) === items.length - 1) {
            setValue(items[0]);
            return;
        }
        setValue(prev => items[items.indexOf(prev) + 1]);
    }, [items]);

    useHandleKey({
        key: "ArrowUp",
        prevent: true,
        eventName: "keydown"
    }, () => {
        if (!items.includes(value)) {
            setValue(items[items.length - 1]);
            return;
        }
        if (items.indexOf(value) === 0) {
            setValue(items[items.length - 1]);
            return;
        }
        setValue(prev => items[items.indexOf(prev) - 1]);
    }, [items]);

    useHandleKey({
        key: "Tab",
        eventName: "keyup"
    }, () => {
        if (items.length === 0) return;

        if (!items.includes(value))
            onInput(items[0]);
        else
            onInput(value);
    }, [items, value, onInput]);

    return value;
};
