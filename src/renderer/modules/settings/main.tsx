import { PureComponent } from 'react'
import { render } from 'react-dom'
import { t, mainProcess, Lang, MAIN } from 'scripts'
import { GameFolder } from './components/GameFolder'
import 'styles/settings/main'

const { config } = window.provider
const { saveBackup, reload } = mainProcess

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
            <option key={lang} lang={lang}>
                {lang}
            </option>
        )
    }

    render() {
        return (<>
            <label className='form-label' htmlFor='language-select'>{t.LANGUAGE_MENU_ITEM_LABEL}</label>
            <select
                id='language-select'
                className='form-select'
                value={this.state.lang}
                onChange={e => this.onChangeSetting('lang', e.target.value)}
            >
                {this.langOptions}
            </select><br />

            <GameFolder onChange={this.onChangePath} />

            <div id='checkboxes'>
                <input
                    type='checkbox'
                    id='ignore-updates'
                    className='form-check-input'
                    checked={this.state.updates}
                    onChange={e => this.onChangeSetting('updates', e.target.checked)}
                />
                <label htmlFor='ignore-updates' className='form-check-label'>{t.UPDATES_LABEL}</label><br />

                <input
                    type='checkbox'
                    id='disable-dlc'
                    className='form-check-input'
                    checked={this.state.DLC}
                    onChange={e => this.onChangeSetting('DLC', e.target.checked)}
                />
                <label htmlFor='disable-dlc' className='form-check-label'>{t.DLC_LABEL}</label><br />

                <input
                    type='checkbox'
                    id='disable-mods'
                    className='form-check-input'
                    checked={this.state.mods}
                    onChange={e => this.onChangeSetting('mods', e.target.checked)}
                />
                <label htmlFor='disable-mods' className='form-check-label'>{t.MODS_LABEL}</label><br />
            </div>

            <button className='btn btn-primary' id='save-to-config' onClick={this.save}>{t.SAVE_BUTTON}</button>
        </>)
    }

    private onChangeSetting = (name: string, value: string | boolean) => {
        this.setState({
            [name]: value
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
