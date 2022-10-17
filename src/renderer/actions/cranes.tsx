import type { ReactNode } from 'react'

import { Button, Typography } from 'antd'
import type { CheerioAPI } from 'cheerio'
import { afcMemo, reactive } from 'react-afc'

import { ADD, CRANE, CRANES_WARN_MESSAGE, CRANES_WARN_TITLE, REMOVE } from './texts'

import CraneIcon from '#images/icons/crane.png'
import { Action } from '#r/actions/Action'
import { localization } from '#services'
import type { IActionProps } from '#types'

const { Paragraph, Text } = Typography

enum Crane {
  RU = 'MinicraneRU',
  US = 'MinicraneUS'
}

interface IExportData {
  hasRUCrane: boolean
  hasUSCrane: boolean
}

export class Cranes extends Action {
  protected name = localization.localize({
    RU: 'Краны',
    EN: 'Cranes',
    DE: 'Kräne',
    CH: '起重机'
  })
  protected id = 'cranes'
  protected minHeight = 180
  protected imgSRC = CraneIcon
  protected ActionComponent = CranesComponent

  constructor() { super(); this.init() }

  protected isActive(dom: CheerioAPI): boolean {
    return Cranes.hasCranes(dom).includes(true)
  }

  protected onExport(dom: CheerioAPI): IExportData {
    const [hasRUCrane, hasUSCrane] = Cranes.hasCranes(dom)
    return { hasRUCrane, hasUSCrane }
  }

  protected onImport(dom: CheerioAPI, data: IExportData): void {
    const [hasRUCrane, hasUSCrane] = Cranes.hasCranes(dom)

    if (data.hasUSCrane && !hasUSCrane) {
      Cranes.addCrane(Crane.US, Crane.RU, dom)
    }

    if (data.hasRUCrane && !hasRUCrane) {
      Cranes.addCrane(Crane.RU, Crane.US, dom)
    }
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

const CranesComponent = afcMemo((props: IActionProps) => {
  const state = reactive({
    hasRU: Cranes.hasCranes(props.dom)[0],
    hasUS: Cranes.hasCranes(props.dom)[1]
  })

  function render(): ReactNode {
    const { hasRU, hasUS } = state

    return <>
      <div className='warn-title'>
        <Paragraph>{CRANES_WARN_TITLE}</Paragraph>
      </div>
      <div className='cranes-warn-cont'>
        <Paragraph>{CRANES_WARN_MESSAGE}</Paragraph>
      </div>

      <div className='grid cranes-grid'>
        <div className='cranes-buttons'>
          <Text>
            US {CRANE}
          </Text><br/>
          {!hasUS
            ? <Button
              disabled={!(hasRU && !hasUS)}
              onClick={addUS}
              type='primary'
            >
              {ADD}
            </Button>
            : <Button
              disabled={!(hasRU && hasUS)}
              onClick={removeUS}
              type='primary'
              danger
            >
              {REMOVE}
            </Button>
          }
        </div>
        <div className='cranes-buttons'>
          <Text>
            RU {CRANE}
          </Text><br/>
          {!hasRU
            ? <Button
              disabled={!(hasUS && !hasRU)}
              onClick={addRU}
              type='primary'
            >
              {ADD}
            </Button>
            : <Button
              disabled={!(hasRU && hasUS)}
              onClick={removeRU}
              type='primary'
              danger
            >
              {REMOVE}
            </Button>
          }
        </div>
      </div>
    </>
  }

  function addUS(): void {
    Cranes.addCrane(Crane.US, Crane.RU, props.dom, hasUS => state.hasUS = hasUS)
  }
  function addRU(): void {
    Cranes.addCrane(Crane.RU, Crane.US, props.dom, hasRU => state.hasRU = hasRU)
  }

  function removeUS(): void {
    Cranes.removeCrane(Crane.US, props.dom, hasUS => state.hasUS = hasUS)
  }
  function removeRU(): void {
    Cranes.removeCrane(Crane.RU, props.dom, hasRU => state.hasRU = hasRU)
  }

  return render
})
