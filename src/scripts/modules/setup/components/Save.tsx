import { PureComponent } from 'react'
import '../styles/Save'

import { mainProcess, t } from '@sxmle-service'

interface IProps {
    pathToInitial: string
}

export default class Save extends PureComponent<IProps> {
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
            mainProcess.alertSync(t.NO_GAME_FOLDER)
            return
        }

        config.paths.initial = this.props.pathToInitial
        mainProcess.saveInitialHash()
        mainProcess.saveBackup(true)
    }
}
