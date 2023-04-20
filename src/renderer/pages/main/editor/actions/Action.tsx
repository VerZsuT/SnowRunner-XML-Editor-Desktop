import type { FC } from 'react'

import { Button, Modal } from 'antd'
import { afc, useOnRender, useState } from 'react-afc'

import type { IActionData, IActionProps, IXMLElement } from '#g/types'

import './styles'

type CreatedActionData = IActionData & Required<Pick<IActionData, 'import' | 'export'>>

abstract class Action {
  data!: CreatedActionData
  Component!: FC<IActionProps>

  protected name = 'no-name'
  protected id: string | number = 'no-id'
  protected minWidth?: number
  protected minHeight?: number
  protected imgSRC?: string

  constructor(
    private ActionComponent: FC<IActionProps>
  ) { }

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
    this.data = data

    const ActionComponent = this.ActionComponent
    function Component(props: IActionProps) {
      const [isShow, setIsShow] = useState(true)
      let isClosing = false

      useOnRender(() => {
        if (!isClosing) {
          setIsShow(true)
        }
        else {
          isClosing = false
        }
      })

      function onOk(): void {
        setIsShow(false)
        isClosing = true
        data.onPressOk?.()
      }

      return () => (
        <Modal
          title={data.name}
          open={isShow.val}
          closable={false}
          footer={
            <Button key='ok' onClick={onOk}>
              OK
            </Button>
          }
        >
          <ActionComponent {...props} />
        </Modal>
      )
    }

    this.Component = afc(Component)
  }

  protected onPressOk(): void { }
  protected onImport(dom: IXMLElement, data: any): void { }
  protected onExport(dom: IXMLElement): any { return null }
  protected isActive(dom: IXMLElement, fileName: string): boolean { return true }
}

export default Action
