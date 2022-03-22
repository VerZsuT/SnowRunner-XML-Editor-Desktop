import { PureComponent } from 'react'
import { render } from 'react-dom'
import type IConfigSettings from 'main/types/IConfigSettings'
import Lang from 'main/enums/Lang'
import { MAIN } from 'scripts/funcs'
import main from 'scripts/main'
import localize from 'scripts/localize'
import config from 'scripts/config'

import GameFolder from 'modules/components/GameFolder'
import ErrorHandler from 'modules/components/ErrorHandler'

import { Button, Checkbox, List, ListItemText, MenuItem, Select } from '@mui/material'
import Container from 'modules/components/styled/Container'
import Label from './styled/Label'
import ListItem from './styled/ListItem'
import ListItemButton from './styled/ListItemButton'
import ListItemIcon from './styled/ListItemIcon'
import 'styles/settings'
import memoizee from 'memoizee'

const { saveBackup, reload } = main

interface IState extends IConfigSettings {
    updates: boolean
    DLC: boolean
    mods: boolean
    advancedMode: boolean
    lang: Lang
    saveBackup: boolean
    pathToInitial: string
}

class Settings extends PureComponent<any, IState> {
    private langOptions: JSX.Element[]

    constructor(props: any) {
        super(props)
        this.state = {
            ...config.settings,
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
            <ErrorHandler/>
            <Container>
                <Label id='language-label'>
                    {localize.LANGUAGE_MENU_ITEM_LABEL}
                </Label>
                <Select
                    labelId='language-label'
                    value={this.state.lang}
                    onChange={this.onChangeSetting('lang', true)}
                    variant='standard'
                >
                    {this.langOptions}
                </Select>
            </Container>
            <GameFolder onChange={this.onChangePath} preload={window.settingsPreload} />
            <Container>
                <List>
                    <this.CheckboxItem name='updates' text={localize.UPDATES_LABEL}/>
                    <this.CheckboxItem name='DLC' text={localize.DLC_LABEL}/>
                    <this.CheckboxItem name='mods' text={localize.MODS_LABEL}/>
                    <this.CheckboxItem name='advancedMode' text={localize.ADVANCED_MODE_LABEL}/>
                </List>
            </Container>
            <Button
                className='not-upper'
                onClick={this.save}
                variant='contained'
            >
                {localize.SAVE_BUTTON}
            </Button>
        </>)
    }

    private onChangeSetting = memoizee((name: keyof IState, withValue?: boolean) => {
        if (withValue) {
            return (event: any) => {
                this.setState({
                    [name]: event.target.value
                } as unknown as IState)    
            }
        }
        else {
            return () => {
                this.setState({
                    [name]: !this.state[name]
                } as unknown as IState)    
            }
        }
    })
    
    private CheckboxItem = (props: {name: keyof IState, text: string}) => {
        return (
            <ListItem>
                <ListItemButton onClick={this.onChangeSetting(props.name)}>
                    <ListItemIcon>
                        <Checkbox
                            edge='start'
                            checked={!!this.state[props.name]}
                            tabIndex={-1}
                            disableRipple
                        />
                    </ListItemIcon>
                    <ListItemText primary={props.text}/>
                </ListItemButton>
            </ListItem>
        )
    }

    private onChangePath = (newPath: string) => {
        this.setState({
            pathToInitial: newPath,
            saveBackup: true
        })
    }

    private save = () => {
        const { pathToInitial, lang, updates, DLC, mods, advancedMode, saveBackup: sb } = this.state

        if (sb)
            config.initial = pathToInitial

        config.lang = lang
        config.settings = {
            ...config.settings,
            updates,
            DLC,
            mods,
            advancedMode
        }

        if (sb)
            saveBackup(true)
        else
            reload()
    }
}

render(<Settings/>, MAIN)
