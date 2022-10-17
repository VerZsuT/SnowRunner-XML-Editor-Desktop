import type { FC, ReactNode } from 'react'

import { Button, Modal } from 'antd'
import type { CheerioAPI } from 'cheerio'
import { afc, onRender, reactive } from 'react-afc'

import type { IActionData, IActionProps } from '#types'

import './styles'

type CreatedActionData = {
  import(): void
  export(): any
} & IActionData

export abstract class Action {
  data!: CreatedActionData
  Component!: FC<IActionProps>

  protected ActionComponent!: FC<IActionProps>
  protected name = 'no-name'
  protected id: string | number = 'no-id'
  protected minWidth?: number
  protected minHeight?: number
  protected imgSRC?: string

  protected init(): void {
    const data = {
      import: (dom, data) => this.onImport(dom, data),
      export: dom => this.onExport(dom),
      isActive: (dom, fileName) => this.isActive(dom, fileName),
      onPressOk: () => this.onPressOk(),
      name: this.name,
      id: this.id,
      minWidth: this.minWidth,
      minHeight: this.minHeight,
      imgSRC: this.imgSRC
    } as CreatedActionData
    const ActionComponent = this.ActionComponent
    this.data = data

    const Component = afc((props: IActionProps) => {
      let isClosing = false

      const state = reactive({
        isShow: true
      })

      onRender(() => {
        if (!isClosing) {
          state.isShow = true
        }
        else {
          isClosing = false
        }
      })

      function render(): ReactNode {
        return (
          <Modal
            title={data.name}
            open={state.isShow}
            closable={false}
            footer={[
              <Button key='ok' onClick={onOk}>
                OK
              </Button>
            ]}
          >
            <ActionComponent {...props} />
          </Modal>
        )
      }

      function onOk(): void {
        state.isShow = false
        isClosing = true
        data.onPressOk?.()
      }

      return render
    })

    this.Component = Component
  }

  protected onPressOk(): void { }
  protected onImport(dom: CheerioAPI, data: any): void { }
  protected onExport(dom: CheerioAPI): any { return null }
  protected isActive(dom: CheerioAPI, fileName: string): boolean { return true }
}
