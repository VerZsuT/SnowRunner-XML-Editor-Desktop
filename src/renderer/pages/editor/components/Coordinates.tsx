import type { FocusEvent } from "react";
import { memo, useCallback, useContext, useMemo, useState } from "react";

import { Typography } from "@mui/material";
import GridContainer from "components/styled/GridContainer";
import useResetMenu from "pages/editor/hooks/useResetMenu";
import type IInputParams from "types/IInputParams";

import { addTag } from "../helpers";
import useId from "../hooks/useId";
import useImportExport from "../hooks/useImportExport";
import useReset from "../hooks/useReset";
import MainContext from "../MainContext";
import CoordinateField from "../styled/CoordinateField";

const { basename } = window.service;

const gridStyle = {
    justifyContent: "center",
    alignItems: "center"
};

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

type Coordinate = string | number;

export default memo((props: IProps) => {
    const {
        item,
        show,
        getValue,
        setValue,
        registerReset,
        unregisterReset,
        getDefaultValue,
        exportEnabled,
        parentExportEnabled
    } = props;
    const { fileDOM, filePath, addParam, removeParam } = useContext(MainContext);

    const id = useId();
    const [x, setX] = useState<Coordinate>(() => parse(getValue()).x);
    const [y, setY] = useState<Coordinate>(() => parse(getValue()).y);
    const [z, setZ] = useState<Coordinate>(() => parse(getValue()).z);

    const stepProps = useMemo(() => ({
        step: item.step
    }), [item.step]);

    const save = useCallback(({ argX = x, argY = y, argZ = z }) => {
        const newValue = `(${argX}; ${argY}; ${argZ})`;

        addTag(fileDOM, item);
        setValue(item.selector, item.name, newValue);

        const parsed = parse(newValue);
        setX(parsed.x);
        setY(parsed.y);
        setZ(parsed.z);
    }, [fileDOM, item, setValue, x, y, z]);

    useReset({
        id,
        register: registerReset,
        unregister: unregisterReset,
        callback: [reset, [save, getDefaultValue]]
    });

    useImportExport({
        id, item,
        addParam, removeParam,
        exportParam: [() => {
            if (exportEnabled && parentExportEnabled) {
                return {
                    fileName: basename(filePath),
                    selector: item.selector,
                    name: item.name,
                    value: `(${x}; ${y}; ${z})`
                };
            }
        }, [exportEnabled, parentExportEnabled]],
        importParam: [(value: string) => {
            const thisValue = `(${x}; ${y}; ${z})`;
            if (thisValue !== value)
                save(toSave(parse(value)));
        }, [x, y, z]]
    });

    const [onContextMenu, ResetMenu] = useResetMenu({ onReset: reset });

    const saveX = useCallback((e: FocusEvent<HTMLInputElement>) => save({ argX: +e.target.value }), [save]);
    const saveY = useCallback((e: FocusEvent<HTMLInputElement>) => save({ argY: +e.target.value }), [save]);
    const saveZ = useCallback((e: FocusEvent<HTMLInputElement>) => save({ argZ: +e.target.value }), [save]);

    const setXC = useCallback((e: FocusEvent<HTMLInputElement>) => setX(e.target.value), []);
    const setYC = useCallback((e: FocusEvent<HTMLInputElement>) => setY(e.target.value), []);
    const setZC = useCallback((e: FocusEvent<HTMLInputElement>) => setZ(e.target.value), []);

    if (show === false)
        return;

    return <>
        {ResetMenu}
        <GridContainer
            style={gridStyle}
            id={id}
            onContextMenu={onContextMenu}
        >
            <Typography>X: </Typography>
            <CoordinateField
                inputProps={stepProps}
                value={x}
                onBlur={saveX}
                onChange={setXC}
            />
            <Typography>Y: </Typography>
            <CoordinateField
                inputProps={stepProps}
                value={y}
                onBlur={saveY}
                onChange={setYC}
            />
            <Typography>Z: </Typography>
            <CoordinateField
                inputProps={stepProps}
                value={z}
                onBlur={saveZ}
                onChange={setZC}
            />
        </GridContainer>
    </>;

    function reset() {
        const defaultValue = getDefaultValue();

        if (defaultValue !== undefined)
            save(toSave(parse(defaultValue)));
    }
});

function parse(value: string) {
    let array: string[];

    if (!value)
        return { x: 0, y: 0, z: 0 };

    array = value.replace("(", "").replace(")", "").replaceAll(" ", "").split(";");
    if (array.length === 1)
        array = value.replace("(", "").replace(")", "").replaceAll(" ", "").split(",");

    const [x, y, z] = array;
    return { x: +x, y: +y, z: +z };
}

function toSave(args: { x: number; y: number; z: number }) {
    const { x, y, z } = args;
    return { argX: x, argY: y, argZ: z };
}
