import { PureComponent } from "react";
import type { MouseEvent } from "react";
import type { CheerioAPI } from "cheerio";
import main from "scripts/main";
import localize from "scripts/localize";
import { callback } from "scripts/helpers";

import { Menu, Tooltip, Typography } from "@mui/material";
import {
    ArrowBack as ArrowBackIcon,
    Menu as MenuIcon,
    SaveRounded as SaveIcon,
    FileOpenOutlined as FileOpenIcon,
    FormatListBulletedOutlined as FilesListIcon
} from "@mui/icons-material";
import { NestedMenuItem, IconMenuItem } from "mui-nested-menu";
import Header from "../styled/Header";
import BackArrowButton from "../styled/BackArrowButton";
import SaveButton from "../styled/SaveButton";
import TasksButton from "../styled/TasksButton";

const { watchFile } = window.editorPreload;
const { basename } = window.service;
const { openPath } = main;

interface IProps {
    title: string
    back(): void
    files: {
        dom: CheerioAPI
        path: string
        mod: string
        dlc: string
    }[]
}

interface IState {
    menuAnchor: Element
}

class ErrorHeader extends PureComponent<IProps, IState> {
    private iconStyle = { fontSize: "30px" };

    constructor(props: IProps) {
        super(props);
        this.state = { menuAnchor: null };
    }

    public render() {
        const { title, back, files } = this.props;
        const { menuAnchor } = this.state;

        return (
            <Header>
                <Typography variant="h5">
                    {title}
                </Typography>
                <Tooltip title={localize.BACK_BUTTON}>
                    <BackArrowButton onClick={back} color="inherit">
                        <ArrowBackIcon style={this.iconStyle}/>
                    </BackArrowButton>
                </Tooltip>
                <Tooltip title={localize.SAVE_BUTTON}>
                    <SaveButton color="inherit" disabled>
                        <SaveIcon style={this.iconStyle}/>
                    </SaveButton>
                </Tooltip>
                <TasksButton onClick={this.openTasksMenu} color="inherit">
                    <MenuIcon style={this.iconStyle}/>
                </TasksButton>
                <Menu
                    anchorEl={menuAnchor}
                    open={!!menuAnchor}
                    onClose={this.closeTasksMenu}
                >
                    <NestedMenuItem
                        label={localize.OPEN_BUTTON}
                        parentMenuOpen={!!menuAnchor}
                        leftIcon={<FilesListIcon />}
                    >
                        {files.map(file =>
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
                        )}
                    </NestedMenuItem>
                </Menu>
            </Header>
        );
    }

    @callback
    private openTasksMenu(e: MouseEvent<HTMLButtonElement>) {
        this.setState({ menuAnchor: e.currentTarget });
    }

    @callback
    private closeTasksMenu() {
        this.setState({ menuAnchor: null });
    }
}

export default ErrorHeader;
