import {Button, Typography} from 'antd'
import type {CheerioAPI} from 'cheerio'
import {afcMemo, createState} from 'react-afc'
import {localize} from 'scripts/localize'
import type {ActionProps} from 'types'

import {createAction} from './createAction'
import {actionTexts} from './texts'

const { Text } = Typography

const {
    SCOUT_TRAILERS,
    TRUCK_TRAILERS,
    ADD,
    REMOVE
} = actionTexts

enum Trailer {
    scout = 'ScautTrailer',
    truck = 'Trailer'
}

interface ExportData {
    hasScoutTrailer: boolean
    hasTruckTrailer: boolean
}

export const Trailers = createAction({
    name: localize({
        RU: 'Прицепы',
        EN: 'Trailers',
        DE: 'Anhänger',
        CH: '拖车'
    }),
    id: 'trailers',
    minHeight: 100,
    imgSRC: require('images/icons/trailer.png'),
    isActive: dom => hasTrailers(dom).includes(true),
    export: (dom): ExportData => {
        const [hasScoutTrailer, hasTruckTrailer] = hasTrailers(dom)
        return { hasScoutTrailer, hasTruckTrailer }
    },
    import: (dom, data: ExportData) => {
        const [hasScoutTrailer, hasTruckTrailer] = hasTrailers(dom)

        if (data.hasScoutTrailer && !hasScoutTrailer)
            addTrailer(Trailer.scout, Trailer.truck, dom)

        if (data.hasTruckTrailer && !hasTruckTrailer)
            addTrailer(Trailer.truck, Trailer.scout, dom)
    }
}, afcMemo<ActionProps>(props => {
    const [state, setState] = createState({
        hasScout: hasTrailers(props.dom)[0],
        hasTruck: hasTrailers(props.dom)[1]
    })

    const addScout = () => addTrailer(Trailer.scout, Trailer.truck, props.dom, hasScout => setState({ hasScout }))
    const addTruck = () => addTrailer(Trailer.truck, Trailer.scout, props.dom, hasTruck => setState({ hasTruck }))

    const removeScout = () => removeTrailer(Trailer.scout, props.dom, hasScout => setState({ hasScout }))
    const removeTruck = () => removeTrailer(Trailer.truck, props.dom, hasTruck => setState({ hasTruck }))

    return () => {
        const { hasScout, hasTruck } = state

        return (
            <div className='grid trailers-grid'>
                <div className='trailers-buttons'>
                    <Text>{SCOUT_TRAILERS}</Text><br/>
                    {!hasScout
                        ? <Button
                            disabled={!(hasTruck && !hasScout)}
                            onClick={addScout}
                            type='primary'
                        >
                            {ADD}
                        </Button>
                        : <Button
                            disabled={!(hasScout && hasTruck)}
                            onClick={removeScout}
                            type='primary'
                            danger
                        >
                            {REMOVE}
                        </Button>
                    }
                </div>
                <div className='trailers-buttons'>
                    <Text>{TRUCK_TRAILERS}</Text><br/>
                    {!hasTruck
                        ? <Button
                            disabled={!(hasScout && !hasTruck)}
                            onClick={addTruck}
                            type='primary'
                        >
                            {ADD}
                        </Button>
                        : <Button
                            disabled={!(hasScout && hasTruck)}
                            onClick={removeTruck}
                            type='primary'
                            danger
                        >
                            {REMOVE}
                        </Button>
                    }
                </div>
            </div>
        )
    }
}))

function addTrailer(trailer: Trailer, to: Trailer, dom: CheerioAPI, stateSetter?: (val: boolean) => void) {
    const mainSocket = dom(`Socket[Names~="${to}"]`).length ? dom(`Socket[Names~="${to}"]`) : dom(`Socket[Names~="${to},"]`)
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

    stateSetter(true)
}

function removeTrailer(trailer: Trailer, dom: CheerioAPI, stateSetter?: (val: boolean) => void) {
    const mainSocket = dom(`Socket[Names~="${trailer}"]`).length ? dom(`Socket[Names~="${trailer}"]`) : dom(`Socket[Names~="${trailer},"]`)
    let mainNames = mainSocket.attr('Names').split(',').map(value => value.trim())

    mainNames = mainNames.filter(value => value !== trailer)
    mainSocket.attr('Names', mainNames.join(', '))

    dom(`Socket[NamesBlock~="${trailer}"], Socket[NamesBlock~="${trailer},"]`).map((_, el) => {
        let namesBlock = dom(el).attr('NamesBlock').split(',').map(value => value.trim())
        namesBlock = namesBlock.filter(value => value !== trailer)
        dom(el).attr('NamesBlock', namesBlock.join(', '))
    })
    dom(`AddonsShift[Types~="${trailer}"], AddonsShift[Types~="${trailer},"]`).map((_, el) => {
        dom(el).remove()
    })

    stateSetter(false)
}

/**
 * @returns [scout, main]
 */
function hasTrailers(dom: CheerioAPI): [boolean, boolean] {
    return [
        !!dom('Socket[Names~="ScautTrailer"], Socket[Names~="ScautTrailer,"]').length,
        !!dom('Socket[Names~="Trailer"], Socket[Names~="Trailer,"]').length
    ]
}
