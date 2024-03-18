import Trailer from './trailer'

import type { TruckAddonSocket, TruckXML } from '/mods/renderer'
import { Lang } from '/mods/renderer'
import { localize } from '/utils/texts/renderer'

export type TrailersData = {
  hasScoutTrailer: boolean
  hasTruckTrailer: boolean
}

class Action {
  readonly name = localize({
    value: {
      [Lang.ru]: 'Прицепы',
      [Lang.en]: 'Trailers',
      [Lang.de]: 'Anhänger',
      [Lang.ch]: '拖车钩'
    }
  })
  readonly icon = 'trailer'
  readonly id = 'trailers'

  isActive(xml: TruckXML): boolean {
    return this.hasTrailers(xml).includes(true)
  }

  export(xml: TruckXML): TrailersData {
    const [hasScoutTrailer, hasTruckTrailer] = this.hasTrailers(xml)
    return { hasScoutTrailer, hasTruckTrailer }
  }

  import(xml: TruckXML, data: TrailersData) {
    const [hasScoutTrailer, hasTruckTrailer] = this.hasTrailers(xml)

    if (data.hasScoutTrailer && !hasScoutTrailer) {
      this.addTrailer(Trailer.scout, Trailer.truck, xml)
    }

    if (data.hasTruckTrailer && !hasTruckTrailer) {
      this.addTrailer(Trailer.truck, Trailer.scout, xml)
    }
  }

  addTrailer(trailer: Trailer, to: Trailer, xml: TruckXML, stateSetter?: (value: boolean) => void) {
    const AddonSockets = xml.GameData?.AddonSockets ?? []
    let MainSocket: TruckAddonSocket | undefined

    for (const { Sockets } of AddonSockets) {
      MainSocket ??= Sockets.find(({ Names }) => Names.includes(to))
      if (MainSocket) break
    }

    if (!MainSocket) throw new Error('socket not found')

    MainSocket.Names = [...MainSocket.Names, trailer]

    for (const { Sockets } of AddonSockets) {
      for (const Socket of Sockets.filter(({ NamesBlock }) => NamesBlock.includes(to))) {
        Socket.NamesBlock = [...Socket.NamesBlock, trailer]

        for (const Shift of Socket.AddonShifts.filter(({ Types }) => Types.includes(to))) {
          const newTypes = [
            ...Shift.Types.filter(type => type !== to),
            trailer
          ]

          Shift.after(`
          <AddonsShift Types="${newTypes.join(', ')}" />
          `)
        }
      }
    }

    stateSetter?.(true)
  }

  removeTrailer(trailer: Trailer, xml: TruckXML, stateSetter?: (value: boolean) => void) {
    const AddonSockets = xml.GameData?.AddonSockets ?? []
    let MainSocket: TruckAddonSocket | undefined

    for (const { Sockets } of AddonSockets) {
      MainSocket ??= Sockets.find(({ Names }) => Names.includes(trailer))
      if (MainSocket) break
    }

    if (!MainSocket) throw new Error('socket not found')

    MainSocket.Names = MainSocket.Names.filter(name => name !== trailer)

    for (const { Sockets } of AddonSockets) {
      for (const Socket of Sockets.filter(({ NamesBlock }) => NamesBlock.includes(trailer))) {
        Socket.NamesBlock = Socket.NamesBlock.filter(name => name !== trailer)

        for (const Shift of Socket.AddonShifts.filter(({ Types }) => Types.includes(trailer))) {
          Shift.remove()
        }
      }
    }

    stateSetter?.(false)
  }

  hasTrailers(xml: TruckXML): [hasScout: boolean, hasMain: boolean] {
    const AddonSockets = xml.GameData?.AddonSockets ?? []
    return [
      Boolean(AddonSockets.some(({ Sockets }) => Sockets.some(({ Names }) => Names.includes('ScautTrailer')))),
      Boolean(AddonSockets.some(({ Sockets }) => Sockets.some(({ Names }) => Names.includes('Trailer'))))
    ]
  }
}

export default new Action()
