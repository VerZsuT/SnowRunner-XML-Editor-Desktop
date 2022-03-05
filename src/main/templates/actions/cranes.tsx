import type { CheerioAPI } from 'cheerio'
import type IActionData from '../types/IActionData'
import type IActionProps from '../types/IActionProps'
import localize from 'scripts/localize'
import ActionBase from './ActionBase'

import { Button, Typography } from '@mui/material'
import Warning from 'modules/editor/styled/Warning'
import Container from 'modules/editor/styled/CranesContainer'
import ButtonBox from 'modules/editor/styled/ButtonBox'

enum Crane {
    RU = 'MinicraneRU',
    US = 'MinicraneUS'
}

interface IExportData {
    hasRUCrane: boolean
    hasUSCrane: boolean
}

interface IState {
    hasRUCrane: boolean
    hasUSCrane: boolean
}

export const data: IActionData = {
    name: localize.CRANES,
    id: 'cranes',
    minHeight: 180,
    imgSRC: require('images/icons/editor/crane.png'),
    isActive: dom => Cranes.hasCranes(dom).includes(true)
}

export default class Cranes extends ActionBase<IState> {
    constructor(props: IActionProps) {
        super(props, data, Cranes)
        this.state = {
            hasRUCrane: false,
            hasUSCrane: false
        }
    }

    public export(): IExportData {
        const [hasRUCrane, hasUSCrane] = Cranes.hasCranes(this.props.dom)
        return { hasRUCrane, hasUSCrane }
    }

    public import(data: IExportData): void {
        const [hasRUCrane, hasUSCrane] = Cranes.hasCranes(this.props.dom)

        if (data.hasUSCrane && !hasUSCrane)
            this.addCrane(Crane.US, Crane.RU)

        if (data.hasRUCrane && !hasRUCrane)
            this.addCrane(Crane.RU, Crane.US)
    }

    public componentDidMount() {
        const [hasRUCrane, hasUSCrane] = Cranes.hasCranes(this.props.dom)
        this.setState({ hasRUCrane, hasUSCrane })
    }

    public render() {
        const hasRUCrane = this.state.hasRUCrane
        const hasUSCrane = this.state.hasUSCrane

        return <>
            <Warning>{localize.CRANES_WARN_TITLE}</Warning>
            <Container style={{ padding: '0 10px', textAlign: 'left', marginTop: 0 }}>
                <Typography>{localize.CRANES_WARN_MESSAGE}</Typography>
            </Container>

            <Container>
                <ButtonBox>
                    <Typography variant='body1'>US {localize.CRANE}</Typography>
                    {!hasUSCrane
                        ? <Button
                            variant='contained'
                            color='primary'
                            disabled={!(hasRUCrane && !hasUSCrane)}
                            onClick={() => this.addCrane(Crane.US, Crane.RU)}
                        >
                            {localize.ADD}
                        </Button>
                        : <Button
                            variant='contained'
                            color='error'
                            disabled={!(hasRUCrane && hasUSCrane)}
                            onClick={() => this.removeCrane(Crane.US)}
                        >
                            {localize.REMOVE}
                        </Button>
                    }
                </ButtonBox>
                <ButtonBox>
                    <Typography variant='body1'>RU {localize.CRANE}</Typography>
                    {!hasRUCrane
                        ? <Button
                            variant='contained'
                            color='primary'
                            disabled={!(hasUSCrane && !hasRUCrane)}
                            onClick={() => this.addCrane(Crane.RU, Crane.US)}
                        >
                            {localize.ADD}
                        </Button>
                        : <Button
                            variant='contained'
                            color='error'
                            disabled={!(hasRUCrane && hasUSCrane)}
                            onClick={() => this.removeCrane(Crane.RU)}
                        >
                            {localize.REMOVE}
                        </Button>
                    }
                </ButtonBox>
            </Container>
        </>
    }

    private addCrane = (crane: Crane, to: Crane) => {
        const dom = this.props.dom
        const mainSocket = dom(`Socket[Names*="${to}"]`)
        const mainNames = mainSocket.attr('Names').split(',').map(value => value.trim())

        mainNames.push(crane)
        mainSocket.attr('Names', mainNames.join(', '))

        dom(`Socket[NamesBlock*="${to}"]`).map((_, el) => {
            const namesBlock = dom(el).attr('NamesBlock').split(',').map(value => value.trim())
            namesBlock.push(crane)
            dom(el).attr('NamesBlock', namesBlock.join(', '))
        })
        dom(`AddonsShift[Types*="${to}"]`).map((_, el) => {
            const newShift = el.cloneNode(true)
            let types = dom(newShift).attr('Types').split(',').map(value => value.trim())
            
            types = types.filter(value => value !== to)
            types.push(crane)
            dom(newShift).attr('Types', types.join(', '))
            dom(el).after(newShift)
        })

        if (this.props.editor) {
            if (crane === Crane.RU)
                this.setState({ hasRUCrane: true })
            else if (crane === Crane.US)
                this.setState({ hasUSCrane: true })
        }
    }

    private removeCrane = (crane: Crane) => {
        const dom = this.props.dom
        const mainSocket = dom(`Socket[Names*="${crane}"]`)
        let mainNames = mainSocket.attr('Names').split(',').map(value => value.trim())

        mainNames = mainNames.filter(value => value !== crane)
        mainSocket.attr('Names', mainNames.join(', '))

        dom(`Socket[NamesBlock*="${crane}"]`).map((_, el) => {
            let namesBlock = dom(el).attr('NamesBlock').split(',').map(value => value.trim())
            namesBlock = namesBlock.filter(value => value !== crane)
            dom(el).attr('NamesBlock', namesBlock.join(', '))
        })
        dom(`AddonsShift[Types*="${crane}"]`).map((_, el) =>
            dom(el).remove()
        )

        if (this.props.editor) {
            if (crane === Crane.RU)
                this.setState({ hasRUCrane: false })
            else if (crane === Crane.US)
                this.setState({ hasUSCrane: false })
        }
    }

    /**
     * @returns `[hasRUCrane, hasUSCrane]`
     */
    public static hasCranes(dom: CheerioAPI): [boolean, boolean] {
        return [
            !!dom('Socket[Names*="MinicraneRU"]').length,
            !!dom('Socket[Names*="MinicraneUS"]').length
        ]
    }
}
