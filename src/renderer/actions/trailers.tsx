import type { ReactNode } from 'react'

import { Button, Typography } from 'antd'
import type { CheerioAPI } from 'cheerio'
import { afcMemo, reactive } from 'react-afc'

import { ADD, REMOVE, SCOUT_TRAILERS, TRUCK_TRAILERS } from './texts'

import TrailerIcon from '#images/icons/trailer.png'
import { Action } from '#r/actions/Action'
import { localization } from '#services'
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

export class Trailers extends Action {
  protected name = localization.localize({
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

const TrailersComponent = afcMemo((props: IActionProps) => {
  const state = reactive({
    hasScout: Trailers.hasTrailers(props.dom)[0],
    hasTruck: Trailers.hasTrailers(props.dom)[1]
  })

  function render(): ReactNode {
    const { hasScout, hasTruck } = state

    return (
      <div className='grid trailers-grid'>
        <div className='trailers-buttons'>
          <Text>{SCOUT_TRAILERS}</Text><br/>
          {!hasScout
            ? <Button
              disabled={!(hasTruck && !hasScout)}
              onClick={addScout}
              type='primary'
            >
              {ADD}
            </Button>
            : <Button
              disabled={!(hasScout && hasTruck)}
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
          {!hasTruck
            ? <Button
              disabled={!(hasScout && !hasTruck)}
              onClick={addTruck}
              type='primary'
            >
              {ADD}
            </Button>
            : <Button
              disabled={!(hasScout && hasTruck)}
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
    Trailers.addTrailer(Trailer.scout, Trailer.truck, props.dom, hasScout => state.hasScout = hasScout)
  }
  function addTruck(): void {
    Trailers.addTrailer(Trailer.truck, Trailer.scout, props.dom, hasTruck => state.hasTruck = hasTruck)
  }

  function removeScout(): void {
    Trailers.removeTrailer(Trailer.scout, props.dom, hasScout => state.hasScout = hasScout)
  }
  function removeTruck(): void {
    Trailers.removeTrailer(Trailer.truck, props.dom, hasTruck => state.hasTruck = hasTruck)
  }

  return render
})
