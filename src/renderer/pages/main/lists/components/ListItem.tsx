import type { CSSProperties } from 'react'

import { StarFilled } from '@ant-design/icons'
import { Card, message } from 'antd'
import { afcMemo, useActions, useMemo, useRedux } from 'react-afc'

import { selectFilter } from '../../store/filterSlice'
import editor from '../services/editor'
import images from '../services/images'
import $ from '../texts'

import type { Category } from '#enums'
import { Page } from '#enums'
import { isString } from '#gl-helpers'
import useContextMenu from '#helpers/useContextMenu'
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

function ListItem(props: Props) {
  const containerStyle = { position: 'relative' as const }
  const fileDOM = xml.getDOM(props.item.path)
  const name = xml.getName(props.item, fileDOM)
  const imgSrc = images.getSrc(props.type, props.item, fileDOM)
  const contextMenu = useContextMenu()

  const store = useRedux({
    filter: selectFilter
  })
  
  const { toggleFavorite, route } = useActions(actions)

  const getContextMenuItems = useMemo(() => [
    {
      label: isFavorite() ? $.REMOVE_FAVORITE : $.ADD_FAVORITE,
      key: 'toggle-favorite',
      onClick: toggle
    },
    {
      label: $.EXPORT,
      key: 'export',
      onClick: exportFile
    }
  ],
  () => [isFavorite()])

  const isShow = useMemo((): boolean => {
    if (!store.filter) return true
    return name.toLowerCase().includes(store.filter.toLowerCase())
  }, () => [store.filter, name])

  const getTitle = useMemo(() => {
    if (!store.filter) return name

    const firstIndex = name.toLowerCase().indexOf(store.filter.toLowerCase())
    const lastIndex = firstIndex + store.filter.length

    return {
      first: name.slice(0, firstIndex),
      second: name.slice(firstIndex, lastIndex),
      last: name.slice(lastIndex, name.length)
    }
  }, () => [store.filter, name])

  return () => {
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
            title={isString(title)
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

  function exportFile(): void {
    const { item, modId, dlc } = props

    const isSuccess = xml.exportFile({
      filePath: item.path,
      shortMode: false,
      mod: modId,
      dlc
    }, item.name)
  
    contextMenu.hide()   
    if (isSuccess)
      void message.success($.SUCCESS_EXPORT_MESSAGE)
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
}

export default afcMemo(ListItem)
