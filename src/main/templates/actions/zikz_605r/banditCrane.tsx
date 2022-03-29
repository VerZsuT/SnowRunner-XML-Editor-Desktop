import type { CSSProperties } from 'react'
import type IActionData from 'templates/types/IActionData'
import type IActionProps from 'templates/types/IActionProps'
import localize from 'scripts/localize'
import main from 'scripts/main'
import ActionBase from '../ActionBase'

import { Button, Typography } from '@mui/material'
import Container from 'modules/components/styled/Container'
import Warning from 'modules/editor/styled/Warning'

const texts = {
    RU: {
        craneWarn: 'Перед удалением крана требуется снять его с машины.',
        dlcWarn: 'Для использования требуется купленное DLC с автомобилем KRS 58 "Бандит".',
        remove: 'Удалить',
        add: 'Добавить'
    },
    EN: {
        craneWarn: 'Before removing the crane, it is required to remove it from the machine.',
        dlcWarn: 'The purchased DLC with the KRS 58 Bandit car is required for use.',
        remove: 'Delete',
        add: 'Add'
    },
    DE: {
        craneWarn: 'Der Kran muss vor dem Entfernen von der Maschine entfernt werden.',
        dlcWarn: 'Für die Verwendung ist ein gekaufter DLC mit dem KRS 58 "Bandit" erforderlich.',
        remove: 'Entfernen',
        add: 'Hinzufügen'
    }
}[main.config.lang]

export const data: IActionData = {
    name: {
        RU: 'Банан бандита',
        EN: 'Bandit banana',
        DE: 'Bananen-Bandit',
        CH: '香蕉大盗'
    },
    id: 'bandit-crane',
    minHeight: 200,
    minWidth: 350,
    imgSRC: require('images/icons/editor/banana.png'),
    isActive: (_, fileName) => fileName === 'zikz_605r'
}

interface IExportData {
    hasCrane: boolean
}

interface IState {
    hasCrane: boolean
}

/** Вкладка `Банан бандита`. */
export default class BanditCrane extends ActionBase<IState> {
    private styles = {
        warn: {
            textAlign: 'left',
            padding: '0 10px'
        } as CSSProperties,
        buttons: { marginTop: '10px' }
    }

    constructor(props: IActionProps) {
        super(props, data, BanditCrane)
        this.state = {
            hasCrane: false
        }
    }

    public export(): IExportData {
        return { hasCrane: this.hasCrane() }
    }

    public import(data: IExportData): void {
        if (data.hasCrane && !this.hasCrane()) {
            this.addCrane()
        }
    }

    public componentDidMount(): void {
        this.setState({ hasCrane: this.hasCrane() })
    }

    public render() {
        return <>
            <Warning>{localize.CRANES_WARN_TITLE}</Warning>
            <Container style={this.styles.warn}>
                <Typography>
                    {texts.craneWarn}
                </Typography>
                <Typography>
                    {texts.dlcWarn}
                </Typography>
            </Container>
            <Container style={this.styles.buttons}>
            {this.state.hasCrane
                ? <Button variant='contained' color='warning' onClick={this.removeCrane}>
                    {texts.remove}
                  </Button>
                : <Button variant='contained' onClick={this.addCrane}>
                    {texts.add}
                  </Button>
            }
            </Container>
        </>
    }

    private addCrane = () => {
        const AddonSockets = this.props.dom('AddonSockets').eq(0)
        const Trunk = this.props.dom('Socket[Names="zikz605rTrunk"]').eq(0)
        const FrameAddon = this.props.dom('Socket[Names="ZikzFrameAddon"]').eq(0)

        AddonSockets.after(`
        <AddonSockets>
            <Socket Names="CraneKrs58Bandit" Offset="(-1.25; 0; 0)" NamesBlock="ZikzLogLift, ZikzBigCrane, FrameAddonKungZikz, FrameAddonSeismicVibratorZikz, FrameAddonTankZikz, FrameAddonLogShortZikz" ParentFrame="BoneAddonAttachment_cdt"/>
        </AddonSockets>`)
        Trunk.attr('NamesBlock', `CraneKrs58Bandit, ${Trunk.attr('NamesBlock')}`)
        FrameAddon.append('<AddonsShift Offset="(-0.5; 0; 0)" Types="CraneKrs58Bandit"/>')

        if (this.props.editor)
            this.setState({ hasCrane: true })
    }

    private removeCrane = () => {
        const Socket = this.props.dom('Socket[Names="CraneKrs58Bandit"]').eq(0)
        const Trunk = this.props.dom('Socket[Names="zikz605rTrunk"]').eq(0)
        const FrameAddon = this.props.dom('Socket[Names="ZikzFrameAddon"]').eq(0)

        Socket.parent().remove()
        Trunk.attr('NamesBlock', Trunk.attr('NamesBlock').replace('CraneKrs58Bandit, ', ''))
        FrameAddon.find('AddonsShift[Types="CraneKrs58Bandit"]').eq(0).remove()

        if (this.props.editor)
            this.setState({ hasCrane: false })
    }

    private hasCrane() {
        return !!this.props.dom('Socket[Names="CraneKrs58Bandit"]').length
    }
}
