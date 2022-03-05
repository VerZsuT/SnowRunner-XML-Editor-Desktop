import { PureComponent } from 'react'
import type { CheerioAPI } from 'cheerio'
import main from 'scripts/main'
import localize from 'scripts/localize'

import { Menu, Tooltip, Typography } from '@mui/material'
import {
    ArrowBack as ArrowBackIcon,
    Menu as MenuIcon,
    SaveRounded as SaveIcon,
    FileOpenOutlined as FileOpenIcon,
    FormatListBulletedOutlined as FilesListIcon
} from '@mui/icons-material'
import { NestedMenuItem, IconMenuItem } from 'mui-nested-menu'
import Header from '../styled/Header'
import BackArrowButton from '../styled/BackArrowButton'
import SaveButton from '../styled/SaveButton'
import TasksButton from '../styled/TasksButton'

const { watchFile } = window.editorPreload
const { basename } = window.service
const { openPath } = main

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

export default class ErrorHeader extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            menuAnchor: null
        }
    }

    render() {
        return (
            <Header>
                <Typography variant='h5'>
                    {this.props.title}
                </Typography>
                <Tooltip title={localize.BACK_BUTTON}>
                    <BackArrowButton onClick={this.props.back} color='inherit'>
                        <ArrowBackIcon style={{ fontSize: '30px' }} />
                    </BackArrowButton>
                </Tooltip>
                <Tooltip title={localize.SAVE_BUTTON}>
                    <SaveButton color='inherit' disabled>
                        <SaveIcon style={{ fontSize: '30px' }} />
                    </SaveButton>
                </Tooltip>
                <TasksButton onClick={e => this.openTasksMenu(e.currentTarget)} color='inherit'>
                    <MenuIcon style={{ fontSize: '30px' }} />
                </TasksButton>
                <Menu
                    anchorEl={this.state.menuAnchor}
                    open={!!this.state.menuAnchor}
                    onClose={this.closeTasksMenu}
                >
                    <NestedMenuItem
                        label={localize.OPEN_BUTTON}
                        parentMenuOpen={!!this.state.menuAnchor}
                        leftIcon={<FilesListIcon />}
                    >
                        {this.props.files.map(file =>
                            <IconMenuItem
                                key={file.path}
                                onClick={() => {
                                    openPath(file.path)
                                    watchFile(file.path, () => {
                                        window.location.reload()
                                    })
                                }}
                                leftIcon={<FileOpenIcon />}
                                label={basename(file.path)}
                            />
                        )}
                    </NestedMenuItem>
                </Menu>
            </Header>
        )
    }

    private openTasksMenu = (element: Element) => {
        this.setState({ menuAnchor: element })
    }

    private closeTasksMenu = () => {
        this.setState({ menuAnchor: null })
    }
}
