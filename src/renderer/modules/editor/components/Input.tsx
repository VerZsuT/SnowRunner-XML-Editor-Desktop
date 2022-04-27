import { PureComponent } from "react";
import memoizee from "memoizee";
import type { ChangeEvent, FocusEvent, MouseEvent } from "react";
import type IInputParams from "templates/types/IInputParams";
import InputType from "templates/enums/InputType";
import NumberType from "templates/enums/NumberType";
import config from "scripts/config";
import { callback } from "scripts/helpers";

import { IMainContext, MainContext } from "../MainContext";
import ResetMenu, { showResetMenu } from "./ResetMenu";

import TextField from "../styled/TextField";

const { basename } = window.service;

interface IProps {
    item: IInputParams
    isParentExport: boolean
    isExporting: boolean
    isExport: boolean
    getValue(): string
    getDefaultValue(): string
    setValue(selector: string, attName: string, value: string): void
    regReset?(id: string, func: () => void): void
    unregReset?(id: string): void
    isShow?: boolean
}

type BorderColor = "primary" | "warning" | "error";

interface IState {
    borderColor: BorderColor
    value: string | number
}

class Input extends PureComponent<IProps, IState> {
    static contextType = MainContext;
    declare context: IMainContext;

    private componentID = `input-${Math.round(Math.random()*100)}`;
    private textFieldStyle = { width: "150px" };

    private min: number;
    private max: number;
    private defaultValue: string;

    constructor(props: IProps) {
        super(props);
        this.state = {
            borderColor: "primary",
            value: props.getValue()
        };

        if (props.item.min !== -Infinity && config.settings.limits)
            this.min = props.item.min || 0;

        if (props.item.max && config.settings.limits)
            this.max = props.item.max;

        this.defaultValue = this.props.getValue();
    }

    public componentDidMount() {
        this.initIE();
        this.initReset();
    }

    public componentWillUnmount() {
        if (this.props.unregReset)
            this.props.unregReset(this.componentID);
        this.context.removeParam(this.componentID);
    }

    public render() {
        const { getDefaultValue, item, isShow } = this.props;
        const { value, borderColor } = this.state;
        let placeholder: string;

        if (isShow === false)
            return null;

        placeholder = getDefaultValue();

        return <>
            <ResetMenu />
            {item.type === InputType.number
                ? <TextField
                    id={this.componentID}
                    value={value}
                    type="number"
                    inputProps={this.stepProps(item.step)}
                    onBlur={this.saveValue}
                    onChange={this.onValueChange}
                    placeholder={placeholder}
                    onContextMenu={this.onContextMenu}
                    color={borderColor}
                />
                : <TextField
                    id={this.componentID}
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={this.onValueChange}
                    onBlur={this.saveValue}
                    onContextMenu={this.onContextMenu}
                    style={this.textFieldStyle}
                    color={borderColor}
                />
            }
        </>;
    }

    private stepProps = memoizee(
        (step: number) => ({ step })
    );

    @callback
    private onContextMenu(e: MouseEvent<HTMLInputElement>) {
        e.stopPropagation();
        showResetMenu({
            x: e.clientX,
            y: e.clientY,
            text: this.props.item.text,
            onReset: this.reset
        });
    }

    @callback
    private saveValue(e: FocusEvent<HTMLInputElement>) {
        const { item, setValue } = this.props;
        let newVal: string | number = e.target.value;
        const { fileDOM } = this.context;

        if (newVal === "")
            newVal = this.defaultValue;

        if (!fileDOM(item.selector).length) {
            const array = item.selector.split(">").map(value => value.trim());
            const name = array.pop().split("[")[0];
            const rootSelector = array.join(" > ");

            fileDOM(rootSelector).eq(0).append(`<${name}></${name}>`);
        }
        setValue(item.selector, item.name, String(newVal));
        this.setState({ value: newVal });
    }

    @callback
    private onValueChange(e: ChangeEvent<HTMLInputElement>) {
        let newVal: string | number = e.target.value;

        if (this.props.item.type !== InputType.text && newVal !== "")
            newVal = this.limit(+newVal);

        this.changeColor(+newVal);
        this.setState({ value: newVal });
    }

    private limit(num: number) {
        if (this.props.item.numberType === NumberType.integer)
            num = Math.round(num);

        if (this.min !== undefined && num < this.min)
            return this.min;

        if (this.max !== undefined && num > this.max)
            return this.max;

        return num;
    }

    @callback
    private changeColor(value: number) {
        const { item } = this.props;
        let newVal: number = value;

        if (value === null || value === NaN)
            newVal = 0;

        if (item.areas) {
            let color: BorderColor = "primary";

            for (const areaName in item.areas) {
                const value = item.areas[areaName];

                for (const area of value) {
                    if (newVal >= area[0] && newVal <= area[1]) {
                        if (areaName === "red")
                            color = `error`;
                        else if (areaName === "green")
                            color = `primary`;
                        else if (areaName === "yellow")
                            color = `warning`;
                    }
                }
            }
            this.setState({ borderColor: color });
        }
    }

    private initIE() {
        const { item, isExport, isParentExport } = this.props;
        const { value } = this.state;
        const { addParam, filePath } = this.context;

        if (item.type === "file")
            return;

        addParam({
            id: this.componentID,
            forExport: () => {
                if (isExport && isParentExport) {
                    return {
                        selector: item.selector,
                        name: item.name,
                        fileName: basename(filePath),
                        value
                    };
                }
            },
            forImport: {
                setValue: (newValue: string) => {
                    if (value !== newValue)
                        this.saveValue({ target: { value: newValue } } as FocusEvent<HTMLInputElement>);
                },
                selector: item.selector,
                name: item.name,
                fileName: basename(filePath)
            }
        });
    }

    private initReset() {
        if (this.props.regReset)
            this.props.regReset(this.componentID, this.reset);
    }

    @callback
    private reset() {
        const defaultValue = this.props.getDefaultValue();

        if (defaultValue !== undefined)
            this.saveValue({ target: { value: defaultValue } } as FocusEvent<HTMLInputElement>);
    }
}

export default Input;
