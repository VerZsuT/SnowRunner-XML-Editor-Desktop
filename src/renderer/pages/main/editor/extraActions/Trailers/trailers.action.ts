import ExtraAction from '../ExtraAction'
import Trailer from './Trailer'
import type ITrailersData from './trailers.data'
import type TrailersComponent from './trailers.view'

import TrailerIcon from '#g/images/icons/trailer.png'
import { localizeVal } from '#g/texts/renderer'
import type { IXMLElement } from '#g/types'

class TrailersAction extends ExtraAction {
  protected name = localizeVal({
    RU: 'Прицепы',
    EN: 'Trailers',
    DE: 'Anhänger',
    CH: '拖车'
  }).val
  protected id = 'trailers'
  protected minHeight = 100
  protected imgSRC = TrailerIcon

  constructor(component: typeof TrailersComponent) { super(component); this.init() }

  protected isActive(dom: IXMLElement): boolean {
    return TrailersAction.hasTrailers(dom).includes(true)
  }

  protected onExport(dom: IXMLElement): ITrailersData {
    const [hasScoutTrailer, hasTruckTrailer] = TrailersAction.hasTrailers(dom)
    return { hasScoutTrailer, hasTruckTrailer }
  }

  protected onImport(dom: IXMLElement, data: ITrailersData): void {
    const [hasScoutTrailer, hasTruckTrailer] = TrailersAction.hasTrailers(dom)

    if (data.hasScoutTrailer && !hasScoutTrailer) {
      TrailersAction.addTrailer(Trailer.scout, Trailer.truck, dom)
    }

    if (data.hasTruckTrailer && !hasTruckTrailer) {
      TrailersAction.addTrailer(Trailer.truck, Trailer.scout, dom)
    }
  }

  static addTrailer(trailer: Trailer, to: Trailer, dom: IXMLElement, stateSetter?: (val: boolean) => void): void {
    const mainSocket = dom.has(`Socket[Names~="${to}"]`) ? dom.select(`Socket[Names~="${to}"]`) : dom.select(`Socket[Names~="${to},"]`)
    const mainNames = mainSocket.getAttr('Names')?.split(',').map(value => value.trim())

    mainNames?.push(trailer)
    mainSocket.setAttr('Names', mainNames?.join(', '))

    dom.selectAll(`Socket[NamesBlock~="${to}"], Socket[NamesBlock~="${to},"]`).map(element => {
      const namesBlock = element.getAttr('NamesBlock')?.split(',').map(value => value.trim())
      namesBlock?.push(trailer)
      element.setAttr('NamesBlock', namesBlock?.join(', '))
    })
    dom.selectAll(`AddonsShift[Types~="${to}"], AddonsShift[Types~="${to},"]`).map(element => {
      const newShift = element.clone()
      let types = newShift.getAttr('Types')?.split(',').map(value => value.trim())

      types = types?.filter(value => value !== to)
      types?.push(trailer)
      newShift.setAttr('Types', types?.join(', '))
      element.after(newShift)
    })

    stateSetter?.(true)
  }

  static removeTrailer(trailer: Trailer, dom: IXMLElement, stateSetter?: (val: boolean) => void): void {
    const mainSocket = dom.has(`Socket[Names~="${trailer}"]`) ? dom.select(`Socket[Names~="${trailer}"]`) : dom.select(`Socket[Names~="${trailer},"]`)
    let mainNames = mainSocket.getAttr('Names')?.split(',').map(value => value.trim())

    mainNames = mainNames?.filter(value => value !== trailer)
    mainSocket.setAttr('Names', mainNames?.join(', '))

    dom.selectAll(`Socket[NamesBlock~="${trailer}"], Socket[NamesBlock~="${trailer},"]`).map(element => {
      let namesBlock = element.getAttr('NamesBlock')?.split(',').map(value => value.trim())
      namesBlock = namesBlock?.filter(value => value !== trailer)
      element.setAttr('NamesBlock', namesBlock?.join(', '))
    })
    dom.selectAll(`AddonsShift[Types~="${trailer}"], AddonsShift[Types~="${trailer},"]`).map(element => {
      element.remove()
    })

    stateSetter?.(false)
  }

  /**
   * @returns [scout, main]
   */
  static hasTrailers(dom: IXMLElement): [boolean, boolean] {
    return [
      dom.has('Socket[Names~="ScautTrailer"], Socket[Names~="ScautTrailer,"]'),
      dom.has('Socket[Names~="Trailer"], Socket[Names~="Trailer,"]')
    ]
  }
}

export default TrailersAction
