import type { CSSProperties } from 'react'

import type { Category } from '#g/enums'
import type { IItem } from '#g/types'

interface IListItemProps {
  item: IItem
  type: Category
  style: CSSProperties
  listId: string
  modId?: string
  dlc?: string
}

export default IListItemProps