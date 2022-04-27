import { Fragment, PureComponent } from "react";
import type { Cheerio, CheerioAPI, Element, Node } from "cheerio";
import type IInputParams from "templates/types/IInputParams";
import type ISelectParams from "templates/types/ISelectParams";
import FileType from "templates/enums/FileType";
import { process } from "scripts/dom";
import main from "scripts/main";
import { callback } from "scripts/helpers";

import { IMainContext, MainContext } from "../MainContext";
import Coordinates from "./Coordinates";
import Input from "./Input";
import Select from "./Select";
import Parameters from "./Parameters";

import { Checkbox, TableCell, Typography } from "@mui/material";
import TableRow from "../styled/TableRow";
import ParamText from "../styled/ParamText";
import ParamValue from "../styled/ParamValue";

const { findFromDLC } = window.editorPreload;
const { existsSync } = window.service;
const { paths } = main;

interface InnerItem {
    filePath: string
    fileName: string
    fileDOM: CheerioAPI
    mod: string
    dlc: string
    templates: Cheerio<Node>
    tableItems: any[]
    defaults: {
        [selector: string]: {
            [attr: string]: string | number
        }
    }
}

interface IProps {
    item: any
    isExporting: boolean
    isParentExport: boolean
    regReset?(id: string, func: () => void): void
    unregReset?(id: string): void
    isShow?: boolean
}

interface IState {
    isExport: boolean
    innerItems: InnerItem[]
}

class Parameter extends PureComponent<IProps, IState> {
    static contextType = MainContext;
    declare context: IMainContext;

    private emptyContStyle = { height: "60px" };
    private cellStyle = { width: "20px" };

    constructor(props: IProps) {
        super(props);
        this.state = {
            isExport: props.isParentExport,
            innerItems: null
        };
    }

    public componentDidMount() {
        const { item } = this.props;
        const { fileDOM, currentDLC: contextDLC, currentMod: contextMod, addToSave } = this.context;

        if (item.type === "file") {
            const items: InnerItem[] = [];
            const propsItem: IInputParams = item;
            const fileNames: string[] = (String(propsItem.value)).split(",").map((value) => value.trim());
            const defaults = main.defaults;

            if (propsItem.fileType === FileType.wheels && propsItem.name !== "Type") {
                this.context.fileDOM("Truck > TruckData > CompatibleWheels").map((_, el) => {
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
                    defaults: defaults[fileName + ".xml"] || {}
                });
            }
            this.setState({ innerItems: items });
        }
    }

    public render() {
        const { isExporting, regReset, unregReset, isShow, isParentExport, item } = this.props;
        const { innerItems, isExport } = this.state;

        let items: JSX.Element[] = [];

        if (innerItems) {
            for (const item of innerItems) {
                const mainContext: IMainContext = {
                    ...this.context,
                    fileDOM: item.fileDOM,
                    filePath: item.filePath,
                    currentDLC: item.dlc,
                    currentMod: item.mod,
                    templates: item.templates,
                    tableItems: item.tableItems,
                    defaults: item.defaults
                };

                items.push(<Fragment key={item.filePath}>
                    <MainContext.Provider value={mainContext}>
                        <Parameters
                            isExporting={isExporting}
                            postfix={item.fileName}
                            regReset={regReset}
                            unregReset={unregReset}
                            isShow={isShow}
                        />
                    </MainContext.Provider>
                </Fragment>);
            }
        }

        if (items.length) {
            return items;
        }

        const defaultProps = {
            isExporting,
            isParentExport,
            isExport,
            getValue: this.getValue,
            getDefaultValue: this.getDefaultValue,
            setValue: this.setValue,
            regReset,
            unregReset,
            isShow: isShow ?? true
        };
        let element = <Input {...defaultProps} item={item as IInputParams}/>;

        if (item.inputType === "select")
            element = <Select {...defaultProps} item={item as ISelectParams}/>;

        if (item.type === "coordinates")
            element = <Coordinates {...defaultProps} item={item as IInputParams}/>;

        if (isShow === false)
            return <div style={this.emptyContStyle}>{element}</div>;

        return (
            <TableRow>
                <ParamText>
                    <Typography>
                        {item.text}
                    </Typography>
                </ParamText>
                <ParamValue>{element}</ParamValue>
                {isExporting && item.type !== "file" ?
                    <TableCell style={this.cellStyle}>
                        <Checkbox
                            checked={isExport && isParentExport}
                            onChange={this.toggleExporting}    
                        />
                    </TableCell>
                : null}
            </TableRow>
        );
    }

    @callback
    private toggleExporting() {
        if (this.props.isParentExport)
            this.setState({ isExport: !this.state.isExport });
    }

    @callback
    private getValue() {
        const { templates, fileDOM } = this.context;
        const { item } = this.props;
        let value = item.value;

        if (fileDOM(item.selector).length) {
            if (fileDOM(item.selector).attr(item.name))
                value = fileDOM(item.selector).attr(item.name);
        }

        if (!value && value !== 0 && templates)
            value = this.getFromTemplates();

        if (value === null || value === undefined)
            value = item.default;

        return value;
    }

    @callback
    private getFromTemplates() {
        const { fileDOM, templates } = this.context;
        const { item } = this.props;
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
                templateName = this.getParentTemplate(el);

            if (templateName) {
                const template = templates.find(templateName).eq(0);

                if (template.length) {
                    const templateValue = template.attr(item.name);
                    let el2: Cheerio<Element>;
                    if (templateValue)
                        return templateValue;

                    el2 = template.find(tagName).eq(0);
                    if (el2.length) {
                        const templateValue2 = el2.attr(item.name);
                        let templateName1: string;

                        if (templateValue2)
                            return templateValue2;

                        templateName1 = el2.attr("_template");
                        if (templateName1)
                            return this.getValueInGlobal(templateName1, tagName);
                    }
                }
                else {
                    return this.getValueInGlobal(templateName, tagName);
                }
            }
        }
    }

    @callback
    private setValue(selector: string, attrName: string, value: string | number) {
        const { fileDOM } = this.context;
        const element = fileDOM(selector);

        element.attr(attrName, String(value));
    }

    @callback
    private getDefaultValue() {
        const { defaults } = this.context;
        const selector = this.props.item.selector;
        const name = this.props.item.name;

        if (!defaults[selector] || defaults[selector][name] === undefined)
            return undefined;

        return String(defaults[selector][name]);
    }

    @callback
    private getValueInGlobal(templateName: string, tagName: string) {
        const { globalTemplates } = this.context;
        const template = globalTemplates(`${tagName} > ${templateName}`);

        if (template.length) {
            const templateValue = template.attr(this.props.item.name);
            if (templateValue) {
                return templateValue;
            }
            else {
                const el2 = template.find(tagName).eq(0);
                if (el2.length) {
                    const templateValue2 = el2.attr(this.props.item.name);
                    if (templateValue2)
                        return templateValue2;
                }
            }
        }
        return this.props.item.value;
    }

    @callback
    private getParentTemplate(el: Cheerio<any>) {
        if (el.parent().length) {
            const template = el.parent().attr("_template");
            if (template)
                return template;
            else
                return this.getParentTemplate(el.parent());
        }
    }
}

export default Parameter;
