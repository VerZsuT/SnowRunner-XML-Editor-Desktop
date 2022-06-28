import { useContext, useEffect } from "react";

import makeCallback from "hooks/makeCallback";
import type IIEParam from "types/IIEParam";
import type IInputParams from "types/IInputParams";

import MainContext from "../MainContext";

const { basename } = window.service;

type ForExport = IIEParam["forExport"];
type SetValue = IIEParam["forImport"]["setValue"];

interface IImportExportConfig {
    /** Функция добавления параметра к импорту/экспорту */
    addParam(param: IIEParam): void;
    /** Функция удаления параметра из импорта/экспорта */
    removeParam(id: string): void;
    /** ID компонента */
    id: string;
    item: IInputParams;
    /**
     * Выполняется во время экспорта.
     * Без зависимостей - `функция`.
     * С зависимостями - `[функция, [зависимости]]`
     */
    exportParam: ForExport | [ForExport, any[]];
    /**
     * Выполняется во время импорта.
     * Без зависимостей - `функция`.
     * С зависимостями - `[функция, [зависимости]]`
     */
    importParam: SetValue | [SetValue, any[]];
}

/** Добавляет функционал импорта/экспорта параметра */
export default (config: IImportExportConfig) => {
    const { addParam, removeParam, item, id } = config;
    const exportParam = makeCallback(config.exportParam);
    const importParam = makeCallback(config.importParam);

    const { filePath } = useContext(MainContext);

    useEffect(() => {
        addParam({
            id,
            forExport: exportParam,
            forImport: {
                setValue: importParam,
                selector: item.selector,
                name: item.attribute,
                fileName: basename(filePath)
            }
        });
        return () => removeParam(id);
    }, [importParam, exportParam, addParam, removeParam, id, item.selector, item.attribute, filePath]);
};
