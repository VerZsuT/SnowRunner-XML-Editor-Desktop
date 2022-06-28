import { memo, useCallback, useState } from "react";

import { Typography } from "@mui/material";
import { message } from "antd";
import type { CheerioAPI } from "cheerio";
import { load } from "cheerio";
import DropArea from "components/DropArea";
import Menu from "components/Menu";
import Popup from "components/Popup";
import Container from "components/styled/Container";
import FileType from "enums/FileType";
import Page from "enums/Page";
import useConst from "hooks/useConst";
import useConstFunc from "hooks/useConstFunc";
import useHandleKey from "hooks/useHandleKey";
import useIPCMessage from "hooks/useIPCMessage";
import useVariable from "hooks/useVariable";
import { getGlobalTemplates, process } from "scripts/dom";
import { getGameText, prettify } from "scripts/helpers";
import main from "scripts/main";
import local from "scripts/storage";
import { FILE_PATH, CURRENT_MOD, CURRENT_DLC } from "src/consts";
import type IExportable from "types/IExportable";
import type IExportData from "types/IExportData";
import type IIEParam from "types/IIEParam";
import type IImportable from "types/IImportable";
import type IStyles from "types/IStyles";

import { route } from "../store/pageSlice";
import { useMainDispatch } from "../store/storeHooks";
import ErrorHeader from "./components/ErrorHeader";
import MainHeader from "./components/MainHeader";
import Parameters from "./components/Parameters";
import MainContext, { IMainContext } from "./MainContext";
import texts from "./texts";

import "./style.scss";

const { basename, readFileSync, writeFileSync } = window.service;
const { updateFiles, getEPF, saveEPF } = main;
const {
    SAVING_MESSAGE,
    SUCCESS_SAVE_FILES,
    SUCCESS_RESET,
    RESET_CONFIRM_MESSAGE,
    PATH_TO_SAVE_NOT_FOUND,
    PARAMS_FILE_NOT_FOUND,
    WAS_EXPORTED,
    WAS_IMPORTED,
    PROC_FILE_ERROR,
    BREAK_IMPORT_INVALID_NAME
} = texts;

const styles: IStyles = {
    errorCont: {
        padding: "0 30px",
        marginTop: "100px",
        textAlign: "center"
    },
    params: {
        padding: "0 30px",
        marginTop: "100px"
    }
};

const EXPORT_FILE_VERSION = "2.0";

interface IResetList {
    [id: string]: () => void;
}
interface IDefaults {
    [selector: string]: {
        [attribute: string]: string | number;
    };
}
type Files = {
    dom: CheerioAPI;
    path: string;
    mod: string;
    dlc: string;
    fileType: FileType;
}[];

