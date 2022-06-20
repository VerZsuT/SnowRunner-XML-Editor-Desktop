import type { MouseEvent } from "react";
import { memo, useCallback, useState } from "react";

import {
    ArrowBack as ArrowBackIcon,
    FileOpenOutlined as FileOpenIcon,
    FormatListBulletedOutlined as FilesListIcon,
    Menu as MenuIcon,
    SaveRounded as SaveIcon
} from "@mui/icons-material";
import { Menu, Tooltip, Typography } from "@mui/material";
import type { CheerioAPI } from "cheerio";
import globalTexts from "globalTexts/renderer";
import { IconMenuItem, NestedMenuItem} from "mui-nested-menu";
import getPreload from "scripts/getPreload";
import main from "scripts/main";
import type IEditorPreload from "types/IEditorPreload";

import BackArrowButton from "../styled/BackArrowButton";
import Header from "../styled/Header";
import SaveButton from "../styled/SaveButton";
import TasksButton from "../styled/TasksButton";
import texts from "../texts";

const { watchFile } = getPreload<IEditorPreload>("editorPreload");
const { basename } = window.service;
const { openPath } = main;
const { SAVE_BUTTON, OPEN_BUTTON } = globalTexts;
const { BACK_BUTTON } = texts;

interface IProps {
    title: string;
    back(): void;
    files: {
        dom: CheerioAPI;
        path: string;
        mod: string;
        dlc: string;
    }[];
}

const iconStyle = {
    fontSize: "30px"
};

export default memo((props: IProps) => {
    const { title, back, files } = props;

    const [menuAnchor, setMenuAnchor] = useState(null);

    const openTasksMenu = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        setMenuAnchor(e.currentTarget);
    }, []);
    const closeTasksMenu = useCallback(() => {
        setMenuAnchor(null);
    }, []);

    return (
        <Header>
            <Typography variant="h5">
                {title}
            </Typography>
            <Tooltip title={BACK_BUTTON}>
                <BackArrowButton onClick={back} color="inherit">
                    <ArrowBackIcon style={iconStyle} />
                </BackArrowButton>
            </Tooltip>
            <Tooltip title={SAVE_BUTTON}>
                <SaveButton color="inherit" disabled>
                    <SaveIcon style={iconStyle} />
                </SaveButton>
            </Tooltip>
            <TasksButton onClick={openTasksMenu} color="inherit">
                <MenuIcon style={iconStyle} />
            </TasksButton>
            <Menu
                anchorEl={menuAnchor}
                open={!!menuAnchor}
                onClose={closeTasksMenu}
            >
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
                                watchFile(file.path, () => {
                                    window.location.reload();
                                });
                            }}
                            leftIcon={<FileOpenIcon />}
                            label={basename(file.path)}
                        />
                    ))}
                </NestedMenuItem>
            </Menu>
        </Header>
    );
});
