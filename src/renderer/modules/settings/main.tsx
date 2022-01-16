import { PureComponent } from 'react'
import { render } from 'react-dom'
import { t, mainProcess, Lang, MAIN } from 'scripts'
import 'styles/settings/main'
import { GameFolder } from 'modules/components/GameFolder'

import {
    Button,
    Checkbox,
    InputLabel,
    List,
    ListItem as MuiListItem,
    ListItemButton as MuiListItemButton,
    ListItemIcon as MuiListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    styled
} from '@mui/material'
import { ErrorHandler } from 'modules/components/ErrorHandler'
import { Container } from 'modules/components/styled'

const { config } = window.provider
const { saveBackup, reload } = mainProcess

const ListItem = styled(MuiListItem)({
    paddingTop: 0,
    paddingBottom: 0
})

const ListItemButton = styled(MuiListItemButton)({
    paddingTop: 0,
    paddingBottom: 0
})

const ListItemIcon = styled(MuiListItemIcon)({
    minWidth: '40px'
})

const Label = styled(InputLabel)({
    color: 'black',
    display: 'inline-block',
    position: 'relative',
    top: '8px',
    marginRight: '15px'
})

interface IState {
    updates: boolean
    DLC: boolean
    mods: boolean
    lang: Lang
    saveBackup: boolean
    pathToInitial: string
}

class Settings extends PureComponent<any, IState> {
    private langOptions: JSX.Element[]

    constructor(props: any) {
        super(props)

        this.state = {
            updates: config.settings.updates,
            DLC: config.settings.DLC,
            mods: config.settings.mods,
            lang: config.lang,
            saveBackup: false,
            pathToInitial: ''
        }
        this.langOptions = Object.keys(Lang).map(lang =>
            <MenuItem key={lang} value={lang}>
                {lang}
            </MenuItem>
        )
    }

    render() {
        return (<>
            <ErrorHandler preload={window.settingsPreload} />
            <Container>
                <Label id='language-label'>
                    {t.LANGUAGE_MENU_ITEM_LABEL}
                </Label>
                <Select
                    labelId='language-label'
                    value={this.state.lang}
                    onChange={e => this.onChangeSetting('lang', e.target.value)}
                    variant='standard'
                >
                    {this.langOptions}
                </Select>
            </Container>
            <GameFolder onChange={this.onChangePath} preload={window.settingsPreload} />
            <Container>
                <List>
                    <ListItem>
                        <ListItemButton onClick={() => this.onChangeSetting('updates')}>
                            <ListItemIcon>
                                <Checkbox
                                    edge='start'
                                    checked={this.state.updates}
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary={t.UPDATES_LABEL} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={() => this.onChangeSetting('DLC')}>
                            <ListItemIcon>
                                <Checkbox
                                    edge='start'
                                    checked={this.state.DLC}
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary={t.DLC_LABEL} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={() => this.onChangeSetting('mods')}>
                            <ListItemIcon>
                                <Checkbox
                                    edge='start'
                                    checked={this.state.mods}
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary={t.MODS_LABEL} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Container>
            <Button
                className='not-upper'
                onClick={this.save}
                variant='contained'
            >
                {t.SAVE_BUTTON}
            </Button>
        </>)
    }

    private onChangeSetting = (name: string, value?: string | boolean) => {
        this.setState({
            [name]: value ?? !this.state[name]
        } as unknown as IState)
    }

    private onChangePath = (newPath: string) => {
        this.setState({
            pathToInitial: newPath,
            saveBackup: true
        })
    }

    private save = () => {
        if (this.state.saveBackup) {
            config.initial = this.state.pathToInitial
        }
        config.lang = this.state.lang
        config.settings = {
            ...config.settings,
            updates: this.state.updates,
            DLC: this.state.DLC,
            mods: this.state.mods
        }

        if (this.state.saveBackup) {
            saveBackup(true)
        } else {
            reload()
        }
    }
}

render(<Settings />, MAIN)
