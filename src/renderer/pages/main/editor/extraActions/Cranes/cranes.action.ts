import ExtraAction from '../ExtraAction'
import Crane from './Crane'
import type ICranesData from './cranes.data'
import type CranesComponent from './cranes.view'

import CraneIcon from '#g/images/icons/crane.png'
import { localizeVal } from '#g/texts/renderer'
import type { IXMLElement } from '#g/types'

class CranesAction extends ExtraAction {
  protected name = localizeVal({
    RU: 'Краны',
    EN: 'Cranes',
    DE: 'Kräne',
    CH: '起重机'
  }).val
  protected id = 'cranes'
  protected minHeight = 180
  protected imgSRC = CraneIcon

  constructor(component: typeof CranesComponent) { super(component); this.init() }

  protected isActive(dom: IXMLElement): boolean {
    return CranesAction.hasCranes(dom).includes(true)
  }

  protected onExport(dom: IXMLElement): ICranesData {
    const [hasRUCrane, hasUSCrane] = CranesAction.hasCranes(dom)
    return { hasRUCrane, hasUSCrane }
  }

  protected onImport(dom: IXMLElement, data: ICranesData): void {
    const [hasRUCrane, hasUSCrane] = CranesAction.hasCranes(dom)

    if (data.hasUSCrane && !hasUSCrane) {
      CranesAction.addCrane(Crane.US, Crane.RU, dom)
    }

    if (data.hasRUCrane && !hasRUCrane) {
      CranesAction.addCrane(Crane.RU, Crane.US, dom)
    }
  }

  static addCrane(crane: Crane, to: Crane, dom: IXMLElement, stateSetter?: (val: boolean) => void): void {
    const mainSocket = dom.select(`Socket[Names*="${to}"]`)
    const mainNames = mainSocket.getAttr('Names')?.split(',').map(value => value.trim())

    mainNames?.push(crane)
    mainSocket.setAttr('Names', mainNames?.join(', '))

    dom.selectAll(`Socket[NamesBlock*="${to}"]`).map(element => {
      const namesBlock = element.getAttr('NamesBlock')?.split(',').map(value => value.trim())
      namesBlock?.push(crane)
      element.setAttr('NamesBlock', namesBlock?.join(', '))
    })
    dom.selectAll(`AddonsShift[Types*="${to}"]`).map(element => {
      const newShift = element.clone()
      let types = newShift.getAttr('Types')?.split(',').map(value => value.trim())

      types = types?.filter(value => value !== to)
      types?.push(crane)
      newShift.setAttr('Types', types?.join(', '))
      element.after(newShift)
    })

    stateSetter?.(true)
  }

  static removeCrane(crane: Crane, dom: IXMLElement, stateSetter?: (val: boolean) => void): void {
    const mainSocket = dom.select(`Socket[Names*="${crane}"]`)
    let mainNames = mainSocket.getAttr('Names')?.split(',').map(value => value.trim())

    mainNames = mainNames?.filter(value => value !== crane)
    mainSocket.setAttr('Names', mainNames?.join(', '))

    dom.selectAll(`Socket[NamesBlock*="${crane}"]`).map(element => {
      let namesBlock = element.getAttr('NamesBlock')?.split(',').map(value => value.trim())
      namesBlock = namesBlock?.filter(value => value !== crane)
      element.setAttr('NamesBlock', namesBlock?.join(', '))
    })
    dom.selectAll(`AddonsShift[Types*="${crane}"]`).map(element => {
      element.remove()
    })

    stateSetter?.(false)
  }

  /**
   * @returns `[hasRUCrane, hasUSCrane]`
   */
  static hasCranes(dom: IXMLElement): [boolean, boolean] {
    return [
      dom.has('Socket[Names*="MinicraneRU"]'),
      dom.has('Socket[Names*="MinicraneUS"]')
    ]
  }
}

export default CranesAction
