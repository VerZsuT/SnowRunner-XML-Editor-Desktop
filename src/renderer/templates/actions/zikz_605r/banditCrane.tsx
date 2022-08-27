import {Button, Typography} from 'antd'
import type {CheerioAPI} from 'cheerio'
import {afcMemo, createState} from 'react-afc'
import {localize} from 'scripts/localize'
import type {ActionProps} from 'types'

import {createAction} from '../createAction'
import {actionTexts} from '../texts'

const { Paragraph } = Typography

const {
    CRANES_WARN_TITLE,
    BANDIT_WARN_MESSAGE,
    ADD,
    REMOVE
} = actionTexts

interface ExportData {
    hasCrane: boolean
}

/** Вкладка `Банан бандита`. */
export const BanditCrane = createAction({
    name: localize({
        RU: 'Банан бандита',
        EN: 'Bandit banana',
        DE: 'Bananen-Bandit',
        CH: '香蕉大盗'
    }),
    id: 'bandit-crane',
    minHeight: 200,
    minWidth: 350,
    imgSRC: require('images/icons/banana.png'),
    isActive(_, fileName) {
        return fileName === 'zikz_605r'
    },
    export(dom) {
        return { hasCrane: isHasCrane(dom) }
    },
    import(dom, data: ExportData) {
        if (data.hasCrane && !isHasCrane(dom))
            addCrane(dom)
    }
}, afcMemo((props: ActionProps) => {
    const [state, setState] = createState({
        hasCrane: isHasCrane(props.dom)
    })

    function onAdd() {
        addCrane(props.dom)
        setState({ hasCrane: true })
    }

    function onRemove() {
        removeCrane(props.dom)
        setState({ hasCrane: false })
    }

    return () => <>
        <div className='warn-title'>
            <Paragraph>{CRANES_WARN_TITLE}</Paragraph>
        </div>
        <Paragraph>{BANDIT_WARN_MESSAGE}</Paragraph>
        <div className='bc-buttons'>
            {state.hasCrane
                ? <Button
                    type='primary'
                    onClick={onRemove}
                    danger
                >
                    {REMOVE}
                </Button>
                : <Button
                    onClick={onAdd}
                    type='primary'
                >
                    {ADD}
                </Button>
            }
        </div>
    </>
}))

function addCrane(dom: CheerioAPI) {
    const AddonSockets = dom('AddonSockets').eq(0)
    const Trunk = dom('Socket[Names="zikz605rTrunk"]').eq(0)
    const FrameAddon = dom('Socket[Names="ZikzFrameAddon"]').eq(0)

    AddonSockets.after(`
    <AddonSockets>
        <Socket Names="CraneKrs58Bandit" Offset="(-1.25; 0; 0)" NamesBlock="ZikzLogLift, ZikzBigCrane, FrameAddonKungZikz, FrameAddonSeismicVibratorZikz, FrameAddonTankZikz, FrameAddonLogShortZikz" ParentFrame="BoneAddonAttachment_cdt"/>
    </AddonSockets>`)
    Trunk.attr('NamesBlock', `CraneKrs58Bandit, ${Trunk.attr('NamesBlock')}`)
    FrameAddon.append('<AddonsShift Offset="(-0.5; 0; 0)" Types="CraneKrs58Bandit"/>')
}

function removeCrane(dom: CheerioAPI) {
    const Socket = dom('Socket[Names="CraneKrs58Bandit"]').eq(0)
    const Trunk = dom('Socket[Names="zikz605rTrunk"]').eq(0)
    const FrameAddon = dom('Socket[Names="ZikzFrameAddon"]').eq(0)

    Socket.parent().remove()
    Trunk.attr('NamesBlock', Trunk.attr('NamesBlock').replace('CraneKrs58Bandit, ', ''))
    FrameAddon.find('AddonsShift[Types="CraneKrs58Bandit"]').eq(0).remove()
}

function isHasCrane(dom: CheerioAPI) {
    return !!dom('Socket[Names="CraneKrs58Bandit"]').length
}
