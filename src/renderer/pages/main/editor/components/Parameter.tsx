import { Fragment, memo, useCallback, useContext, useState } from "react";

import { Checkbox, TableCell, Typography } from "@mui/material";
import type { Cheerio, CheerioAPI } from "cheerio";
import FileType from "enums/FileType";
import InputType from "enums/InputType";
import useOnMount from "hooks/useOnMount";
import memoizee from "memoizee";
import { process } from "scripts/dom";
import getPreload from "scripts/getPreload";
import main from "scripts/main";
import type IEditorPreload from "types/IEditorPreload";
import type IInputParams from "types/IInputParams";
import type ISelectParams from "types/ISelectParams";
import type IStyles from "types/IStyles";
import type ITemplateParams from "types/ITemplateParams";

import MainContext, { IMainContext } from "../MainContext";
import ParamText from "../styled/ParamText";
import ParamValue from "../styled/ParamValue";
import TableRow from "../styled/TableRow";
import Coordinates from "./Coordinates";
import Input from "./Input";
import Parameters from "./Parameters";
import Select from "./Select";

const { findFromDLC } = getPreload<IEditorPreload>("editorPreload");
const { existsSync } = window.service;
const { paths } = main;

interface InnerItem {
    filePath: string;
    fileName: string;
    fileDOM: CheerioAPI;
    mod: string;
    dlc: string;
    templates: Cheerio<"_templates">;
    tableItems: ITemplateParams;
    defaults: {
        [selector: string]: {
            [attr: string]: string | number;
        };
    };
}

interface IProps {
    item: IInputParams & ISelectParams;
    exportMode: boolean;
    parentExportEnabled: boolean;
    registerReset?(id: string, func: () => void): void;
    unregisterReset?(id: string): void;
    show?: boolean;
}

const styles: IStyles = {
    emptyCont: { height: "60px"},
    cell: { width: "20px" }
};

export default memo((props: IProps) => {
    const {
        item,
        show,
        exportMode,
        parentExportEnabled,
        registerReset,
        unregisterReset
    } = props;
    const context = useContext(MainContext);
    const {
        fileDOM,
        currentDLC: contextDLC,
        currentMod: contextMod,
        addToSave,
        templates,
        globalTemplates,
        defaults
    } = context;

    const [innerItems, setInnerItems] = useState<InnerItem[]>(null);
    const [exportEnabled, setExportEnabled] = useState(parentExportEnabled);

    useOnMount(() => {
        if (item.type === InputType.file)
            processFile();
    });

    const toggleExporting = useCallback(() => {
        if (parentExportEnabled)
            setExportEnabled(prev => !prev);
    }, [parentExportEnabled]);

    const getValue = useCallback(() => {
        let value = item.value;

        if (fileDOM(item.selector).length) {
            if (fileDOM(item.selector).attr(item.attribute))
                value = fileDOM(item.selector).attr(item.attribute);
        }

        if ([null, undefined].includes(value) && templates)
            value = getFromTemplates(fileDOM, item, templates, globalTemplates);

        if (value === null || value === undefined)
            value = item.default;

        return value;
    }, [item, fileDOM, templates, globalTemplates]);

    const setValue = useCallback((selector: string, attrName: string, value: string | number) => {
        fileDOM(selector).attr(attrName, String(value));
    }, [fileDOM]);

    const getDefaultValue = useCallback(() => {
        if (!defaults[item.selector] || defaults[item.selector][item.attribute] === undefined)
            return undefined;

        return String(defaults[item.selector][item.attribute]);
    }, [defaults, item]);

    const items: JSX.Element[] = [];

    const mainContext = memoizee((context: IMainContext, item: InnerItem) => ({
        ...context,
        fileDOM: item.fileDOM,
        filePath: item.filePath,
        currentDLC: item.dlc,
        currentMod: item.mod,
        templates: item.templates,
        tableItems: item.tableItems,
        defaults: item.defaults
    }));

    if (innerItems) {
        for (const item of innerItems) {
            items.push(<Fragment key={item.filePath}>
                <MainContext.Provider value={mainContext(context, item)}>
                    <Parameters
                        exportMode={exportMode}
                        registerReset={registerReset}
                        unregisterReset={unregisterReset}
                        show={show}
                    />
                </MainContext.Provider>
            </Fragment>);
        }
    }

    if (items.length)
        return <>{items}</>;

    const defaultProps = {
        parentExportEnabled,
        exportEnabled,
        registerReset,
        unregisterReset,
        getValue,
        getDefaultValue,
        setValue,
        show: show ?? true,
        item
    };
    let element = <Input {...defaultProps}/>;

    if (item.inputType === "select")
        element = <Select {...defaultProps}/>;

    if (item.type === "coordinates")
        element = <Coordinates {...defaultProps}/>;

    if (show === false)
        return <div style={styles.emptyCont}>{element}</div>;

    return (
        <TableRow>
            <ParamText>
                <Typography>
                    {item.label}
                </Typography>
            </ParamText>
            <ParamValue>{element}</ParamValue>
            {exportMode && item.type !== "file"
                ? (
                    <TableCell style={styles.cell}>
                        <Checkbox
                            checked={exportEnabled && parentExportEnabled}
                            onChange={toggleExporting}
                        />
                    </TableCell>
                )
                : null}
        </TableRow>
    );

    function processFile() {
        const items: InnerItem[] = [];
        const propsItem: IInputParams = item;
        const fileNames: string[] = (String(propsItem.value)).split(",").map(value => value.trim());
        const { defaults } = main;

        if (propsItem.fileType === FileType.wheels && propsItem.attribute !== "Type") {
            fileDOM("Truck > TruckData > CompatibleWheels").map((_, el) => {
                const type = fileDOM(el).attr("Type");
                if (!fileNames.includes(type))
                    fileNames.push(type);
            });
        }

        for (const fileName of fileNames) {
            const pathsToFiles = [`${paths.classes}\\${propsItem.fileType}\\${fileName}.xml`];
            let mainPath: string;
            let currentDLC: string;
            let currentMod: string;

            if (contextDLC) {
                const dlcPath = `${paths.dlc}\\${contextDLC}\\classes\\${propsItem.fileType}\\${fileName}.xml`;
                pathsToFiles.push(dlcPath);
                currentDLC = contextDLC;
            }
            else if (contextMod) {
                const modPath = `${paths.modsTemp}\\${contextMod}\\classes\\${propsItem.fileType}\\${fileName}.xml`;
                pathsToFiles.push(modPath);
                currentMod = contextMod;
            }

            for (const path of pathsToFiles) {
                if (existsSync(path))
                    mainPath = path;
            }

            if (!mainPath) {
                mainPath = findFromDLC(fileName, propsItem.fileType);
                currentMod = undefined;
            }
            if (!mainPath)
                continue;

            const [fileDOM, tableItems] = process(mainPath);
            addToSave(currentMod, currentDLC, fileDOM, mainPath, propsItem.fileType);

            items.push({
                filePath: mainPath,
                fileName,
                fileDOM,
                dlc: currentDLC,
                mod: currentMod,
                templates: fileDOM("_templates"),
                tableItems,
                defaults: defaults[`${fileName}.xml`] || {}
            });
        }
        setInnerItems(items);
    }
});

