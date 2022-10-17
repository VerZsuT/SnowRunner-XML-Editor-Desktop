import type { MouseEvent, ReactNode } from 'react'

import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { afcMemo } from 'react-afc'
import { reactive } from 'react-afc/compatible'

interface ContextMenuProps {
  items: MenuProps['items']
  className?: string
  isShow: boolean

  onClose?(): void
}

export function createContextMenu() {
  const state = reactive({
    isShow: false,
    x: 0, y: 0
  })

  function onContext(e: MouseEvent<HTMLElement>): void {
    e.preventDefault()
    e.stopPropagation()
    state.isShow = true
    state.x = e.clientX
    state.y = e.clientY
  }

  function hide(): void {
    state.isShow = false
  }

  function isShow(): boolean {
    return state.isShow
  }

  const Component = afcMemo((props: ContextMenuProps) => {
    function render(): ReactNode {
      const { items, className = '' } = props
      const { x, y, isShow } = state

      return (
        <div
          className={`context ${className}`}
          style={{ display: isShow ? 'block' : 'none' }}
          onClick={onAreaClick}
        >
          <Menu
            className='context-menu'
            style={{
              top: y,
              left: x
            }}
            items={items}
          />
        </div>
      )
    }

    function onAreaClick(): void {
      state.isShow = false
      props.onClose?.()
    }

    return render
  })

  return {
    Component,
    onContext,
    hide,
    isShow
  }
}
