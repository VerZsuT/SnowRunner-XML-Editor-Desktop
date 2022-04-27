import { PureComponent } from "react";
import type { FormEvent } from "react";
import type IACKeys from "../types/IACKeys";
import type IACPresets from "../types/IACPresets";
import Lang from "main/enums/Lang";
import { callback, setHotKey } from "scripts/helpers";
import config from "scripts/config";
import { help } from "../service";
import memoizee from "memoizee";

interface IProps {
    cmd: string
    onInput(value: string): void
}

interface IState {
    value: string
}

/** Подсказки для автоввода. */
class AutoComplete extends PureComponent<IProps, IState> {
    private items: string[];

    constructor(props: IProps) {
        super(props);
        this.state = { value: "" };
    }

    public componentDidMount() {
        this.setControls();
    }

    public render() {
        const { cmd } = this.props;
        const { value } = this.state;

        let val = value;

        this.items = this.getItems(cmd.split(" ").filter(value => value !== ""));
        if (!this.items.includes(val))
            val = this.items[0];

        return (
            <select
                id="info"
                value={[val]}
                onInput={this.onInput}
                style={this.getHeight(this.items.length)}
                multiple
            >
                {this.items.map(value =>
                    <option key={value}>{value}</option>
                )}
            </select>
        );
    }

    private getHeight = memoizee((length: number) => ({
        height: length * 20
    }));

    /** Инициализирует события нажания на клавиши в поле ввода. */
    private setControls() {
        const { onInput } = this.props;
        const { value } = this.state;

        setHotKey({
            key: "ArrowDown",
            prevent: true,
            eventName: "keydown"
        }, () => {
            if (!this.items.includes(value)) {
                this.setState({ value: this.items[1] });
                return;
            }
            if (this.items.indexOf(value) === this.items.length - 1) {
                this.setState({ value: this.items[0] });
                return;
            }
            this.setState(({ value }) => ({
                value: this.items[this.items.indexOf(value) + 1]
            }));
        });
        setHotKey({
            key: "ArrowUp",
            prevent: true,
            eventName: "keydown"
        }, () => {
            if (!this.items.includes(value)) {
                this.setState({ value: this.items[this.items.length - 1] });
                return;
            }
            if (this.items.indexOf(value) === 0) {
                this.setState({ value: this.items[this.items.length - 1] });
                return;
            }
            this.setState(({ value }) => ({
                value: this.items[this.items.indexOf(value) - 1]
            }));
        });

        setHotKey({
            key: "Tab",
            eventName: "keyup"
        }, () => {
            if (!this.items.includes(value))
                onInput(this.items[0]);
            else
                onInput(value);
        });
    }

    @callback
    private onInput(e: FormEvent<HTMLSelectElement>) {
        this.props.onInput(e.currentTarget.value);
    }

    /** Возвращает список подсказок. */
    private getItems(params: string[], k = keys): string[] {
        const items: string[] = [];

        if (params.length === 0 && k !== keys) {
            if (k instanceof Array) {
                for (const key of k) {
                    items.push(key);
                }
            }
            else if (k !== undefined) {
                for (const key in k) {
                    items.push(key);
                }
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
                        items.push(...this.getItems(params.slice(1), k[params[0]]));
                    else if (key.startsWith(params[0]))
                        items.push(key);
                }
            }
        }
        else {
            if (params.length > 0) {
                if (!k)
                    return;
                items.push(...this.getItems(params.slice(1), k[params[0]]));
            }
        }
        return items;
    }
}

/** Для каждого ключа в списке устанавливает переданное значение. */
function setPreset(keys: string[], value: string | string[]): IACKeys {
    const object = {};
    for (const key of keys) {
        object[key] = value;
    }
    return object;
}

/**
 * Объединяет переданные параметры в один объект.
 * Парметры-объекты добавляются неизменными, значение элемента массива становится ключом, а значение устанавливается `null`.
*/
function combine(...params: (Object | string[])[]): IACKeys {
    const object = {};

    for (const objOrArr of params) {
        if (objOrArr instanceof Array) {
            for (const item of objOrArr) {
                object[item] = null;
            }
        }
        else if (typeof objOrArr === "object") {
            for (const name in objOrArr) {
                object[name] = objOrArr[name];
            }
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
    sset: setPreset(Object.keys(config.settings), presets.bool),
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

export default AutoComplete;
