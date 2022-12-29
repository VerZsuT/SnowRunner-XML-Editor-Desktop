import type { ReactNode } from 'react'

import { Button, Typography } from 'antd'
import type { CheerioAPI } from 'cheerio'
import { fafcMemo, useState } from 'react-afc'

import { ADD, BANDIT_WARN_MESSAGE, CRANES_WARN_TITLE, REMOVE } from '../texts'

import BananaIcon from '#images/icons/banana.png'
import Action from '#r/actions/Action'
import { lzn } from '#services'
import type { IActionProps } from '#types'

const { Paragraph } = Typography

interface IExportData {
  hasCrane: boolean
}

/** Вкладка `Банан бандита`. */
class BanditCrane extends Action {
  protected name = lzn.localize({
    RU: 'Банан бандита',
    EN: 'Bandit banana',
    DE: 'Bananen-Bandit',
    CH: '香蕉大盗'
  })
  protected id = 'bandit-crane'
  protected minHeight = 200
  protected minWidth = 350
  protected imgSRC = BananaIcon
  protected ActionComponent = BanditCraneComponent

  constructor() { super(); this.init() }

  protected isActive(_: any, fileName: string): boolean {
    return fileName === 'zikz_605r'
  }

  protected onExport(dom: CheerioAPI): IExportData {
    return { hasCrane: BanditCrane.hasCrane(dom) }
  }

  protected onImport(dom: CheerioAPI, data: IExportData): void {
    if (data.hasCrane && !BanditCrane.hasCrane(dom)) {
      BanditCrane.addCrane(dom)
    }
  }

  static addCrane(dom: CheerioAPI): void {
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

  static removeCrane(dom: CheerioAPI): void {
    const Socket = dom('Socket[Names="CraneKrs58Bandit"]').eq(0)
    const Trunk = dom('Socket[Names="zikz605rTrunk"]').eq(0)
    const FrameAddon = dom('Socket[Names="ZikzFrameAddon"]').eq(0)

    Socket.parent().remove()
    Trunk.attr('NamesBlock', Trunk.attr('NamesBlock')?.replace('CraneKrs58Bandit, ', ''))
    FrameAddon.find('AddonsShift[Types="CraneKrs58Bandit"]').eq(0).remove()
  }

  static hasCrane(dom: CheerioAPI): boolean {
    return !!dom('Socket[Names="CraneKrs58Bandit"]').length
  }
}

const BanditCraneComponent = fafcMemo<IActionProps>(props => {
  const [hasCrane, setHasCrane] = useState(BanditCrane.hasCrane(props.curr.dom))

  function render(): ReactNode {
    return <>
      <div className='warn-title'>
        <Paragraph>{CRANES_WARN_TITLE}</Paragraph>
      </div>
      <Paragraph>{BANDIT_WARN_MESSAGE}</Paragraph>
      <div className='bc-buttons'>
        {hasCrane.val
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
  }

  function onAdd(): void {
    BanditCrane.addCrane(props.curr.dom)
    setHasCrane(true)
  }

  function onRemove(): void {
    BanditCrane.removeCrane(props.curr.dom)
    setHasCrane(false)
  }

  return render
})

export default BanditCrane
