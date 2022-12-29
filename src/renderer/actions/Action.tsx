import type { FC, ReactNode } from 'react'

import { Button, Modal } from 'antd'
import type { CheerioAPI } from 'cheerio'
import { fafc, useOnRender, useState } from 'react-afc'

import type { IActionData, IActionProps } from '#types'

import './styles'

type CreatedActionData = IActionData & Required<Pick<IActionData, 'import' | 'export'>>

abstract class Action {
  data!: CreatedActionData
  Component!: FC<IActionProps>

  protected ActionComponent!: FC<IActionProps>
  protected name = 'no-name'
  protected id: string | number = 'no-id'
  protected minWidth?: number
  protected minHeight?: number
  protected imgSRC?: string

  protected init(): void {
    const data: CreatedActionData = {
      import: (dom, data) => this.onImport(dom, data),
      export: dom => this.onExport(dom),
      isActive: (dom, fileName) => this.isActive(dom, fileName),
      onPressOk: () => this.onPressOk(),
      name: this.name,
      id: this.id,
      minWidth: this.minWidth,
      minHeight: this.minHeight,
      imgSRC: this.imgSRC
    }
    const ActionComponent = this.ActionComponent
    this.data = data

    const Component = fafc<IActionProps>(props => {
      let isClosing = false

      const [isShow, setIsShow] = useState(true)

      useOnRender(() => {
        if (!isClosing)
          setIsShow(true)
        else
          isClosing = false
      })

      function render(): ReactNode {
        return (
          <Modal
            title={data.name}
            open={isShow.val}
            closable={false}
            footer={[
              <Button key='ok' onClick={onOk}>
                OK
              </Button>
            ]}
          >
            <ActionComponent {...props.curr} />
          </Modal>
        )
      }

      function onOk(): void {
        setIsShow(false)
        isClosing = true
        data.onPressOk?.()
      }

      return render
    })

    this.Component = Component
  }

  protected onPressOk(): void {}
  protected onImport(dom: CheerioAPI, data: any): void {}
  protected onExport(dom: CheerioAPI): any { return null }
  protected isActive(dom: CheerioAPI, fileName: string): boolean { return true }
}

export default Action
