import { PureComponent } from 'react'
import { t } from 'scripts'

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
                this.setState({
                    items: findMods()
                })
            }
        }, 500)
    }

    render() {
        let items = []
        if (this.state.items !== null) {
            items = this.state.items.map(value => {
                const isExists = Boolean(this.state.selected[basename(value.path, '.pak')])

                return (
                    <li key={value.name}>
                        {value.name}
                        {!isExists
                            ? <button className='check-mod add' onClick={() => this.select(value)}></button>
                            : <button className='check-mod remove' onClick={() => this.remove(value)}></button>
                        }
                    </li>
                )
            })
        }

        return (
            <div
                className='mods-popup'
                onClick={this.hidePopup}
                style={{
                    height: this.props.show ? '100%' : '0%'
                }}
            >
                <div className='content' onClick={e => e.stopPropagation()}>
                    <header>
                        {this.state.items === null
                            ? t.LOADING
                            : t.MODS_LIST_TITLE
                        }
                    </header>
                    <ul>
                        {items.length
                            ? items
                            : this.state.items !== null
                                ? <li style={{ justifyContent: 'center' }}>{t.EMPTY_MODS_TITLE}</li>
                                : []
                        }
                    </ul>
                    {this.state.items !== null ? <>
                        <button
                            className='btn-secondary add-manual'
                            onClick={this.addManual}
                        >
                            {t.MANUAL_MOD}
                        </button>
                        <br />
                        <button
                            className='btn-primary save-mods'
                            onClick={this.applyChanges}
                        >
                            {t.APPLY}
                        </button>
                    </> : null}
                </div>
            </div>
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
            console.log(value.name)
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
