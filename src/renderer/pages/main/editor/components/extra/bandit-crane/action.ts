import type { File, TruckAddonSocket, TruckXML } from '/mods/renderer'
import { Lang } from '/mods/renderer'
import { localize } from '/utils/texts/renderer'

export type BanditCraneData = {
  hasCrane: boolean
}

/** Вкладка `Банан бандита`. */
class Action {
  readonly name = localize({
    value: {
      [Lang.ru]: 'Банан бандита',
      [Lang.en]: 'Bandit banana',
      [Lang.de]: 'Bananen-Bandit',
      [Lang.ch]: '香蕉大盗'
    }
  })
  readonly id = 'bandit-crane'
  readonly icon = 'banana'

  private readonly craneName = 'CraneKrs58Bandit'
  private readonly trunkName = 'ziks605rTrunk'
  private readonly frameAddonName = 'ZikzFrameAddon'

  isActive(file: File): boolean {
    return file.name === 'zikz_605r'
  }

  export(xml: TruckXML): BanditCraneData {
    return { hasCrane: this.hasCrane(xml) } satisfies BanditCraneData
  }

  import(xml: TruckXML, data: BanditCraneData) {
    if (data.hasCrane && !this.hasCrane(xml)) {
      this.addCrane(xml)
    }
  }

  addCrane(xml: TruckXML) {
    const AddonSockets = xml.GameData?.AddonSockets ?? []
    let Trunk: TruckAddonSocket | undefined
    let FrameAddon: TruckAddonSocket | undefined

    for (const { Sockets } of AddonSockets) {
      Trunk ??= Sockets.find(({ Names }) => Names.includes(this.trunkName))
      FrameAddon ??= Sockets.find(({ Names }) => Names.includes(this.frameAddonName))
      if (Trunk && FrameAddon) break
    }
    xml.GameData?.append(`
    <AddonSockets>
        <Socket Names="${this.craneName}" Offset="(-1.25; 0; 0)" NamesBlock="ZikzLogLift, ZikzBigCrane, FrameAddonKungZikz, FrameAddonSeismicVibratorZikz, FrameAddonTankZikz, FrameAddonLogShortZikz" ParentFrame="BoneAddonAttachment_cdt"/>
    </AddonSockets>`)
    FrameAddon?.append(`<AddonsShift Offset="(-0.5; 0; 0)" Types="${this.craneName}"/>`)
    if (Trunk) Trunk.NamesBlock = [this.craneName, ...Trunk.NamesBlock]
  }

  removeCrane(xml: TruckXML) {
    const AddonSockets = xml.GameData?.AddonSockets ?? []
    let Socket: TruckAddonSocket | undefined
    let Trunk: TruckAddonSocket | undefined
    let FrameAddon: TruckAddonSocket | undefined

    for (const { Sockets } of AddonSockets) {
      Socket ??= Sockets?.find(({ Names }) => Names.includes(this.craneName))
      Trunk ??= Sockets?.find(({ Names }) => Names.includes(this.trunkName))
      FrameAddon ??= Sockets?.find(({ Names }) => Names.includes(this.frameAddonName))
      if (Socket && Trunk && FrameAddon) break
    }

    Socket?.parent.remove()
    if (Trunk) Trunk.NamesBlock = Trunk.NamesBlock.filter(name => name !== this.craneName)
    FrameAddon?.AddonShifts.find(({ Types }) => Types.includes(this.craneName))?.remove()
  }

  hasCrane(xml: TruckXML): boolean {
    return Boolean(xml.GameData?.AddonSockets?.some(({ Sockets }) => Sockets.some(({ Names }) => Names.includes(this.craneName))))
  }
}

export default new Action()
