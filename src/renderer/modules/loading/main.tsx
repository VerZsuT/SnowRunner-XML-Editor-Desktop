import { PureComponent } from 'react'
import { render } from 'react-dom'
import 'styles/loading/main'

import { MAIN } from 'scripts'

const { ipcRenderer } = window.provider

interface IState {
    allCount: number
    loadedCount: number
    percent: number
    isDownload: boolean
    name: string
}

class Loading extends PureComponent<any, IState> {
    constructor(props: any) {
        super(props)

        this.state = {
            allCount: 0,
            loadedCount: 0,
            percent: 0,
            isDownload: false,
            name: ''
        }
    }

    componentDidMount() {
        this.listenIPC()
    }

    render() {
        return (
            <div id='loading'>
                <div id='file-name'>{this.state.name}</div>

                {this.state.isDownload ? <>
                    <progress id='progress' value={this.state.percent} max='100'></progress>
                    <p id='count'>{this.state.loadedCount}/{this.state.allCount}</p>
                    <p id='percent'>{Math.round(this.state.percent)}%</p>
                </>
                    : <div id='circularG'>
                        <div id='circularG_1' className='circularG'></div>
                        <div id='circularG_2' className='circularG'></div>
                        <div id='circularG_3' className='circularG'></div>
                        <div id='circularG_4' className='circularG'></div>
                        <div id='circularG_5' className='circularG'></div>
                        <div id='circularG_6' className='circularG'></div>
                        <div id='circularG_7' className='circularG'></div>
                        <div id='circularG_8' className='circularG'></div>
                    </div>
                }
            </div>
        )
    }

    private listenIPC() {
        ipcRenderer.once('count', (_e, msg) => {
            this.setState({
                allCount: +msg
            })
        })
        ipcRenderer.once('download', () => {
            this.setState({
                isDownload: true
            })
        })
        ipcRenderer.on('success', () => {
            this.setState({
                percent: 0,
                loadedCount: this.state.loadedCount + 1
            })
        })
        ipcRenderer.on('fileName', (_e, msg) => {
            this.setState({
                name: msg
            })
        })
        ipcRenderer.on('percent', (_event, msg) => {
            this.setState({
                percent: +msg
            })
        })
    }
}

render(<Loading />, MAIN)
