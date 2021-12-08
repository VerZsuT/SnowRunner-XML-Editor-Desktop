import { PureComponent } from 'react'
import { render } from 'react-dom'
import '@editor-bootstrap'
import './styles/main.css'

import { t, mainProcess, Lang, MAIN } from '@editor-service'
import GameFolder from './components/GameFolder'

interface IState {
    updates: boolean
    DLC: boolean
    mods: boolean
    resetButton: boolean
    lang: Lang
    saveBackup: boolean
    pathToInitial: string
}

class Settings extends PureComponent<any, IState> {
    private langOptions = Object.keys(Lang).map(lang => 
        <option key={lang} lang={lang}>
            {lang}
        </option>
    )

    state = {
        updates: config.settings.updates,
        DLC: config.settings.DLC,
        mods: config.settings.mods,
        resetButton: config.settings.resetButton,
        lang: config.lang,
        saveBackup: false,
        pathToInitial: ''
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
            </select><br/>

            <GameFolder onChange={this.onChangePath} />

            <input
                type='checkbox'
                id='ignore-updates'
                className='form-check-input'
                checked={this.state.updates}
                onChange={e => this.onChangeSetting('updates', e.target.checked)}
            />
            <label htmlFor='ignore-updates' className='form-check-label'>{t.UPDATES_LABEL}</label><br/>

            <input
                type='checkbox'
                id='disable-dlc'
                className='form-check-input'
                checked={this.state.DLC}
                onChange={e => this.onChangeSetting('DLC', e.target.checked)}
            />
            <label htmlFor='disable-dlc' className='form-check-label'>{t.DLC_LABEL}</label><br/>

            <input
                type='checkbox'
                id='disable-mods'
                className='form-check-input'
                checked={this.state.mods}
                onChange={e => this.onChangeSetting('mods', e.target.checked)}
            />
            <label htmlFor='disable-mods' className='form-check-label'>{t.MODS_LABEL}</label><br/>

            <input
                type='checkbox'
                id='hide-reset-button'
                className='form-check-input'
                checked={this.state.resetButton}
                onChange={e => this.onChangeSetting('resetButton', e.target.checked)}
            />
            <label htmlFor='hide-reset-button' className='form-check-label'>{t.RESET_BUTTON_LABEL}</label><br/>

            <button className='btn btn-primary' id='save-to-config' onClick={this.save}>{t.SAVE_BUTTON}</button>
        </>)
    }

    private onChangeSetting = (name: string, value: string|boolean) => {
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
            config.paths.initial = this.state.pathToInitial
        }
        config.lang = this.state.lang
        config.settings = {
            updates: this.state.updates,
            DLC: this.state.DLC,
            mods: this.state.mods,
            resetButton: this.state.resetButton,
            limits: config.settings.limits,
            devMode: config.settings.devMode,
            showWhatsNew: config.settings.showWhatsNew
        }

        if (this.state.saveBackup) {
            mainProcess.saveBackup(true)
        } else {
            mainProcess.reload()
        }
    }
}

settingsPreload.errorHandler = message => mainProcess.alertSync(t[`${message}`.replace('Error: ', '')])
render(<Settings/>, MAIN)
