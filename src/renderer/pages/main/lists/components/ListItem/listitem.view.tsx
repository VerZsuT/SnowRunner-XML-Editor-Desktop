import { StarFilled } from '@ant-design/icons'
import { Card } from 'antd'
import { afcMemo, useMemo } from 'react-afc'

import $ from '../../texts'
import ListItemController from './listitem.contoller'
import ListItemModel from './listitem.model'
import type IListItemProps from './listitem.props'

import { Config } from '#r/services'

export default afcMemo<IListItemProps>(function ListItem(props) {
  const { Meta } = Card

  const model = new ListItemModel(props)
  const ctrlr = new ListItemController(props, model)

  const containerStyle = { position: 'relative' as const }
  const contextMenuItems = useMemo(() => [
    {
      label: model.isFavorite ? $.REMOVE_FAVORITE : $.ADD_FAVORITE,
      key: 'toggle-favorite',
      onClick: onFavoriteClick
    },
    {
      label: $.EXPORT,
      key: 'export',
      onClick: onExportClick
    }
  ], () => [model.isFavorite, Config.lang])

  return () => {
    if (!model.isShow) return null

    return (
      <div style={containerStyle}>
        <Card
          style={props.style}
          className='card'
          hoverable
          cover={<img height={350} width={250} src={model.imgSrc} />}
          onContextMenu={model.contextMenu.onContext}
          onClick={onCardClick}
        >
          <Meta
            className='card-title'
            title={<>
              {model.title.first}
              <span className='red'>
                {model.title.second}
              </span>
              {model.title.last}
            </>}
          />
          {model.isFavorite &&
            <StarFilled className='fav-star' />
          }
        </Card>
        <model.contextMenu.Component isShow={model.contextMenu.isShow()} items={contextMenuItems.val} />
      </div>
    )
  }

  function onExportClick(): void {
    ctrlr.exportFile()
  }

  function onCardClick(): void {
    ctrlr.openEditor()
  }

  function onFavoriteClick(): void {
    ctrlr.toggleFavorite()
  }
})
