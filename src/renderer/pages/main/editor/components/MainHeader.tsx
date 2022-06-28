import type { MouseEvent } from "react";
import { memo, useCallback } from "react";

import {
    ArrowBack as ArrowBackIcon,
    ArrowForwardIos,
    FileDownloadOutlined as ImportIcon,
    FileUploadOutlined as ExportIcon,
    FormatListBulletedOutlined as FilesListIcon,
    Menu as MenuIcon,
    MoreHoriz as MoreHorizIcon,
    RotateLeftOutlined as ResetIcon,
    SaveRounded as SaveIcon
} from "@mui/icons-material";
import { Menu, Tooltip, Typography } from "@mui/material";
import type { CheerioAPI } from "cheerio";
import type FileType from "enums/FileType";
import globalTexts from "globalTexts/renderer";
import { IconMenuItem, NestedMenuItem } from "mui-nested-menu";
import config from "scripts/config";
import getPreload from "scripts/getPreload";
import main from "scripts/main";
import type IEditorAction from "types/IEditorAction";
import type IEditorPreload from "types/IEditorPreload";

import BackArrowButton from "../styled/BackArrowButton";
import Header from "../styled/Header";
import SaveButton from "../styled/SaveButton";
import TasksButton from "../styled/TasksButton";
import texts from "../texts";

const { watchFile } = getPreload<IEditorPreload>("editorPreload");
const { basename } = window.service;
const { openPath } = main;
const {
    SAVE_BUTTON,
    OPEN_BUTTON,
    EXPORT,
    RESET_MENU_ITEM_LABEL
} = globalTexts;
const {
    IMPORT,
    ACTIONS_MENU,
    BACK_BUTTON
} = texts;

interface IProps {
    title: string;
    filePath: string;
    currentMod: string;
    back(): void;
    save(): void;
    reset(): void;
    setAnchor(anchor: Element): void;
    importFile(): void;
    exportFile(): void;
    enableReset: boolean;
    menuAnchor: Element;
    actions: IEditorAction[];
    files: {
        dom: CheerioAPI;
        path: string;
        mod: string;
        dlc: string;
        fileType: FileType;
    }[];
}

const iconStyle = { fontSize: "30px" };

export default memo((props: IProps) => {
    const {
        title, back, menuAnchor, files, actions,
        reset, enableReset, exportFile, importFile,
        filePath, currentMod, save, setAnchor
    } = props;

    const saveC = useCallback(() => {
        save();
    }, [save]);
    const openTasksMenu = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        setAnchor(e.currentTarget);
    }, [setAnchor]);
    const closeTasksMenu = useCallback(() => {
        setAnchor(null);
    }, [setAnchor]);

    return (
        <Header>
            <Typography variant="h5">
                {title}
            </Typography>
            <Tooltip title={BACK_BUTTON}>
                <BackArrowButton onClick={back} color="inherit">
                    <ArrowBackIcon style={iconStyle}/>
                </BackArrowButton>
            </Tooltip>
            <Tooltip title={SAVE_BUTTON}>
                <SaveButton onClick={saveC} color="inherit">
                    <SaveIcon style={iconStyle}/>
                </SaveButton>
            </Tooltip>
            <TasksButton onClick={openTasksMenu} color="inherit">
                <MenuIcon style={iconStyle}/>
            </TasksButton>
            <Menu
                anchorEl={menuAnchor}
                open={!!menuAnchor}
                onClose={closeTasksMenu}
            >
                {config.settings.advancedMode
                    ? (
                        <NestedMenuItem
                            label={OPEN_BUTTON}
                            parentMenuOpen={!!menuAnchor}
                            leftIcon={<FilesListIcon />}
                        >
                            {files.map(file => (
                                <IconMenuItem
                                    key={file.path}
                                    onClick={() => {
                                        openPath(file.path);
                                        watchFile(file.path, () => window.location.reload());
                                    }}
                                    leftIcon={<img src={require(`images/icons/editor/${file.fileType}.png`)}/>}
                                    label={basename(file.path)}
                                />
                            ))}
                        </NestedMenuItem>
                    )
                    : null}
                <NestedMenuItem
                    label={ACTIONS_MENU}
                    parentMenuOpen={!!menuAnchor}
                    leftIcon={<MoreHorizIcon />}
                >
                    {actions.map(action => (
                        <IconMenuItem
                            key={`action-${action.id}`}
                            onClick={() => {
                                action.object.run({filePath, currentMod});
                                closeTasksMenu();
                            }}
                            label={action.name}
                            leftIcon={action.imgSRC
                                ? <img src={action.imgSRC}/>
                                : <ArrowForwardIos />
                            }
                        />
                    ))}
                </NestedMenuItem>
                <IconMenuItem
                    onClick={enableReset ? reset : () => null}
                    leftIcon={<ResetIcon />}
                    label={RESET_MENU_ITEM_LABEL}
                />
                <IconMenuItem
                    onClick={exportFile}
                    leftIcon={<ExportIcon />}
                    label={EXPORT}
                />
                <IconMenuItem
                    onClick={importFile}
                    leftIcon={<ImportIcon />}
                    label={IMPORT}
                />
            </Menu>
        </Header>
    );
});
