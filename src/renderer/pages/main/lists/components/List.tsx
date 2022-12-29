import type { CSSProperties, ReactNode } from 'react'
import { memo } from 'react'

import { Button, Modal } from 'antd'
import { Bridge } from 'emr-bridge/renderer'
import { fafcMemo, useForceUpdate, useOnDestroy, useRedux, useState } from 'react-afc'
import type { FastProps } from 'react-afc/types'
import type { GridChildComponentProps } from 'react-window'
import { FixedSizeGrid } from 'react-window'

import { selectFilter } from '../../store/filterSlice'
import { selectCategory, selectFavorites } from '../../store/listSlice'
import { MODS_CHANGE_BUTTON, RELAUNCH_PROMPT } from '../texts'
import ListItem from './ListItem'
import ModsPopup from './ModsPopup'

import { LIST_SCROLL } from '#consts'
import type { Category } from '#enums'
import { SrcType } from '#enums'
import { config, storage, windowResize } from '#services'
import type { IItem, MPC } from '#types'

const bridge = Bridge.as<MPC>()
const { confirm } = Modal
const { settings } = config

type Props = {
  srcType: SrcType
  items: IItem[]
  opened?: boolean
}

function List(props: FastProps<Props>) {
  const reloadPromptTimeout = 200
  const colWidth = 250
  const rowHeight = 420
  const id = `list-${props.curr.srcType}`

  const [isShowMods, setIsShowMods] = useState(false)
  const store = useRedux({
    filter: selectFilter,
    favorites: selectFavorites,
    category: selectCategory
  })

  useOnDestroy(() => {
    windowResize.removeListener(update)
  })

  function render(): ReactNode {
    const { srcType, opened } = props.curr
    const { category } = store

    if (
      (srcType === SrcType.mods && !settings.mods)
      || (srcType === SrcType.dlc && !settings.DLC)
      || !opened
    ) return

    const filteredItems = filterItems()
    const {
      colCount,
      gridHeight,
      gridWidth,
      gutter,
      rowCount
    } = getGridParams(filteredItems.length)

    return (
      <div className='list' id={id}>
        {srcType === SrcType.mods && <>
          <div>
            <Button
              type='primary'
              className='mods-button'
              onClick={showModsPopup}
            >
              {MODS_CHANGE_BUTTON}
            </Button>
          </div>
          <ModsPopup
            show={isShowMods.val}
            hidePopup={hideModsPopup}
          />
        </>}
        <FixedSizeGrid
          initialScrollTop={parseInt(storage.pop(LIST_SCROLL) || '0')}
          className='card-list'
          columnCount={colCount}
          columnWidth={colWidth}
          height={gridHeight}
          width={gridWidth}
          rowHeight={rowHeight}
          rowCount={rowCount}
        >
          {(props: GridChildComponentProps, index: number) => (
            <ItemRenderer
              style={props.style}
              columnIndex={props.columnIndex}
              rowIndex={props.rowIndex}
              gutter={gutter}
              items={filteredItems}
              category={category}
              id={id}
              colCount={colCount}
              key={index}
            />
          )}
        </FixedSizeGrid>
      </div>
    )
  }

  const forceUpdate = useForceUpdate()

  function filterItems(): IItem[] {
    const { items, srcType } = props.curr
    const { favorites, filter } = store
    let filteredItems = items

    if (srcType === SrcType.favorites) {
      filteredItems = filteredItems.filter(value => favorites.includes(value.name))
    }

    if (filter) {
      filteredItems = filteredItems.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
    }

    return filteredItems
  }

  function getGridParams(itemsLength: number) {
    const gridHeight = window.innerHeight - (props.curr.srcType === SrcType.mods ? 230 : 210)
    const gridWidth = window.innerWidth
    let colCount = Math.floor(window.innerWidth / colWidth)
    const rowCount = Math.ceil(itemsLength / colCount)
    if (itemsLength < colCount) colCount = itemsLength
    const gutter = Math.round((gridWidth - (colCount * colWidth)) / (colCount + 1))

    return { gridHeight, gridWidth, colCount, rowCount, gutter }
  }

  function update(): void {
    forceUpdate()
  }

  function showModsPopup(): void {
    setIsShowMods(true)
  }

  function hideModsPopup(isReload?: boolean): void {
    setIsShowMods(false)
    if (isReload) {
      setTimeout(() => {
        confirm({
          title: RELAUNCH_PROMPT,
          onOk: () => bridge.relaunchApp()
        })
      }, reloadPromptTimeout)
    }
  }

  return render
}

type ItemProps = {
  style: CSSProperties
  rowIndex: number
  columnIndex: number
  items: IItem[]
  category: Category
  id: string
  gutter: number
  colCount: number
}

const ItemRenderer = memo((props: ItemProps) => {
  const { colCount, style, rowIndex, columnIndex, category, items, id, gutter } = props
  const index = columnIndex + colCount * (rowIndex)

  if (items.length <= index) return null

  const item = items[index]
  const itemStyle = {
    ...style,
    top: Number(style.top) + 10,
    left: Number(style.left) + gutter * (columnIndex + 1)
  }

  return (
    <ListItem
      style={itemStyle}
      item={item}
      type={category}
      listId={id}
      modId={item.modId}
      dlc={item.dlcName}
    />
  )
})

export default fafcMemo(List)
