import type { MouseEvent, ReactNode } from 'react'

import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { fafcMemo } from 'react-afc'
import { useReactive } from 'react-afc/compatible'

interface ContextMenuProps {
  items: MenuProps['items']
  className?: string
  isShow: boolean

  onClose?(): void
}

function useContextMenu() {
  const state = useReactive({
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

  const Component = fafcMemo<ContextMenuProps>(props => {
    function render(): ReactNode {
      const { items, className = '' } = props.curr
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
      props.curr.onClose?.()
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

export default useContextMenu
