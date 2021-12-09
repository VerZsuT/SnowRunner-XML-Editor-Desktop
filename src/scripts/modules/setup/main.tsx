import { PureComponent } from 'react'
import { render } from 'react-dom'
import '@editor-bootstrap'
import '@editor-service/menu'
import './styles/main.css'

import { MAIN, mainProcess, t } from '@editor-service'

import Language from './components/Language'
import GameFolder from './components/GameFolder'
import Save from './components/Save'

interface IState {
    pathToInitial: string
}

class Setup extends PureComponent<any, IState> {
    constructor(props: any) {
        super(props)

        this.state = {
            pathToInitial: ''
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.checkExportedConfig()
        }, 500)
    }

    render() {
        return (
            <div id='app'>
                <header>
                    <h2 className='h2'>{t.FIRST_STEPS_DESCRIPTION}</h2>
                </header>

                <div className='steps'>
                    <Language />
                    <GameFolder onChange={this.setPath} />
                    <Save pathToInitial={this.state.pathToInitial} />
                </div>
            </div>
        )
    }

    private setPath = (path: string) => {
        this.setState({pathToInitial: path})
    }

    private checkExportedConfig() {
        if (setupPreload.existsSync(setupPreload.join(paths.backupFolder, 'config.json'))) {
            if (mainProcess.confirm(t.IMPORT_CONFIG_MESSAGE)) {
                mainProcess.importConfig()
                mainProcess.reload()
            }
        }
    }
}

render(<Setup/>, MAIN)
