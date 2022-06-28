import type { ChangeEvent, FocusEvent } from "react";
import { memo, useCallback, useContext, useMemo, useState } from "react";

import InputType from "enums/InputType";
import NumberType from "enums/NumberType";
import useConst from "hooks/useConst";
import type IInputParams from "types/IInputParams";

import useId from "../hooks/useId";
import useImportExport from "../hooks/useImportExport";
import useReset from "../hooks/useReset";
import useResetMenu from "../hooks/useResetMenu";
import MainContext from "../MainContext";
import TextField from "../styled/TextField";

const { basename } = window.service;

interface IProps {
    item: IInputParams;
    parentExportEnabled: boolean;
    exportEnabled: boolean;
    getValue(): string;
    getDefaultValue(): string;
    setValue(selector: string, attName: string, value: string): void;
    registerReset?(id: string, func: () => void): void;
    unregisterReset?(id: string): void;
    show?: boolean;
}

type BorderColor = "primary" | "warning" | "error";

const textFieldStyle = { width: "150px" };

export default memo((props: IProps) => {
    const {
        item,
        show,
        getValue,
        setValue: pSetValue,
        exportEnabled,
        parentExportEnabled,
        registerReset,
        unregisterReset,
        getDefaultValue
    } = props;
    const { addParam, removeParam, filePath, fileDOM } = useContext(MainContext);

    const id = useId();
    const min = useConst(props.item.min ?? 0);
    const max = useConst(props.item.max ?? Infinity);
    const defaultValue = useConst(() => getValue());

    const [borderColor, setBorderColor] = useState<BorderColor>("primary");
    const [value, setValue] = useState<string | number>(() => getValue());

    const saveValue = useCallback((e: FocusEvent<HTMLInputElement>) => {
        let newVal: string | number = e.target.value;

        if (newVal === "")
            newVal = defaultValue;

        if (!fileDOM(item.selector).length) {
            const array = item.selector.split(">").map(value => value.trim());
            const name = array.pop().split("[")[0];
            const rootSelector = array.join(" > ");

            fileDOM(rootSelector).eq(0).append(`<${name}></${name}>`);
        }
        pSetValue(item.selector, item.attribute, String(newVal));
        setValue(newVal);
    }, [defaultValue, fileDOM, item.selector, item.attribute, pSetValue]);

    const changeColor = useCallback((value: number) => {
        let newVal: number = value;

        if (value === null || isNaN(value))
            newVal = 0;

        if (item.areas) {
            let color: BorderColor = "primary";

            for (const areaName in item.areas) {
                const value = item.areas[areaName];

                for (const area of value) {
                    if (newVal >= area[0] && newVal <= area[1]) {
                        if (areaName === "red")
                            color = "error";
                        else if (areaName === "green")
                            color = "primary";
                        else if (areaName === "yellow")
                            color = "warning";
                    }
                }
            }

            setBorderColor(color);
        }
    }, [item]);

    const onValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newVal: string | number = e.target.value;

        if (item.type !== InputType.text && newVal !== "")
            newVal = limit(item, +newVal, min, max);

        changeColor(+newVal);
        setValue(newVal);
    }, [item, min, max, changeColor]);

    const reset = useCallback(() => {
        const defaultValue = getDefaultValue();

        if (defaultValue !== undefined)
            saveValue({ target: { value: defaultValue } } as FocusEvent<HTMLInputElement>);
    }, [getDefaultValue, saveValue]);

    useImportExport({
        id, item, addParam, removeParam,
        exportParam: [() => {
            if (exportEnabled && parentExportEnabled) {
                return {
                    selector: item.selector,
                    name: item.attribute,
                    fileName: basename(filePath),
                    value
                };
            }
        }, [item, exportEnabled, parentExportEnabled, value]],
        importParam: [(newValue: string) => {
            if (value !== newValue)
                saveValue({ target: { value: newValue } } as FocusEvent<HTMLInputElement>);
        }, [value, saveValue]]
    });

    useReset({
        id,
        register: registerReset,
        unregister: unregisterReset,
        callback: [() => {
            const defaultValue = getDefaultValue();

            if (defaultValue !== undefined)
                saveValue({ target: { value: defaultValue } } as FocusEvent<HTMLInputElement>);
        }, [saveValue, getDefaultValue]]
    });

    const [onContextMenu, ResetMenu] = useResetMenu({
        text: item.label,
        onReset: reset
    });

    const stepProps = useMemo(() => ({
        step: item.step
    }), [item]);

    if (show === false)
        return null;

    const placeholder = getDefaultValue();

    return <>
        {ResetMenu}
        {item.type === InputType.number
            ? (
                <TextField
                    id={id}
                    value={value}
                    type="number"
                    inputProps={stepProps}
                    onBlur={saveValue}
                    onChange={onValueChange}
                    placeholder={placeholder}
                    onContextMenu={onContextMenu}
                    color={borderColor}
                />
            )
            : (
                <TextField
                    id={id}
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={onValueChange}
                    onBlur={saveValue}
                    onContextMenu={onContextMenu}
                    style={textFieldStyle}
                    color={borderColor}
                />
            )}
    </>;
});

function limit(item: IInputParams, num: number, min?: number, max?: number) {
    let number = num;
    if (item.numberType === NumberType.integer)
        number = Math.round(number);

    if (min !== undefined && number < min)
        return min;

    if (max !== undefined && number > max)
        return max;

    return num;
}
