import { PureComponent } from 'react'
import '../styles/GameFolder.css'

import { t } from '@editor-service'

interface IProps {
    onChange(path: string): void
}

interface IState {
    manual: boolean
    gameFolder: string
}

export default class GameFolder extends PureComponent<IProps, IState> {
    state = {
        manual: false,
        gameFolder: ''
    }

    render() {
        return (
            <div id='gameFolder'>
                <label className='form-label'>
                    {this.state.manual? t.INITIAL_LABEL : t.GAME_FOLDER_LABEL}
                </label>
                <br/>
                <input 
                    type='text'
                    className='form-control game-folder-input'
                    title={this.state.gameFolder}
                    value={this.state.gameFolder}
                    disabled
                />
                <button className='btn btn-primary btn-sm' onClick={this.getFolder}>
                    {t.OPEN_BUTTON}
                </button>
                <br/>
                <label className='form-label' title={t.AUTO_INITIAL_TITLE}>
                    {t.MANUAL_INITIAL}
                </label>
                <input 
                    type='checkbox'
                    className='form-check-input'
                    checked={this.state.manual}
                    onChange={this.toggleManual}
                />
                <br/>
            </div>
        )
    }

    private getFolder = () => {
        let data: IFolder
        if (this.state.manual) {
            data = setupPreload.initial
            if (!data) return
            data.folder = data.initial
        } else {
            data = setupPreload.gameFolder
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
