import Action from '../Action'
import type IBanditCraneData from './banditcrane.data'
import type BanditCraneComponent from './banditcrane.view'

import BananaIcon from '#g/images/icons/banana.png'
import { localizeVal } from '#g/texts/renderer'
import type { IXMLElement } from '#g/types'

/** Вкладка `Банан бандита`. */
class BanditCraneAction extends Action {
  protected name = localizeVal({
    RU: 'Банан бандита',
    EN: 'Bandit banana',
    DE: 'Bananen-Bandit',
    CH: '香蕉大盗'
  }).val
  protected id = 'bandit-crane'
  protected minHeight = 200
  protected minWidth = 350
  protected imgSRC = BananaIcon

  constructor(component: typeof BanditCraneComponent) { super(component); this.init() }

  protected isActive(_: any, fileName: string): boolean {
    return fileName === 'zikz_605r'
  }

  protected onExport(dom: IXMLElement): IBanditCraneData {
    return { hasCrane: BanditCraneAction.hasCrane(dom) }
  }

  protected onImport(dom: IXMLElement, data: IBanditCraneData): void {
    if (data.hasCrane && !BanditCraneAction.hasCrane(dom)) {
      BanditCraneAction.addCrane(dom)
    }
  }

  static addCrane(dom: IXMLElement): void {
    const AddonSockets = dom.select('AddonSockets')
    const Trunk = dom.select('Socket[Names="zikz605rTrunk"]')
    const FrameAddon = dom.select('Socket[Names="ZikzFrameAddon"]')

    AddonSockets.after(`
    <AddonSockets>
        <Socket Names="CraneKrs58Bandit" Offset="(-1.25; 0; 0)" NamesBlock="ZikzLogLift, ZikzBigCrane, FrameAddonKungZikz, FrameAddonSeismicVibratorZikz, FrameAddonTankZikz, FrameAddonLogShortZikz" ParentFrame="BoneAddonAttachment_cdt"/>
    </AddonSockets>`)
    Trunk.setAttr('NamesBlock', `CraneKrs58Bandit, ${Trunk.getAttr('NamesBlock')}`)
    FrameAddon.append('<AddonsShift Offset="(-0.5; 0; 0)" Types="CraneKrs58Bandit"/>')
  }

  static removeCrane(dom: IXMLElement): void {
    const Socket = dom.select('Socket[Names="CraneKrs58Bandit"]')
    const Trunk = dom.select('Socket[Names="zikz605rTrunk"]')
    const FrameAddon = dom.select('Socket[Names="ZikzFrameAddon"]')

    Socket.parent().remove()
    Trunk.setAttr('NamesBlock', Trunk.getAttr('NamesBlock')?.replace('CraneKrs58Bandit, ', ''))
    FrameAddon.select('AddonsShift[Types="CraneKrs58Bandit"]').remove()
  }

  static hasCrane(dom: IXMLElement): boolean {
    return dom.has('Socket[Names="CraneKrs58Bandit"]')
  }
}

export default BanditCraneAction
