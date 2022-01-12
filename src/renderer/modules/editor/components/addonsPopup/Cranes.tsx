import { PureComponent } from 'react'
import { t } from 'scripts'

import {
    Button,
    Box,
    Typography,
    Grid,
    styled
} from '@mui/material'

const Warning = styled(Typography)({
    color: 'red'
})

const Container = styled(Grid)({
    marginTop: '10px',
    justifyContent: 'center',
    width: '100%'
})

const ButtonBox = styled(Box)({
    textAlign: 'center',
    marginLeft: '5px',
    marginRight: '5px'
})

enum Crane {
    RU = 'MinicraneRU',
    US = 'MinicraneUS'
}

interface IProps {
    fileDOM: Document
    show?: boolean
}

interface IState {
    hasRUCrane: boolean
    hasUSCrane: boolean
}

export class Cranes extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            hasRUCrane: Boolean(props.fileDOM.querySelector('Socket[Names*="MinicraneRU"]')),
            hasUSCrane: Boolean(props.fileDOM.querySelector('Socket[Names*="MinicraneUS"]'))
        }
    }

    render() {
        if (!this.props.show) return null
        const hasRUCrane = this.state.hasRUCrane
        const hasUSCrane = this.state.hasUSCrane
        const hasCrane = hasRUCrane || hasUSCrane

        return <>
            {hasCrane ? <>
                <Warning>{t.CRANES_WARN_TITLE}</Warning>
                <Typography>{t.CRANES_WARN_MESSAGE}</Typography>

                <Container>
                    <ButtonBox>
                        <Typography variant='body1'>US {t.CRANE}</Typography>
                        {!hasUSCrane
                            ? <Button
                                variant='contained'
                                color='primary'
                                disabled={!(hasRUCrane && !hasUSCrane)}
                                onClick={() => this.addCrane(Crane.US, Crane.RU)}
                            >
                                {t.ADD}
                            </Button>
                            : <Button
                                variant='contained'
                                color='error'
                                disabled={!(hasRUCrane && hasUSCrane)}
                                onClick={() => this.removeCrane(Crane.US)}
                            >
                                {t.REMOVE}
                            </Button>
                        }
                    </ButtonBox>
                    <ButtonBox>
                        <Typography variant='body1'>RU {t.CRANE}</Typography>
                        {!hasRUCrane
                            ? <Button
                                variant='contained'
                                color='primary'
                                disabled={!(hasUSCrane && !hasRUCrane)}
                                onClick={() => this.addCrane(Crane.RU, Crane.US)}
                            >
                                {t.ADD}
                            </Button>
                            : <Button
                                variant='contained'
                                color='error'
                                disabled={!(hasRUCrane && hasUSCrane)}
                                onClick={() => this.removeCrane(Crane.RU)}
                            >
                                {t.REMOVE}
                            </Button>
                        }
                    </ButtonBox>
                </Container>
            </> : <Typography variant='body1'>{t.CRANES_NOT_SUPPORT}</Typography>
            }
        </>
    }

    private addCrane = (crane: Crane, to: Crane) => {
        const mainSocket = this.props.fileDOM.querySelector(`Socket[Names*="${to}"]`)
        const mainNames = mainSocket.getAttribute('Names').split(',').map(value => value.trim())
        mainNames.push(crane)
        mainSocket.setAttribute('Names', mainNames.join(', '))

        this.props.fileDOM.querySelectorAll(`Socket[NamesBlock*="${to}"]`).forEach(socket => {
            const namesBlock = socket.getAttribute('NamesBlock').split(',').map(value => value.trim())
            namesBlock.push(crane)
            socket.setAttribute('NamesBlock', namesBlock.join(', '))
        })
        this.props.fileDOM.querySelectorAll(`AddonsShift[Types*="${to}"]`).forEach(shift => {
            const newShift = shift.cloneNode(true) as Element
            let types = newShift.getAttribute('Types').split(',').map(value => value.trim())
            types = types.filter(value => value !== to)
            types.push(crane)
            newShift.setAttribute('Types', types.join(', '))
            shift.after(newShift)
        })
        if (crane === Crane.RU) {
            this.setState({
                hasRUCrane: true
            })
        } else if (crane === Crane.US) {
            this.setState({
                hasUSCrane: true
            })
        }
    }

    private removeCrane = (crane: Crane) => {
        const mainSocket = this.props.fileDOM.querySelector(`Socket[Names*="${crane}"]`)
        let mainNames = mainSocket.getAttribute('Names').split(',').map(value => value.trim())
        mainNames = mainNames.filter(value => value !== crane)
        mainSocket.setAttribute('Names', mainNames.join(', '))

        this.props.fileDOM.querySelectorAll(`Socket[NamesBlock*="${crane}"]`).forEach(socket => {
            let namesBlock = socket.getAttribute('NamesBlock').split(',').map(value => value.trim())
            namesBlock = namesBlock.filter(value => value !== crane)
            socket.setAttribute('NamesBlock', namesBlock.join(', '))
        })
        this.props.fileDOM.querySelectorAll(`AddonsShift[Types*="${crane}"]`).forEach(shift => {
            shift.remove()
        })
        if (crane === Crane.RU) {
            this.setState({
                hasRUCrane: false
            })
        } else if (crane === Crane.US) {
            this.setState({
                hasUSCrane: false
            })
        }
    }
}
