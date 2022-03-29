import type { CheerioAPI } from 'cheerio'
import type IActionData from '../types/IActionData'
import type IActionProps from '../types/IActionProps'
import ActionBase from './ActionBase'
import localize from 'scripts/localize'

import { Button, Typography } from '@mui/material'
import Container from 'modules/editor/styled/CranesContainer'
import ButtonBox from 'modules/editor/styled/ButtonBox'

enum Trailer {
    scout = 'ScautTrailer',
    truck = 'Trailer'
}

interface IExportData {
    hasScoutTrailer: boolean
    hasTruckTrailer: boolean
}

interface IState {
    hasScoutTrailer: boolean
    hasTruckTrailer: boolean
}

export const data: IActionData = {
    name: {
        RU: 'Прицепы',
        EN: 'Trailers',
        DE: 'Anhänger',
        CH: '拖车'
    },
    id: 'trailers',
    minHeight: 100,
    imgSRC: require('images/icons/editor/trailer.png'),
    isActive: dom => Trailers.hasTrailers(dom).includes(true)
}

export default class Trailers extends ActionBase<IState> {
    constructor(props: IActionProps) {
        super(props, data, Trailers)
        this.state = {
            hasScoutTrailer: false,
            hasTruckTrailer: false
        }
    }

    public export(): IExportData {
        const [hasScoutTrailer, hasTruckTrailer] = Trailers.hasTrailers(this.props.dom)
        return { hasScoutTrailer, hasTruckTrailer }
    }

    public import(data: IExportData): void {
        const [hasScoutTrailer, hasTruckTrailer] = Trailers.hasTrailers(this.props.dom)

        if (data.hasScoutTrailer && !hasScoutTrailer)
            this.addTrailer(Trailer.scout, Trailer.truck)

        if (data.hasTruckTrailer && !hasTruckTrailer)
            this.addTrailer(Trailer.truck, Trailer.scout)
    }

    public componentDidMount(): void {
        const [hasScoutTrailer, hasTruckTrailer] = Trailers.hasTrailers(this.props.dom)
        this.setState({ hasScoutTrailer, hasTruckTrailer })
    }

    public render() {
        const { hasScoutTrailer, hasTruckTrailer } = this.state

        return <>
            <Container>
                <ButtonBox>
                    <Typography variant='body1'>{localize.SCOUT_TRAILERS}</Typography>
                    {!hasScoutTrailer
                        ? <Button
                            variant='contained'
                            color='primary'
                            disabled={!(hasTruckTrailer && !hasScoutTrailer)}
                            onClick={this.addScoutTrailers}
                        >
                            {localize.ADD}
                        </Button>
                        : <Button
                            variant='contained'
                            color='error'
                            disabled={!(hasScoutTrailer && hasTruckTrailer)}
                            onClick={this.removeScoutTrailers}
                        >
                            {localize.REMOVE}
                        </Button>
                    }
                </ButtonBox>
                <ButtonBox>
                    <Typography variant='body1'>{localize.TRUCK_TRAILERS}</Typography>
                    {!hasTruckTrailer
                        ? <Button
                            variant='contained'
                            color='primary'
                            disabled={!(hasScoutTrailer && !hasTruckTrailer)}
                            onClick={this.addTruckTrailers}
                        >
                            {localize.ADD}
                        </Button>
                        : <Button
                            variant='contained'
                            color='error'
                            disabled={!(hasScoutTrailer && hasTruckTrailer)}
                            onClick={this.removeTruckTrailers}
                        >
                            {localize.REMOVE}
                        </Button>
                    }
                </ButtonBox>
            </Container>
        </>
    }

    private addTruckTrailers = () => this.addTrailer(Trailer.truck, Trailer.scout)
    private addScoutTrailers = () => this.addTrailer(Trailer.scout, Trailer.truck)

    private removeTruckTrailers = () => this.removeTrailer(Trailer.truck)
    private removeScoutTrailers = () => this.removeTrailer(Trailer.scout)

    private addTrailer = (trailer: Trailer, to: Trailer) => {
        const { dom, editor } = this.props
        const mainSocket = dom(`Socket[Names~="${to}"]`).length? dom(`Socket[Names~="${to}"]`) : dom(`Socket[Names~="${to},"]`)
        const mainNames = mainSocket.attr('Names').split(',').map(value => value.trim())

        mainNames.push(trailer)
        mainSocket.attr('Names', mainNames.join(', '))

        dom(`Socket[NamesBlock~="${to}"], Socket[NamesBlock~="${to},"]`).map((_, el) => {
            const namesBlock = dom(el).attr('NamesBlock').split(',').map(value => value.trim())
            namesBlock.push(trailer)
            dom(el).attr('NamesBlock', namesBlock.join(', '))
        })
        dom(`AddonsShift[Types~="${to}"], AddonsShift[Types~="${to},"]`).map((_, el) => {
            const newShift = el.cloneNode(true)
            let types = dom(newShift).attr('Types').split(',').map(value => value.trim())

            types = types.filter(value => value !== to)
            types.push(trailer)
            dom(newShift).attr('Types', types.join(', '))
            dom(el).after(newShift)
        })

        if (editor) {
            if (trailer === Trailer.scout)
                this.setState({ hasScoutTrailer: true })
            else if (trailer === Trailer.truck)
                this.setState({ hasTruckTrailer: true })
        }
    }

    private removeTrailer = (trailer: Trailer) => {
        const { editor, dom } = this.props
        const mainSocket = dom(`Socket[Names~="${trailer}"]`).length? dom(`Socket[Names~="${trailer}"]`) : dom(`Socket[Names~="${trailer},"]`)
        let mainNames = mainSocket.attr('Names').split(',').map(value => value.trim())

        mainNames = mainNames.filter(value => value !== trailer)
        mainSocket.attr('Names', mainNames.join(', '))

        dom(`Socket[NamesBlock~="${trailer}"], Socket[NamesBlock~="${trailer},"]`).map((_, el) => {
            let namesBlock = dom(el).attr('NamesBlock').split(',').map(value => value.trim())
            namesBlock = namesBlock.filter(value => value !== trailer)
            dom(el).attr('NamesBlock', namesBlock.join(', '))
        })
        dom(`AddonsShift[Types~="${trailer}"], AddonsShift[Types~="${trailer},"]`).map((_, el) =>
            dom(el).remove()
        )

        if (editor) {
            if (trailer === Trailer.scout)
                this.setState({ hasScoutTrailer: false })
            else if (trailer === Trailer.truck)
                this.setState({ hasTruckTrailer: false })
        }
    }

    /**
     * @returns [scout, main]
     */
    public static hasTrailers(dom: CheerioAPI): [boolean, boolean] {
        return [
            !!dom('Socket[Names~="ScautTrailer"], Socket[Names~="ScautTrailer,"]').length,
            !!dom('Socket[Names~="Trailer"], Socket[Names~="Trailer,"]').length
        ]
    }
}
