import { MouseEvent, PureComponent } from 'react'
import { mainProcess } from './mainProcess'
import { t } from 'scripts'
import { BuildType } from './enums'

import {
    Button,
    Menu,
    MenuItem,
    Divider,
    Grid,
    styled
} from '@mui/material'

const {
    quit, openLink, openPath,
    resetConfig, recoverFromBackup, copyBackup,
    joinEPF, seeEPF, runUninstall, importConfig,
    exportConfig, toggleDevTools, openSettings,
    openWhatsNew
} = mainProcess
const { config, paths } = window.provider

const MenuGrid = styled(Grid)({
    position: 'fixed',
    top: 0,
    zIndex: 20,
    backgroundColor: '#f9f9f9'
})

export class ProgramMenu extends PureComponent {
    render() {
        const isDevBuild = config.buildType === BuildType.dev
        const hasInitial = Boolean(config.initial)

        return (
            <MenuGrid
                justifyContent='flex-start'
                container
            >
                <MenuButton
                    text={t.FILE_MENU_LABEL}
                    items={[
                        {
                            text: t.JOIN_EXPORTED_FILES,
                            show: isDevBuild,
                            onClick: joinEPF
                        },
                        {
                            text: t.SEE_EXPORTED_FILES,
                            show: isDevBuild,
                            onClick: seeEPF
                        },
                        {
                            isDivider: true,
                            show: isDevBuild
                        },
                        {
                            text: 'DevTools',
                            show: isDevBuild,
                            onClick: toggleDevTools
                        },
                        {
                            text: t.EXIT_MENU_ITEM_LABEL,
                            onClick: quit
                        }
                    ]}
                />
                <MenuButton
                    text={t.BACKUP_MENU_LABEL}
                    show={hasInitial}
                    items={[
                        {
                            text: t.OPEN_BUTTON,
                            onClick: () => openPath(paths.backupFolder)
                        },
                        { isDivider: true },
                        {
                            text: t.SAVE_BUTTON,
                            onClick: copyBackup
                        },
                        {
                            text: t.RESTORE_MENU_ITEM_LABEL,
                            onClick: recoverFromBackup
                        }
                    ]}
                />
                <MenuButton
                    text={t.SETTINGS_MENU_LABEL}
                    items={[
                        {
                            text: t.SETTINGS_MENU_LABEL,
                            show: hasInitial,
                            onClick: openSettings
                        },
                        {
                            isDivider: true,
                            show: hasInitial
                        },
                        {
                            text: t.IMPORT_MENU_ITEM_LABEL,
                            onClick: importConfig
                        },
                        {
                            text: t.EXPORT_MENU_ITEM_LABEL,
                            show: hasInitial,
                            onClick: exportConfig
                        },
                        {
                            text: t.RESET_MENU_ITEM_LABEL,
                            show: hasInitial,
                            onClick: resetConfig
                        },
                        { isDivider: true },
                        {
                            text: t.UNINSTALL_MENU_ITEM_LABEL,
                            onClick: runUninstall
                        }
                    ]}
                />
                <MenuButton
                    text={t.HELP_MENU_LABEL}
                    items={[
                        {
                            text: t.VERSION_MENU_ITEM_LABEL,
                            onClick: openWhatsNew
                        },
                        {
                            text: t.HOW_TO_USE_TITLE,
                            onClick: () => openLink('https://snowrunner.mod.io/guides/snowrunner-xml-editor')
                        },
                        {
                            text: 'GitHub',
                            onClick: () => openLink('https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop')
                        },
                        {
                            text: 'YouTube(RU)',
                            onClick: () => openLink('https://youtube.com/playlist?list=PLDwd4yUwzS2VtWCpC9X6MXm47Kv_s_mq2')
                        }
                    ]}
                />
            </MenuGrid>
        )
    }
}

interface IMenuButtonProps {
    text: string
    items: {
        text?: string
        onClick?(): void
        isDivider?: boolean
        show?: boolean
    }[]
    show?: boolean
}

interface IMenuButtonState {
    anchorEl: HTMLElement
}

class MenuButton extends PureComponent<IMenuButtonProps, IMenuButtonState> {
    private buttonID = `menu-button${Math.random()}`
    private containerID = `menu-container${Math.random()}`
    private show: boolean

    constructor(props: IMenuButtonProps) {
        super(props)
        this.state = {
            anchorEl: null
        }
        this.show = props.show?? true
    }

    render() {
        if (!this.show) return null
        const isOpen = Boolean(this.state.anchorEl)

        return (<>
            <Button
                className='not-upper font-black'
                id={this.buttonID}
                aria-controls={isOpen ? this.containerID : undefined}
                aria-haspopup={true}
                aria-expanded={isOpen ? 'true' : undefined}
                onClick={this.onClick}
                size='small'
            >
                {this.props.text}
            </Button>
            <Menu
                id={this.containerID}
                anchorEl={this.state.anchorEl}
                open={isOpen}
                onClose={this.onClose}
                MenuListProps={{
                    'aria-labelledby': this.buttonID,
                    dense: true
                }}
            >
                {this.props.items.map((item, key) => {
                    const {
                        show=true,
                        isDivider=false,
                        onClick,
                        text
                    } = item
                    if (!show) return null
                    if (isDivider) {
                        return <Divider key={key} />
                    } else {
                        return (
                            <MenuItem
                                key={key}
                                onClick={() => {
                                    onClick()
                                    this.onClose()
                                }}
                                style={{
                                    fontSize: '0.9rem',
                                    color: 'black'
                                }}
                            >
                                {text}
                            </MenuItem>
                        )
                    }
                })}
            </Menu>
        </>)
    }

    private onClick = (e: MouseEvent<HTMLElement>) => {
        this.setState({
            anchorEl: e.currentTarget
        })
    }

    private onClose = () => {
        this.setState({
            anchorEl: null
        })
    }
}
