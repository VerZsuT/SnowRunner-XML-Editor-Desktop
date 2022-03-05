import { PureComponent } from 'react'
import type { CheerioAPI } from 'cheerio'
import type IEditorAction from '../types/IEditorAction'
import type FileType from 'templates/enums/FileType'
import type Editor from '../main'
import localize from 'scripts/localize'
import config from 'scripts/config'
import main from 'scripts/main'

import { Menu, Tooltip, Typography } from '@mui/material'
import {
    ArrowBack as ArrowBackIcon,
    Menu as MenuIcon,
    SaveRounded as SaveIcon,
    FormatListBulletedOutlined as FilesListIcon,
    RotateLeftOutlined as ResetIcon,
    FileUploadOutlined as ExportIcon,
    FileDownloadOutlined as ImportIcon,
    MoreHoriz as MoreHorizIcon,
    ArrowForwardIos
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
    editor: Editor
    title: string
    back(): void
    save(): void
    reset(): void
    importFile(): void
    exportFile(): void
    enableReset: boolean
    menuAnchor: Element
    actions: IEditorAction[]
    files: {
        dom: CheerioAPI
        path: string
        mod: string
        dlc: string
        fileType: FileType
    }[]
}

export default class MainHeader extends PureComponent<IProps> {
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
                    <SaveButton onClick={() => this.props.save()} color='inherit'>
                        <SaveIcon style={{ fontSize: '30px' }} />
                    </SaveButton>
                </Tooltip>
                <TasksButton onClick={e => this.openTasksMenu(e.currentTarget)} color='inherit'>
                    <MenuIcon style={{ fontSize: '30px' }} />
                </TasksButton>
                <Menu
                    anchorEl={this.props.menuAnchor}
                    open={!!this.props.menuAnchor}
                    onClose={this.closeTasksMenu}
                >
                {config.settings.advancedMode?
                    <NestedMenuItem
                        label={localize.OPEN_BUTTON}
                        parentMenuOpen={!!this.props.menuAnchor}
                        leftIcon={<FilesListIcon/>}
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
                                leftIcon={
                                    <img src={require(`images/icons/editor/${file.fileType}.png`)}/>
                                }
                                label={basename(file.path)}
                            />
                        )}
                    </NestedMenuItem>
                :null}
                    <NestedMenuItem
                        label={localize.ACTIONS_MENU}
                        parentMenuOpen={!!this.props.menuAnchor}
                        leftIcon={<MoreHorizIcon />}
                    >
                        {this.props.actions.map(action =>
                            <IconMenuItem
                                key={`action-${action.id}`}
                                onClick={() => {
                                    action.object.run(this.props.editor)
                                    this.closeTasksMenu()
                                }}
                                label={action.name}
                                leftIcon={action.imgSRC
                                    ? <img src={action.imgSRC}/>
                                    : <ArrowForwardIos />
                                }
                            />
                        )}
                    </NestedMenuItem>
                    <IconMenuItem
                        disabled={!this.props.enableReset}
                        onClick={this.props.reset}
                        leftIcon={<ResetIcon />}
                        label={localize.RESET_MENU_ITEM_LABEL}
                    />
                    <IconMenuItem
                        onClick={this.props.exportFile}
                        leftIcon={<ExportIcon />}
                        label={localize.EXPORT}
                    />
                    <IconMenuItem
                        onClick={() => this.props.importFile()}
                        leftIcon={<ImportIcon />}
                        label={localize.IMPORT}
                    />
                </Menu>
            </Header>
        )
    }

    private openTasksMenu = (element: Element) => {
        this.props.editor.setState({ menuAnchor: element })
    }

    private closeTasksMenu = () => {
        this.props.editor.setState({ menuAnchor: null })
    }
}