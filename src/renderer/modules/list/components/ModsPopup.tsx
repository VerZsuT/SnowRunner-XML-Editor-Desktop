import { PureComponent } from 'react'
import { t } from 'scripts'

import {
    Button,
    Checkbox,
    CircularProgress,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material'
import { Popup } from 'modules/components/Popup'
import { Container } from 'modules/components/styled'

const { findMods, basename, getModPak } = window.listPreload
const { config } = window.provider

interface IProps {
    hidePopup(reload?: boolean): void
    show: boolean
}

interface IState {
    items: {
        name: string
        path: string
    }[]
    selected: ConfigModsItems
}

export class ModsPopup extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            items: null,
            selected: { ...config.mods.items }
        }
    }

    componentDidUpdate(): void {
        setTimeout(() => {
            if (this.state.items === null) {
                findMods().then(items => {
                    this.setState({ items })
                })
            }
        }, 500)
    }

    render() {
        let items = []
        if (this.state.items !== null) {
            items = this.state.items.map(value => {
                const isExists = Boolean(this.state.selected[basename(value.path, '.pak')])
                const onClick = isExists ? () => this.remove(value) : () => this.select(value)

                return (
                    <ListItem disablePadding key={value.name}>
                        <ListItemButton onClick={onClick}>
                            <ListItemIcon>
                                <Checkbox
                                    edge='start'
                                    checked={isExists}
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary={value.name} />
                        </ListItemButton>
                    </ListItem>
                )
            })
        }

        return (
            <Popup
                show={this.props.show}
                onClose={() => this.hidePopup()}
                title={this.state.items ? t.MODS_POPUP_TITLE : t.LOADING}
            >
                {!this.state.items ?
                    <CircularProgress />
                    : null}

                <List style={{ maxHeight: '250px', overflow: 'auto' }}>
                    {items.length
                        ? items
                        : this.state.items !== null
                            ? <ListItemText primary={t.EMPTY_MODS_TITLE} />
                            : []
                    }
                </List>
                {this.state.items? <>
                    <Container>
                        <Button
                            className='not-upper'
                            variant='contained'
                            onClick={this.addManual}
                            style={{
                                marginTop: '10px',
                                marginBottom: '10px'
                            }}
                        >
                            {t.MANUAL_MOD}
                        </Button>
                    </Container>
                    <Container>
                        <Button
                            className='not-upper'
                            variant='contained'
                            color='success'
                            onClick={this.applyChanges}
                        >
                            {t.APPLY}
                        </Button>
                    </Container>
                </> : null}
            </Popup>
        )
    }

    private select(value: ConfigModsItems[string]) {
        this.setState({
            selected: {
                ...this.state.selected,
                [basename(value.path, '.pak')]: {
                    name: basename(value.path),
                    path: value.path
                }
            }
        })
    }

    private remove(value: ConfigModsItems[string]) {
        const copy = { ...this.state.selected }
        if (copy[basename(value.path, '.pak')]) {
            delete copy[basename(value.path, '.pak')]
        } else {
            delete copy[value.name]
        }

        this.setState({
            selected: copy
        })
    }

    private hidePopup = () => {
        this.setState({
            selected: { ...config.mods.items }
        })
        this.props.hidePopup()
    }

    private applyChanges = () => {
        let length = 0
        for (const _ in this.state.selected) {
            length++
        }
        config.mods = {
            length,
            items: this.state.selected
        }
        this.props.hidePopup(true)
    }

    private addManual = () => {
        const result = getModPak()
        if (!result) return

        for (const stateItem of this.state.items) {
            const stateName = stateItem.name
            if (result.id === stateName) return
        }

        this.setState({
            items: [
                ...this.state.items,
                {
                    name: result.id,
                    path: result.path
                }
            ]
        })
    }
}
