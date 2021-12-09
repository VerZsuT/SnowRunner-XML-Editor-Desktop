import { PureComponent } from 'react'
import { render } from 'react-dom'
import './style.css'

import { MAIN, mainProcess, t } from '@editor-service'

interface IState {
    version: string
}

class UpdateWindow extends PureComponent<any, IState> {
    constructor(props: any) {
        super(props)

        this.state = {
            version: ''
        }
    }

    componentDidMount() {
        this.listenIPC()
    }

    render() {
        return (
            <div id='app'>
                <h2 id='header'>{t.ALLOW_NEW_VERSION_AUTO} (v{this.state.version})</h2>
                <div id='buttons'>
                    <button id='update' className='btn btn-primary' onClick={this.update}>{t.UPDATE}</button>
                    <button id='ignore' className='btn btn-danger' onClick={this.ignore}>{t.IGNORE}</button>
                    <button id='close' className='btn btn-secondary' onClick={this.close}>{t.CLOSE}</button>
                </div>
            </div>
        )
    }

    private close = () => {
        window.close()
    }

    private update = () => {
        mainProcess.update()
    }

    private ignore = () => {
        config.settings.updates = false
        window.close()
    }

    private listenIPC() {
        ipcRenderer.on('content', (_event, data) => {
            this.setState({
                version: data
            })
        })
    }
}

render(<UpdateWindow/>, MAIN)
