import {Button, Typography} from 'antd'
import type {CheerioAPI} from 'cheerio'
import {afcMemo, createState} from 'react-afc'
import {localize} from 'scripts/localize'
import type {ActionProps} from 'types'

import {createAction} from './createAction'
import {actionTexts} from './texts'

const { Paragraph, Text } = Typography

const {
    CRANES_WARN_TITLE,
    CRANES_WARN_MESSAGE,
    CRANE,
    ADD,
    REMOVE
} = actionTexts

enum Crane {
    RU = 'MinicraneRU',
    US = 'MinicraneUS'
}

interface ExportData {
    hasRUCrane: boolean
    hasUSCrane: boolean
}

export const Cranes = createAction({
    name: localize({
        RU: 'Краны',
        EN: 'Cranes',
        DE: 'Kräne',
        CH: '起重机'
    }),
    id: 'cranes',
    minHeight: 180,
    imgSRC: require('images/icons/crane.png'),
    isActive(dom) {
        return hasCranes(dom).includes(true)
    },
    export(dom): ExportData {
        const [hasRUCrane, hasUSCrane] = hasCranes(dom)
        return { hasRUCrane, hasUSCrane }
    },
    import(dom, data: ExportData) {
        const [hasRUCrane, hasUSCrane] = hasCranes(dom)

        if (data.hasUSCrane && !hasUSCrane)
            addCrane(Crane.US, Crane.RU, dom)

        if (data.hasRUCrane && !hasRUCrane)
            addCrane(Crane.RU, Crane.US, dom)
    }
}, afcMemo((props: ActionProps) => {
    const [state, setState] = createState({
        hasRU: hasCranes(props.dom)[0],
        hasUS: hasCranes(props.dom)[1]
    })

    const addUS = () => addCrane(Crane.US, Crane.RU, props.dom, hasUS => setState({ hasUS }))
    const addRU = () => addCrane(Crane.RU, Crane.US, props.dom, hasRU => setState({ hasRU }))

    const removeUS = () => removeCrane(Crane.US, props.dom, hasUS => setState({ hasUS }))
    const removeRU = () => removeCrane(Crane.RU, props.dom, hasRU => setState({ hasRU }))

    return () => {
        const { hasRU, hasUS } = state

        return <>
            <div className='warn-title'>
                <Paragraph>{CRANES_WARN_TITLE}</Paragraph>
            </div>
            <div className='cranes-warn-cont'>
                <Paragraph>{CRANES_WARN_MESSAGE}</Paragraph>
            </div>

            <div className='grid cranes-grid'>
                <div className='cranes-buttons'>
                    <Text>
                    US {CRANE}
                    </Text><br/>
                    {!hasUS
                        ? <Button
                            disabled={!(hasRU && !hasUS)}
                            onClick={addUS}
                            type='primary'
                        >
                            {ADD}
                        </Button>
                        : <Button
                            disabled={!(hasRU && hasUS)}
                            onClick={removeUS}
                            type='primary'
                            danger
                        >
                            {REMOVE}
                        </Button>
                    }
                </div>
                <div className='cranes-buttons'>
                    <Text>
                    RU {CRANE}
                    </Text><br/>
                    {!hasRU
                        ? <Button
                            disabled={!(hasUS && !hasRU)}
                            onClick={addRU}
                            type='primary'
                        >
                            {ADD}
                        </Button>
                        : <Button
                            disabled={!(hasRU && hasUS)}
                            onClick={removeRU}
                            type='primary'
                            danger
                        >
                            {REMOVE}
                        </Button>
                    }
                </div>
            </div>
        </>
    }
}))

function addCrane(crane: Crane, to: Crane, dom: CheerioAPI, stateSetter?: (val: boolean) => void) {
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

    stateSetter(true)
}

function removeCrane(crane: Crane, dom: CheerioAPI, stateSetter?: (val: boolean) => void) {
    const mainSocket = dom(`Socket[Names*="${crane}"]`)
    let mainNames = mainSocket.attr('Names').split(',').map(value => value.trim())

    mainNames = mainNames.filter(value => value !== crane)
    mainSocket.attr('Names', mainNames.join(', '))

    dom(`Socket[NamesBlock*="${crane}"]`).map((_, el) => {
        let namesBlock = dom(el).attr('NamesBlock').split(',').map(value => value.trim())
        namesBlock = namesBlock.filter(value => value !== crane)
        dom(el).attr('NamesBlock', namesBlock.join(', '))
    })
    dom(`AddonsShift[Types*="${crane}"]`).map((_, el) => {
        dom(el).remove()
    })

    stateSetter(false)
}

/**
 * @returns `[hasRUCrane, hasUSCrane]`
 */
function hasCranes(dom: CheerioAPI): [boolean, boolean] {
    return [
        !!dom('Socket[Names*="MinicraneRU"]').length,
        !!dom('Socket[Names*="MinicraneUS"]').length
    ]
}
