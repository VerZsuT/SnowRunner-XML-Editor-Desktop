import { memo, useCallback, useState } from "react";

import useHandleKey from "hooks/useHandleKey";

import { warn } from "../service";
import AutoComplete from "./AutoComplete";

interface IProps {
    listeners: {
        [name: string]: (args: string[]) => void | JSX.Element;
    };
    onError(error: JSX.Element): void;
}

/** Компонент консоли программы. */
export default memo((props: IProps) => {
    const { listeners, onError } = props;
    const [cmd, setCmd] = useState("");

    useEnterHotkey();

    const onAutoInput = useCallback((value: string) => {
        const params = cmd.split(" ");

        if (value.startsWith(params.slice(-1)[0]) && params.slice(-1)[0] !== value)
            params.pop();

        params.push(value);

        if (params.length > 1)
            setCmd(params.join(" "));
        else
            setCmd(params[0]);

        (document.querySelector("#input") as HTMLInputElement).focus();
    }, [cmd]);

    return (
        <div className="line">
            <AutoComplete cmd={cmd} onInput={onAutoInput} />
            <span>:/ </span>
            <input
                autoFocus
                id="input"
                value={cmd}
                onInput={e => setCmd(e.currentTarget.value)}
                placeholder="cmd"
            />
        </div>
    );

    function useEnterHotkey() {
        useHandleKey({
            key: "Enter"
        }, () => {
            const params = cmd.split(" ");
            const task = params[0];

            if (listeners[task]) {
                const error = listeners[task](params.slice(1));
                if (error)
                    onError(error);
            }
            else {
                onError(warn(`Неверная команда "${task}"`));
            }

            setCmd("");
            (document.querySelector("#input") as HTMLInputElement).focus();
        }, [cmd, onError]);
    }
});
