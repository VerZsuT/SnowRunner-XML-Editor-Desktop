import { memo } from 'react'

import ListItem from '../../ListItem'
import type IItemRendererProps from './itemrenderer.props'

export default memo<IItemRendererProps>(function ItemRendererView(props) {
  const { colCount, style, rowIndex, columnIndex, category, items, id, gutter } = props
  const index = columnIndex + colCount * (rowIndex)

  if (items.length <= index) {
    return null
  }

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
