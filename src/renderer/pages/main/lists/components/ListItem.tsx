import type { CSSProperties, ReactNode } from 'react'

import { StarFilled } from '@ant-design/icons'
import { Card, message } from 'antd'
import { afcMemo, memoized, useRedux } from 'react-afc'
import { useActions } from 'react-afc/compatible'

import { selectFilter } from '../../store/filterSlice'
import { editor } from '../services/editor'
import { images } from '../services/images'
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../texts'

import type { Category } from '#enums'
import { Page } from '#enums'
import { EXPORT, SUCCESS_EXPORT_MESSAGE } from '#globalTexts/renderer'
import { createContextMenu } from '#helpers/createContextMenu'
import { actions } from '#pages/main/store'
import { config, xml } from '#services'
import type { IItem } from '#types'

const { Meta } = Card

type Props = {
  item: IItem
  type: Category
  style: CSSProperties
  listId: string
  modId?: string
  dlc?: string
}

export const ListItem = afcMemo((props: Props) => {
  const containerStyle = { position: 'relative' as const }
  const fileDOM = xml.getDOM(props.item.path)
  const name = xml.getName(props.item, fileDOM)
  const imgSrc = images.getSrc(props.type, props.item, fileDOM)
  const contextMenu = createContextMenu()

  const store = useRedux({
    filter: selectFilter
  })

  function render(): ReactNode {
    const title = getTitle()
    if (!isShow()) return null

    return (
      <div style={containerStyle}>
        <Card
          style={props.style}
          className='card'
          hoverable
          cover={<img height={350} width={250} src={imgSrc}/>}
          onContextMenu={contextMenu.onContext}
          onClick={openEditor}
        >
          <Meta
            className='card-title'
            title={typeof title === 'string'
              ? title
              : <>
                {title.first}
                <span className='red'>
                  {title.second}
                </span>
                {title.last}
              </>
            }
          />
          {isFavorite() &&
            <StarFilled className='fav-star'/>
          }
        </Card>
        <contextMenu.Component isShow={contextMenu.isShow()} items={getContextMenuItems()}/>
      </div>
    )
  }

  const { toggleFavorite, route } = useActions(actions)

  function exportFile(): void {
    const { item, modId, dlc } = props

    const isSuccess = xml.exportFile({
      filePath: item.path,
      shortMode: false,
      mod: modId,
      dlc
    }, item.name)
  
    contextMenu.hide()   
    if (isSuccess) {
      void message.success(SUCCESS_EXPORT_MESSAGE)
    }
  }

  function openEditor(): void {
    const { item, type, listId } = props

    editor.setStorageValues(item, type, listId)
    contextMenu.hide()
    route(Page.editor)
  }

  function toggle(): void {
    contextMenu.hide()
    toggleFavorite(props.item.name)
  }

  function isFavorite(): boolean {
    return config.favorites.includes(props.item.name)
  }

  const getContextMenuItems = memoized(() => [
    {
      label: isFavorite() ? REMOVE_FAVORITE : ADD_FAVORITE,
      key: 'toggle-favorite',
      onClick: toggle
    },
    {
      label: EXPORT,
      key: 'export',
      onClick: exportFile
    }
  ],
  () => [isFavorite()])

  const isShow = memoized((): boolean => {
    if (!store.filter) return true
    return name.toLowerCase().includes(store.filter.toLowerCase())
  }, () => [store.filter, name])

  const getTitle = memoized(() => {
    if (!store.filter) return name

    const firstIndex = name.toLowerCase().indexOf(store.filter.toLowerCase())
    const lastIndex = firstIndex + store.filter.length

    return {
      first: name.slice(0, firstIndex),
      second: name.slice(firstIndex, lastIndex),
      last: name.slice(lastIndex, name.length)
    }
  }, () => [store.filter, name])

  return render
})