export default memo(() => {
    useIPCMessage();
    const dispatch = useMainDispatch();

    const filePath = useConst(() => local.get<string>(FILE_PATH));
    const currentMod = useConst(() => local.get<string>(CURRENT_MOD));
    const currentDLC = useConst(() => local.get<string>(CURRENT_DLC));

    const fileDOM = useConst(() => process(filePath)[0]);
    const tableItems = useConst(() => process(filePath)[1]);
    const actions = useConst(() => process(filePath)[2]);

    const mainTitle = useConst(() => getMainTitle());
    const templates = useConst(() => fileDOM("_templates"));
    const globalTemplates = useConst(() => getGlobalTemplates());
    const defaults = useConst<IDefaults>(() => main.defaults[basename(filePath)] ?? {});
    const hasError = useConst(() => !!fileDOM("error").length);
    const files = useConst<Files>(() => [{
        path: filePath,
        dom: fileDOM,
        mod: currentMod,
        dlc: currentDLC,
        fileType: FileType.truck
    }]);

    const resetList = useConst<IResetList>({});
    const [getParams, setParams] = useVariable<IIEParam[]>([]);

    const [exportMode, setExportMode] = useState(false);
    const [title, setTitle] = useState(mainTitle);
    const [menuAnchor, setMenuAnchor] = useState<Element>(null);
    
    const back = useConstFunc(() => {
        dispatch(route(Page.lists));
    });

    useHandleKey({
        key: "Escape"
    }, () => back);

    const addFile = useConstFunc((mod: string, dlc: string, dom: CheerioAPI, path: string, fileType: FileType) => {
        const obj = { dom, path, mod, dlc, fileType };
        if (!files.includes(obj))
            files.push({ dom, path, mod, dlc, fileType });
    });

    const addParam = useConstFunc((param: IIEParam) => {
        const params = getParams();
        if (!params.includes(param))
            setParams([...params, param]);
    });

    const removeParam = useConstFunc((id: string) => {
        setParams(getParams().filter(item => item.id !== id));
    });

    const importFile = useConstFunc((path?: string) => {
        const currentFileName = basename(filePath);
        let pathToImport = path;

        if (typeof pathToImport !== "string")
            pathToImport = getEPF();

        if (!pathToImport) {
            message.error(PARAMS_FILE_NOT_FOUND);
            return;
        }
        const data: IExportData | IExportData[] = JSON.parse(readFileSync(pathToImport));

        const params = getParams();
        const importData = (item: IExportData) => {
            for (const fileName in item.data) {
                for (const selector in item.data[fileName]) {
                    for (const attribute in item.data[fileName][selector]) {
                        for (const obj of params) {
                            const { forImport } = obj;
                            if (forImport.selector === selector && forImport.name === attribute && forImport.fileName === fileName)
                                forImport.setValue(String(item.data[fileName][selector][attribute]));
                        }
                    }
                }
            }

            for (const actionID in item.actionsData) {
                for (const action of actions) {
                    if (action.id === actionID) {
                        const object = action.object as unknown as IImportable<any>;
                        object.import(item.actionsData[actionID]);
                    }
                }
            }

            message.success(WAS_IMPORTED);
            return true;
        };

        if (data instanceof Array) {
            let imported = false;

            for (const item of data) {
                if (item.fileName === currentFileName) {
                    if (importData(item))
                        imported = true;
                }
            }

            if (!imported)
                message.error(BREAK_IMPORT_INVALID_NAME.replace("%file", currentFileName));
        }
        else if (currentFileName !== data.fileName) {
            message.error(BREAK_IMPORT_INVALID_NAME.replace("%file", currentFileName));
        }
        else {
            importData(data);
        }
    });

    const registerReset = useConstFunc((id: string, func: ()=>void) => {
        resetList[id] = func;
    });

    const unregisterReset = useConstFunc((id: string) => {
        delete resetList[id];
    });

    const onDropFile = useConstFunc((files: FileList) => {
        importFile(files[0].path);
    });

    const save = useConstFunc(async (isUpdateFiles = true) => {
        setTitle(SAVING_MESSAGE);
        await new Promise<void>(resolve => {
            setTimeout(() => {
                for (const file of files) {
                    const dom = load(file.dom.html(), { xmlMode: true });

                    dom("[SXMLE_ID]").map((_, el) => dom(el).removeAttr("SXMLE_ID"));
                    writeFileSync(file.path, dom.html());
                }

                if (isUpdateFiles) {
                    if (currentMod)
                        updateFiles(currentMod);

                    updateFiles();
                    message.success(SUCCESS_SAVE_FILES);
                }
                setTitle(mainTitle);
                resolve();
            }, 100);
        });
    });

    const reset = useConstFunc(() => {
        // showConfirm({
        //     text: RESET_CONFIRM_MESSAGE,
        //     onSuccess: () => {
        //         for (const itemID in resetList)
        //             resetList[itemID]();

        //         setMenuAnchor(null);
        //         message.success(SUCCESS_RESET);
        //     }
        // });
    });

    const exportFile = useCallback(() => {
        if (!exportMode) {
            setExportMode(true);
            return;
        }

        const pathToSave = saveEPF(basename(filePath, ".xml"));
        if (!pathToSave) {
            message.error(PATH_TO_SAVE_NOT_FOUND);
            return;
        }

        const out = {
            fileName: basename(filePath),
            data: {},
            actionsData: {},
            version: EXPORT_FILE_VERSION
        };

        const params = getParams();
        for (const param of params) {
            const expObj = param.forExport();
            if (!expObj)
                continue;

            const { fileName, name, selector, value } = expObj;

            if (!out.data[fileName])
                out.data[fileName] = {};

            if (!out.data[fileName][selector])
                out.data[fileName][selector] = {};

            out.data[fileName][selector][name] = value;
        }

        for (const action of actions) {
            const object = action.object as IExportable<any>;
            const exported = object.export();
            if (exported)
                out.actionsData[action.id] = exported;
        }

        writeFileSync(pathToSave, JSON.stringify(out, null, "\t"));
        message.success(WAS_EXPORTED);
        setExportMode(false);
        setMenuAnchor(null);
    }, [actions, exportMode, filePath, getParams]);

    const resetEnabled = !currentMod;
    
    const mainContext: IMainContext = useConst(() => ({
        addToSave: addFile,
        fileDOM,
        filePath,
        addParam,
        removeParam,
        currentDLC,
        currentMod,
        templates,
        globalTemplates,
        tableItems,
        defaults
    }));

    if (hasError) {
        return <>
            <Menu />

            <ErrorHeader
                title={title}
                back={back}
                files={files}
            />
            <Container style={styles.errorCont}>
                <Typography>
                    {PROC_FILE_ERROR}
                </Typography>
            </Container>
        </>;
    }

    return <>
        <Menu />
        <DropArea onDrop={onDropFile} />
        <Popup />

        <MainHeader
            filePath={filePath}
            currentMod={currentMod}
            setAnchor={setMenuAnchor}
            title={title}
            back={back}
            save={save}
            menuAnchor={menuAnchor}
            reset={reset}
            importFile={importFile}
            exportFile={exportFile}
            enableReset={resetEnabled}
            actions={actions}
            files={files}
        />
        <MainContext.Provider value={mainContext}>
            <Container id="table" style={styles.params}>
                <Parameters
                    exportMode={exportMode}
                    registerReset={registerReset}
                    unregisterReset={unregisterReset}
                />
            </Container>
        </MainContext.Provider>
    </>;

    function getMainTitle() {
        if (fileDOM("GameData UiDesc").length === 1) {
            const text = fileDOM("GameData UiDesc").attr("UiName");
            return getGameText(text, currentMod) || text;
        }

        if (filePath.split("/").length !== 1) {
            const a = filePath.split("/");
            return prettify(a[a.length - 1].replace(".xml", "")).toUpperCase();
        }

        const a = filePath.split("\\");
        return prettify(a[a.length - 1].replace(".xml", "")).toUpperCase();
    }
});
