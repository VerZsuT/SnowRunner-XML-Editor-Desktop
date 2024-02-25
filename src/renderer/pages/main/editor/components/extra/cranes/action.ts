import Crane from './crane'

import type { TruckAddonSocket, TruckXML } from '/mods/renderer'
import { Lang } from '/mods/renderer'
import { localize } from '/utils/texts/renderer'

export type CranesData = {
  hasRUCrane: boolean
  hasUSCrane: boolean
}

class Action {
  readonly name = localize({
    value: {
      [Lang.ru]: 'Краны',
      [Lang.en]: 'Cranes',
      [Lang.de]: 'Kräne',
      [Lang.ch]: '起重机'
    }
  })
  readonly icon = 'crane'
  readonly id = 'cranes'

  isActive(xml: TruckXML): boolean {
    return this.hasCranes(xml).includes(true)
  }

  export(xml: TruckXML): CranesData {
    const [hasRUCrane, hasUSCrane] = this.hasCranes(xml)
    return { hasRUCrane, hasUSCrane }
  }

  import(xml: TruckXML, data: CranesData) {
    const [hasRUCrane, hasUSCrane] = this.hasCranes(xml)

    if (data.hasUSCrane && !hasUSCrane) {
      this.addCrane(Crane.US, Crane.RU, xml)
    }

    if (data.hasRUCrane && !hasRUCrane) {
      this.addCrane(Crane.RU, Crane.US, xml)
    }
  }

  addCrane(crane: Crane, to: Crane, xml: TruckXML, stateSetter?: (value: boolean) => void) {
    const AddonSockets = xml.GameData?.AddonSockets ?? []
    let MainSocket: TruckAddonSocket | undefined

    for (const { Sockets } of AddonSockets) {
      MainSocket ??= Sockets.find(({ Names }) => Names.includes(to))
      if (MainSocket) break
    }

    if (!MainSocket) throw new Error('socket not found')

    MainSocket.Names = [...MainSocket.Names, crane]

    for (const { Sockets } of AddonSockets) {
      for (const Socket of Sockets.filter(({ NamesBlock }) => NamesBlock.includes(to))) {
        Socket.NamesBlock = [...Socket.NamesBlock, crane]
  
        for (const Shift of Socket.AddonShifts.filter(({ Types }) => Types.includes(to))) {
          const newTypes = [
            ...Shift.Types.filter(type => type !== to),
            crane
          ]
  
          Shift.after(`
          <AddonShift Types="${newTypes.join(', ')}" />
          `)
        }
      }
    }

    stateSetter?.(true)
  }

  removeCrane(crane: Crane, xml: TruckXML, stateSetter?: (value: boolean) => void) {
    const AddonSockets = xml.GameData?.AddonSockets ?? []
    let MainSocket: TruckAddonSocket | undefined

    for (const { Sockets } of AddonSockets) {
      MainSocket ??= Sockets.find(({ Names }) => Names.includes(crane))
      if (MainSocket) break
    }

    if (!MainSocket) throw new Error('socket is not found')

    MainSocket.Names = MainSocket.Names.filter(name => name !== crane)

    for (const { Sockets } of AddonSockets) {
      for (const Socket of Sockets.filter(({ NamesBlock }) => NamesBlock.includes(crane))) {
        Socket.NamesBlock = Socket.NamesBlock.filter(name => name !== crane)

        for (const Shift of Socket.AddonShifts.filter(({ Types }) => Types.includes(crane))) {
          Shift.remove()
        }
      }
    }

    stateSetter?.(false)
  }
  
  hasCranes(xml: TruckXML): [hasRU: boolean, hasUS: boolean] {
    const AddonSockets = xml.GameData?.AddonSockets ?? []
    return [
      Boolean(AddonSockets.some(({ Sockets }) => Sockets.some(({ Names }) => Names.includes('MinicraneRU')))),
      Boolean(AddonSockets.some(({ Sockets }) => Sockets.some(({ Names }) => Names.includes('MinicraneUS'))))
    ]
  }
}

export default new Action()