function getFromTemplates(fileDOM: CheerioAPI, item: IProps["item"], templates: Cheerio<"_templates">, globalTemplates: CheerioAPI) {
    let el = fileDOM(item.selector);
    const array = item.selector.split(" ")
        .map((value: string) => value.trim())
        .filter((value: string) => value !== ">");
    const innerName = array.slice(array.length - 1)[0];
    const tagName = innerName.split("[")[0];

    if (!el.length)
        el = fileDOM(array.slice(0, array.length - 1).join(" > "));

    if (el.length) {
        let templateName = el.attr("_template");
        if (!templateName)
            templateName = getParentTemplate(el);

        if (templateName) {
            const template = templates.find(templateName).eq(0);

            if (template.length) {
                const templateValue = template.attr(item.attribute);
                if (templateValue)
                    return templateValue;

                const el2 = template.find(tagName).eq(0);
                if (el2.length) {
                    const templateValue2 = el2.attr(item.attribute);

                    if (templateValue2)
                        return templateValue2;

                    const templateName1 = el2.attr("_template");
                    if (templateName1)
                        return getValueInGlobal(templateName1, tagName, globalTemplates, item);
                }
            }
            else {
                return getValueInGlobal(templateName, tagName, globalTemplates, item);
            }
        }
    }
}

function getValueInGlobal(templateName: string, tagName: string, globalTemplates: CheerioAPI, item: IProps["item"]) {
    const template = globalTemplates(`${tagName} > ${templateName}`);

    if (template.length) {
        const templateValue = template.attr(item.attribute);
        if (templateValue)
            return templateValue;

        const el2 = template.find(tagName).eq(0);
        if (el2.length) {
            const templateValue2 = el2.attr(item.attribute);
            if (templateValue2)
                return templateValue2;
        }
    }
    return item.value;
}

function getParentTemplate(el: Cheerio<any>) {
    if (el.parent().length) {
        const template = el.parent().attr("_template");
        if (template)
            return template;
        return getParentTemplate(el.parent());
    }
}
