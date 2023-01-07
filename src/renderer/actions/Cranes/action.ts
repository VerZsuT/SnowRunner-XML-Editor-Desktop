import type { CheerioAPI } from 'cheerio'

import type CranesComponent from './component'
import Crane from './Crane'

import CraneIcon from '#images/icons/crane.png'
import Action from '#r/actions/Action'
import { lzn } from '#services'

type ExportData = {
  hasRUCrane: boolean
  hasUSCrane: boolean
}

class CranesAction extends Action {
  protected name = lzn.localize({
    RU: 'Краны',
    EN: 'Cranes',
    DE: 'Kräne',
    CH: '起重机'
  })
  protected id = 'cranes'
  protected minHeight = 180
  protected imgSRC = CraneIcon

  constructor(component: typeof CranesComponent) { super(component); this.init() }

  protected isActive(dom: CheerioAPI): boolean {
    return CranesAction.hasCranes(dom).includes(true)
  }

  protected onExport(dom: CheerioAPI): ExportData {
    const [hasRUCrane, hasUSCrane] = CranesAction.hasCranes(dom)
    return { hasRUCrane, hasUSCrane }
  }

  protected onImport(dom: CheerioAPI, data: ExportData): void {
    const [hasRUCrane, hasUSCrane] = CranesAction.hasCranes(dom)

    if (data.hasUSCrane && !hasUSCrane)
      CranesAction.addCrane(Crane.US, Crane.RU, dom)

    if (data.hasRUCrane && !hasRUCrane)
      CranesAction.addCrane(Crane.RU, Crane.US, dom)
  }

  static addCrane(crane: Crane, to: Crane, dom: CheerioAPI, stateSetter?: (val: boolean) => void): void {
    const mainSocket = dom(`Socket[Names*="${to}"]`)
    const mainNames = mainSocket.attr('Names')?.split(',').map(value => value.trim())

    mainNames?.push(crane)
    mainSocket.attr('Names', mainNames?.join(', '))

    dom(`Socket[NamesBlock*="${to}"]`).map((_, el) => {
      const namesBlock = dom(el).attr('NamesBlock')?.split(',').map(value => value.trim())
      namesBlock?.push(crane)
      dom(el).attr('NamesBlock', namesBlock?.join(', '))
    })
    dom(`AddonsShift[Types*="${to}"]`).map((_, el) => {
      const newShift = el.cloneNode(true)
      let types = dom(newShift).attr('Types')?.split(',').map(value => value.trim())

      types = types?.filter(value => value !== to)
      types?.push(crane)
      dom(newShift).attr('Types', types?.join(', '))
      dom(el).after(newShift)
    })

    stateSetter?.(true)
  }

  static removeCrane(crane: Crane, dom: CheerioAPI, stateSetter?: (val: boolean) => void): void {
    const mainSocket = dom(`Socket[Names*="${crane}"]`)
    let mainNames = mainSocket.attr('Names')?.split(',').map(value => value.trim())

    mainNames = mainNames?.filter(value => value !== crane)
    mainSocket.attr('Names', mainNames?.join(', '))

    dom(`Socket[NamesBlock*="${crane}"]`).map((_, el) => {
      let namesBlock = dom(el).attr('NamesBlock')?.split(',').map(value => value.trim())
      namesBlock = namesBlock?.filter(value => value !== crane)
      dom(el).attr('NamesBlock', namesBlock?.join(', '))
    })
    dom(`AddonsShift[Types*="${crane}"]`).map((_, el) => {
      dom(el).remove()
    })

    stateSetter?.(false)
  }

  /**
   * @returns `[hasRUCrane, hasUSCrane]`
   */
  static hasCranes(dom: CheerioAPI): [boolean, boolean] {
    return [
      !!dom('Socket[Names*="MinicraneRU"]').length,
      !!dom('Socket[Names*="MinicraneUS"]').length
    ]
  }
}

export default CranesAction
