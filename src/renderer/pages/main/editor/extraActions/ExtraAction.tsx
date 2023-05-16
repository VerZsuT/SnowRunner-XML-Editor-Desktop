import type { FC } from 'react'

import { Button, Modal } from 'antd'
import { afc, useOnRender, useState } from 'react-afc'

import type { IExtraActionData, IExtraActionProps, IXMLElement } from '#g/types'

import './styles'

type CreatedExtraActionData = IExtraActionData & Required<Pick<IExtraActionData, 'import' | 'export'>>

abstract class ExtraAction {
  data!: CreatedExtraActionData
  Component!: FC<IExtraActionProps>

  protected name = 'no-name'
  protected id: string | number = 'no-id'
  protected minWidth?: number
  protected minHeight?: number
  protected imgSRC?: string

  constructor(
    private ExtraActionComponent: FC<IExtraActionProps>
  ) { }

  protected init(): void {
    const data: CreatedExtraActionData = {
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

    const ExtraActionComponent = this.ExtraActionComponent
    function Component(props: IExtraActionProps) {
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
          <ExtraActionComponent {...props} />
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

export default ExtraAction
