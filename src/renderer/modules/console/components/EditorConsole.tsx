import { PureComponent } from "react";
import type { FormEvent } from "react";
import { callback, setHotKey } from "scripts/helpers";
import { Message } from "../service";
import AutoComplete from "./AutoComplete";

interface IProps {
    listeners: {
        [name: string]: (args: string[]) => void | JSX.Element
    }
    onError(error: JSX.Element): void
}

interface IState {
    cmd: string
}

/** Класс консоли программы. */
class EditorConsole extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { cmd: "" };
    }

    public componentDidMount() {
        this.setEnterHotkey();
    }

    public render() {
        const { cmd } = this.state;

        return (
            <div className="line">
                <AutoComplete cmd={cmd} onInput={this.onAutoInput}/>
                <span>:/ </span>
                <input
                    autoFocus
                    id="input"
                    value={cmd}
                    onInput={this.onInput}
                    placeholder="cmd"
                />
            </div>
        );
    }

    @callback
    private onInput(e: FormEvent<HTMLInputElement>) {
        this.setState({ cmd: e.currentTarget.value });
    }

    private setEnterHotkey() {
        const { listeners, onError } = this.props;
        const { cmd: stateCmd } = this.state;

        setHotKey({
            key: "Enter"
        }, () => {
            const params = stateCmd.split(" ");
            const cmd = params[0];

            if (listeners[cmd]) {
                const error = listeners[cmd](params.slice(1));
                if (error)
                    onError(error);
            }
            else {
                onError(Message.warn(`Неверная команда "${cmd}"`));
            }

            this.setState({ cmd: "" });
            (document.querySelector("#input") as HTMLInputElement).focus();
        });
    }

    @callback
    private onAutoInput(value: string) {
        const { cmd } = this.state;
        const params = cmd.split(" ");

        if (value.startsWith(params.slice(-1)[0]) && params.slice(-1)[0] !== value)
            params.pop();
            
        params.push(value);

        if (params.length > 1)
            this.setState({ cmd: params.join(" ") });
        else
            this.setState({ cmd: params[0] });

        (document.querySelector("#input") as HTMLInputElement).focus();
    }
}

export default EditorConsole;
