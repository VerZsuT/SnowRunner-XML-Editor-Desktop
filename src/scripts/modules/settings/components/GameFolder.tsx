import { PureComponent } from 'react'
import '../styles/GameFolder.css'

import { t } from '@editor-service'

interface IProps {
    onChange(value: string): void
}

interface IState {
    manual: boolean
    gameFolder: string
}

export default class GameFolder extends PureComponent<IProps, IState> {
    state = {
        manual: false,
        gameFolder: config.paths.initial
    }

    render() {
        return (
            <div id="gameFolder">
                <label className='form-label'>
                    {this.state.manual? t.INITIAL_LABEL : t.GAME_FOLDER_LABEL}
                </label><br/>
                <input
                    type='text'
                    className='form-control game-folder-input'
                    title={this.state.gameFolder}
                    value={this.state.gameFolder}
                    disabled
                />
                <button className='btn btn-secondary btn-sm' onClick={this.getFolder}>
                    {t.OPEN_BUTTON}
                </button><br/>
                <label className='form-label'>
                    {t.MANUAL_INITIAL}
                </label>
                <input
                    type='checkbox'
                    className='form-check-input manual-initial'
                    checked={this.state.manual}
                    onChange={this.toggleManual}
                /><br/>
            </div>
        )
    }

    private getFolder = () => {
        let data: Folder = {}
        if (this.state.manual) {
            data = settingsPreload.initial
            if (!data) return
            data.folder = data.initial
        } else {
            data = settingsPreload.gameFolder
        }

        if (!data) return

        this.setState({
            gameFolder: data.folder
        })
        this.props.onChange(data.initial)
    }

    private toggleManual = () => {
        this.setState({
            manual: !this.state.manual,
            gameFolder: ''
        })
        this.props.onChange('')
    }
}
