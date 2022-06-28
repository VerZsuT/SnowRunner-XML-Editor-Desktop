import { memo, useCallback, useContext, useMemo, useState } from "react";

import { MenuItem, Select as SelectMUI, SelectChangeEvent } from "@mui/material";
import IInputParams from "types/IInputParams";
import type ISelectParams from "types/ISelectParams";

import { addTag } from "../helpers";
import useId from "../hooks/useId";
import useImportExport from "../hooks/useImportExport";
import useResetMenu from "../hooks/useResetMenu";
import MainContext from "../MainContext";

const { basename } = window.service;

interface IProps {
    item: ISelectParams;
    parentExportEnabled: boolean;
    exportEnabled: boolean;
    getValue(): string;
    getDefaultValue(): string;
    setValue(selector: string, attName: string, value: string): void;
    registerReset?(id: string, func: () => void): void;
    unregisterReset?(id: string): void;
    show?: boolean;
}

export default memo((props: IProps) => {
    const {
        item,
        show,
        getValue,
        setValue: pSetValue,
        exportEnabled,
        parentExportEnabled,
        getDefaultValue
    } = props;
    const {
        addParam,
        removeParam,
        filePath,
        fileDOM
    } = useContext(MainContext);

    const id = useId();
    const [value, setValue] = useState(() => getValue() ?? "");

    const options = useMemo(() => {
        return item.selectParams.map(option => (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
        ));
    }, [item]);

    const setValueC = useCallback((e: SelectChangeEvent) => {
        const newVal = e.target.value;

        addTag(fileDOM, item);
        pSetValue(item.selector, item.attribute, newVal);
        setValue(newVal);
    }, [item, pSetValue, fileDOM]);

    const reset = useCallback(() => {
        const defaultValue = getDefaultValue();
        if (defaultValue !== undefined)
            setValueC({ target: { value: defaultValue } } as SelectChangeEvent);
    }, [getDefaultValue, setValueC]);

    const [onContextMenu, ResetMenu] = useResetMenu({
        text: item.attribute,
        onReset: reset
    });

    useImportExport({
        id,
        item: item as unknown as IInputParams,
        addParam,
        removeParam,
        exportParam: [() => {
            if (exportEnabled && parentExportEnabled) {
                return {
                    selector: item.selector,
                    name: item.attribute,
                    value: getValue(),
                    fileName: basename(filePath)
                };
            }
        }, [getValue, exportEnabled, parentExportEnabled, item]],
        importParam: [(newValue: string) => {
            setValueC({ target: { value: newValue } } as SelectChangeEvent);
        }, [setValueC]]
    });

    if (show === false)
        return null;

    return <>
        {ResetMenu}
        <SelectMUI
            id={id}
            value={value}
            onChange={setValueC}
            onContextMenu={onContextMenu}
            size="small"
        >
            {options}
        </SelectMUI>
    </>;
});
