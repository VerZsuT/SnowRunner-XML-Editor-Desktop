import { PureComponent } from 'react'
import { t } from 'scripts'

import { Button, Typography, styled } from '@mui/material'
import { GridContainer } from 'modules/components/styled'

const Container = styled(GridContainer)({
    marginTop: '10px',
    justifyContent: 'center'
})

const ButtonBox = styled('div')({
    textAlign: 'center',
    marginLeft: '5px',
    marginRight: '5px'
})

enum Trailer {
    scout = 'ScautTrailer',
    truck = 'Trailer'
}

interface IProps {
    fileDOM: Document
    show?: boolean
}

interface IState {
    hasScoutTrailer: boolean
    hasTruckTrailer: boolean
}

export class Trailers extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            hasScoutTrailer: Boolean(props.fileDOM.querySelectorAll('Socket[Names~="ScautTrailer"], Socket[Names~="ScautTrailer,"]').length),
            hasTruckTrailer: Boolean(props.fileDOM.querySelectorAll('Socket[Names~="Trailer"], Socket[Names~="Trailer,"]').length)
        }
    }

    render() {
        if (!this.props.show) return null
        const hasScoutTrailer = this.state.hasScoutTrailer
        const hasTruckTrailer = this.state.hasTruckTrailer
        const hasTrailer = hasScoutTrailer || hasTruckTrailer

        return <>
            {hasTrailer ? <>
                <Container>
                    <ButtonBox>
                        <Typography variant='body1'>{t.SCOUT_TRAILERS}</Typography>
                        {!hasScoutTrailer
                            ? <Button
                                variant='contained'
                                color='primary'
                                disabled={!(hasTruckTrailer && !hasScoutTrailer)}
                                onClick={() => this.addTrailer(Trailer.scout, Trailer.truck)}
                            >
                                {t.ADD}
                            </Button>
                            : <Button
                                variant='contained'
                                color='error'
                                disabled={!(hasScoutTrailer && hasTruckTrailer)}
                                onClick={() => this.removeTrailer(Trailer.scout)}
                            >
                                {t.REMOVE}
                            </Button>
                        }
                    </ButtonBox>
                    <ButtonBox>
                        <Typography variant='body1'>{t.TRUCK_TRAILERS}</Typography>
                        {!hasTruckTrailer
                            ? <Button
                                variant='contained'
                                color='primary'
                                disabled={!(hasScoutTrailer && !hasTruckTrailer)}
                                onClick={() => this.addTrailer(Trailer.truck, Trailer.scout)}
                            >
                                {t.ADD}
                            </Button>
                            : <Button
                                variant='contained'
                                color='error'
                                disabled={!(hasScoutTrailer && hasTruckTrailer)}
                                onClick={() => this.removeTrailer(Trailer.truck)}
                            >
                                {t.REMOVE}
                            </Button>
                        }
                    </ButtonBox>
                </Container>
            </> : <Typography variant='body1'>{t.TRAILERS_NOT_SUPPORT}</Typography>
            }
        </>
    }

    private addTrailer = (trailer: Trailer, to: Trailer) => {
        const mainSocket = this.props.fileDOM.querySelector(`Socket[Names~="${to}"]`) || this.props.fileDOM.querySelector(`Socket[Names~="${to},"]`)
        const mainNames = mainSocket.getAttribute('Names').split(',').map(value => value.trim())
        mainNames.push(trailer)
        mainSocket.setAttribute('Names', mainNames.join(', '))

        this.props.fileDOM.querySelectorAll(`Socket[NamesBlock~="${to}"], Socket[NamesBlock~="${to},"]`).forEach(socket => {
            const namesBlock = socket.getAttribute('NamesBlock').split(',').map(value => value.trim())
            namesBlock.push(trailer)
            socket.setAttribute('NamesBlock', namesBlock.join(', '))
        })
        this.props.fileDOM.querySelectorAll(`AddonsShift[Types~="${to}"], AddonsShift[Types~="${to},"]`).forEach(shift => {
            const newShift = shift.cloneNode(true) as Element
            let types = newShift.getAttribute('Types').split(',').map(value => value.trim())
            types = types.filter(value => value !== to)
            types.push(trailer)
            newShift.setAttribute('Types', types.join(', '))
            shift.after(newShift)
        })
        if (trailer === Trailer.scout) {
            this.setState({
                hasScoutTrailer: true
            })
        } else if (trailer === Trailer.truck) {
            this.setState({
                hasTruckTrailer: true
            })
        }
    }

    private removeTrailer = (trailer: Trailer) => {
        const mainSocket = this.props.fileDOM.querySelector(`Socket[Names~="${trailer}"]`) || this.props.fileDOM.querySelector(`Socket[Names~="${trailer},"]`)
        let mainNames = mainSocket.getAttribute('Names').split(',').map(value => value.trim())
        mainNames = mainNames.filter(value => value !== trailer)
        mainSocket.setAttribute('Names', mainNames.join(', '))

        this.props.fileDOM.querySelectorAll(`Socket[NamesBlock~="${trailer}"], Socket[NamesBlock~="${trailer},"]`).forEach(socket => {
            let namesBlock = socket.getAttribute('NamesBlock').split(',').map(value => value.trim())
            namesBlock = namesBlock.filter(value => value !== trailer)
            socket.setAttribute('NamesBlock', namesBlock.join(', '))
        })
        this.props.fileDOM.querySelectorAll(`AddonsShift[Types~="${trailer}"], AddonsShift[Types~="${trailer},"]`).forEach(shift => {
            shift.remove()
        })
        if (trailer === Trailer.scout) {
            this.setState({
                hasScoutTrailer: false
            })
        } else if (trailer === Trailer.truck) {
            this.setState({
                hasTruckTrailer: false
            })
        }
    }
}
