import type { CheerioAPI } from 'cheerio'

import Action from '../Action'
import type BanditCraneComponent from './component'

import BananaIcon from '#images/icons/banana.png'
import { lzn } from '#services'

type ExportData = {
  hasCrane: boolean
}

/** Вкладка `Банан бандита`. */
class BanditCraneAction extends Action {
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

  constructor(component: typeof BanditCraneComponent) { super(component); this.init() }

  protected isActive(_: any, fileName: string): boolean {
    return fileName === 'zikz_605r'
  }

  protected onExport(dom: CheerioAPI): ExportData {
    return { hasCrane: BanditCraneAction.hasCrane(dom) }
  }

  protected onImport(dom: CheerioAPI, data: ExportData): void {
    if (data.hasCrane && !BanditCraneAction.hasCrane(dom))
      BanditCraneAction.addCrane(dom)
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

export default BanditCraneAction
