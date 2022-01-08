import { PureComponent } from 'react'
import { mainProcess, t } from 'scripts'

const { alertSync, saveBackup } = mainProcess
const { config } = window.provider

interface IProps {
    pathToInitial: string
}

export class Save extends PureComponent<IProps> {
    render() {
        return (
            <div id='save'>
                <button className='btn btn-primary save-button' onClick={this.save}>
                    {t.SAVE_BUTTON}
                </button>
            </div>
        )
    }

    private save = () => {
        if (!this.props.pathToInitial) {
            alertSync(t.NO_GAME_FOLDER)
            return
        }

        config.initial = this.props.pathToInitial
        saveBackup(true)
    }
}
