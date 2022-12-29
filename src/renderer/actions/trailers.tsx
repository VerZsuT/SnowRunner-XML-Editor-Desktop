import type { ReactNode } from 'react'

import { Button, Typography } from 'antd'
import type { CheerioAPI } from 'cheerio'
import { fafcMemo, useState } from 'react-afc'

import { ADD, REMOVE, SCOUT_TRAILERS, TRUCK_TRAILERS } from './texts'

import TrailerIcon from '#images/icons/trailer.png'
import Action from '#r/actions/Action'
import { lzn } from '#services'
import type { IActionProps } from '#types'

const { Text } = Typography

enum Trailer {
  scout = 'ScautTrailer',
  truck = 'Trailer'
}

interface ExportData {
  hasScoutTrailer: boolean
  hasTruckTrailer: boolean
}

class Trailers extends Action {
  protected name = lzn.localize({
    RU: 'Прицепы',
    EN: 'Trailers',
    DE: 'Anhänger',
    CH: '拖车'
  })
  protected id = 'trailers'
  protected minHeight = 100
  protected imgSRC = TrailerIcon
  protected ActionComponent = TrailersComponent

  constructor() { super(); this.init() }

  protected isActive(dom: CheerioAPI): boolean {
    return Trailers.hasTrailers(dom).includes(true)
  }

  protected onExport(dom: CheerioAPI): ExportData {
    const [hasScoutTrailer, hasTruckTrailer] = Trailers.hasTrailers(dom)
    return { hasScoutTrailer, hasTruckTrailer }
  }

  protected onImport(dom: CheerioAPI, data: ExportData): void {
    const [hasScoutTrailer, hasTruckTrailer] = Trailers.hasTrailers(dom)

    if (data.hasScoutTrailer && !hasScoutTrailer) {
      Trailers.addTrailer(Trailer.scout, Trailer.truck, dom)
    }

    if (data.hasTruckTrailer && !hasTruckTrailer) {
      Trailers.addTrailer(Trailer.truck, Trailer.scout, dom)
    }
  }

  static addTrailer(trailer: Trailer, to: Trailer, dom: CheerioAPI, stateSetter?: (val: boolean) => void): void {
    const mainSocket = dom(`Socket[Names~="${to}"]`).length ? dom(`Socket[Names~="${to}"]`) : dom(`Socket[Names~="${to},"]`)
    const mainNames = mainSocket.attr('Names')?.split(',').map(value => value.trim())

    mainNames?.push(trailer)
    mainSocket.attr('Names', mainNames?.join(', '))

    dom(`Socket[NamesBlock~="${to}"], Socket[NamesBlock~="${to},"]`).map((_, el) => {
      const namesBlock = dom(el).attr('NamesBlock')?.split(',').map(value => value.trim())
      namesBlock?.push(trailer)
      dom(el).attr('NamesBlock', namesBlock?.join(', '))
    })
    dom(`AddonsShift[Types~="${to}"], AddonsShift[Types~="${to},"]`).map((_, el) => {
      const newShift = el.cloneNode(true)
      let types = dom(newShift).attr('Types')?.split(',').map(value => value.trim())

      types = types?.filter(value => value !== to)
      types?.push(trailer)
      dom(newShift).attr('Types', types?.join(', '))
      dom(el).after(newShift)
    })

    stateSetter?.(true)
  }

  static removeTrailer(trailer: Trailer, dom: CheerioAPI, stateSetter?: (val: boolean) => void): void {
    const mainSocket = dom(`Socket[Names~="${trailer}"]`).length ? dom(`Socket[Names~="${trailer}"]`) : dom(`Socket[Names~="${trailer},"]`)
    let mainNames = mainSocket.attr('Names')?.split(',').map(value => value.trim())

    mainNames = mainNames?.filter(value => value !== trailer)
    mainSocket.attr('Names', mainNames?.join(', '))

    dom(`Socket[NamesBlock~="${trailer}"], Socket[NamesBlock~="${trailer},"]`).map((_, el) => {
      let namesBlock = dom(el).attr('NamesBlock')?.split(',').map(value => value.trim())
      namesBlock = namesBlock?.filter(value => value !== trailer)
      dom(el).attr('NamesBlock', namesBlock?.join(', '))
    })
    dom(`AddonsShift[Types~="${trailer}"], AddonsShift[Types~="${trailer},"]`).map((_, el) => {
      dom(el).remove()
    })

    stateSetter?.(false)
  }

  /**
   * @returns [scout, main]
   */
  static hasTrailers(dom: CheerioAPI): [boolean, boolean] {
    return [
      !!dom('Socket[Names~="ScautTrailer"], Socket[Names~="ScautTrailer,"]').length,
      !!dom('Socket[Names~="Trailer"], Socket[Names~="Trailer,"]').length
    ]
  }
}

const TrailersComponent = fafcMemo<IActionProps>(props => {
  const [hasScout, setHasScout] = useState(Trailers.hasTrailers(props.curr.dom)[0])
  const [hasTruck, setHasTruck] = useState(Trailers.hasTrailers(props.curr.dom)[1])

  function render(): ReactNode {
    return (
      <div className='grid trailers-grid'>
        <div className='trailers-buttons'>
          <Text>{SCOUT_TRAILERS}</Text><br/>
          {!hasScout.val
            ? <Button
              disabled={!(hasTruck.val && !hasScout.val)}
              onClick={addScout}
              type='primary'
            >
              {ADD}
            </Button>
            : <Button
              disabled={!(hasScout.val && hasTruck.val)}
              onClick={removeScout}
              type='primary'
              danger
            >
              {REMOVE}
            </Button>
          }
        </div>
        <div className='trailers-buttons'>
          <Text>{TRUCK_TRAILERS}</Text><br/>
          {!hasTruck.val
            ? <Button
              disabled={!(hasScout.val && !hasTruck.val)}
              onClick={addTruck}
              type='primary'
            >
              {ADD}
            </Button>
            : <Button
              disabled={!(hasScout.val && hasTruck.val)}
              onClick={removeTruck}
              type='primary'
              danger
            >
              {REMOVE}
            </Button>
          }
        </div>
      </div>
    )
  }

  function addScout(): void {
    Trailers.addTrailer(Trailer.scout, Trailer.truck, props.curr.dom, value => setHasScout(value))
  }
  function addTruck(): void {
    Trailers.addTrailer(Trailer.truck, Trailer.scout, props.curr.dom, value => setHasTruck(value))
  }

  function removeScout(): void {
    Trailers.removeTrailer(Trailer.scout, props.curr.dom, value => setHasScout(value))
  }
  function removeTruck(): void {
    Trailers.removeTrailer(Trailer.truck, props.curr.dom, value => setHasTruck(value))
  }

  return render
})


export default Trailers
