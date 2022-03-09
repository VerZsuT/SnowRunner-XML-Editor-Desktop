import { PureComponent } from 'react'
import { render } from 'react-dom'
import { MAIN } from 'scripts/funcs'

import { Typography, CircularProgress } from '@mui/material'
import Container from 'modules/components/styled/Container'
import GridContainer from 'modules/components/styled/GridContainer'
import LinearProgress from './styled/LinearProgress'
import 'styles/loading'

const { on } = window.ipc

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
            <Container style={{ textAlign: 'center' }}>
                <Container>
                    <Typography variant='h6'>
                        {this.state.name}
                    </Typography>
                </Container>

                {this.state.isDownload 
                    ? <>
                        <LinearProgress
                            variant='determinate'
                            value={this.state.percent}
                        />
                        <GridContainer style={{ justifyContent: 'center' }}>
                            <Typography variant='body2'>
                                {this.state.loadedCount}/{this.state.allCount}
                            </Typography>
                            <Typography variant='body2' style={{ marginLeft: '10px' }}>
                                {Math.round(this.state.percent)}%
                            </Typography>
                        </GridContainer>
                    </>
                    : <CircularProgress style={{ marginTop: '15px' }}/>
                }
            </Container>
        )
    }

    private listenIPC() {
        on('count', (_e, msg) =>
            this.setState({ allCount: +msg })
        )
        on('download', () =>
            this.setState({ isDownload: true })
        )
        on('success', () =>
            this.setState({
                percent: 0,
                loadedCount: this.state.loadedCount + 1
            })
        )
        on('fileName', (_e, msg) =>
            this.setState({ name: msg })
        )
        on('percent', (_event, msg) =>
            this.setState({ percent: +msg })
        )
    }
}

render(<Loading/>, MAIN)
