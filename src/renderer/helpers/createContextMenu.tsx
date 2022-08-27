import type {MouseEvent} from 'react'
import {memo} from 'react'

import type {MenuProps} from 'antd'
import {Menu} from 'antd'
import {createState} from 'react-afc'

interface ContextMenuProps {
    items: MenuProps['items']
    onClose?(): void
    className?: string
    isShow: boolean
}

export function createContextMenu() {
    const [state, setState] = createState({
        isShow: false,
        x: 0,
        y: 0
    })

    function onContextMenu(e: MouseEvent<HTMLElement>) {
        e.preventDefault()
        e.stopPropagation()
        setState({
            isShow: true,
            x: e.clientX,
            y: e.clientY
        })
    }

    function showContextMenu() {
        setState({ isShow: true })
    }

    function hideContextMenu() {
        setState({ isShow: false })
    }

    const ContextMenu = memo((props: ContextMenuProps) => {
        const { x, y, isShow } = state

        const position = {
            top: y,
            left: x
        }

        const { items, onClose, className = '' } = props

        function onAreaClick() {
            setState({ isShow: false })
            onClose?.()
        }

        return (
            <div
                className={`context ${className}`}
                style={{ display: isShow ? 'block' : 'none' }}
                onClick={onAreaClick}
            >
                <Menu
                    className='context-menu'
                    style={{
                        top: position.top,
                        left: position.left
                    }}
                    items={items}
                />
            </div>
        )
    })

    return {
        ContextMenu,
        onContextMenu,
        hideContextMenu,
        showContextMenu,
        contextIsShow: () => state.isShow
    }
}
