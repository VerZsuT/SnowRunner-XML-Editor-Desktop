import type { CSSProperties } from 'react'

import type { Category } from '#g/enums'
import type { IItem } from '#g/types'

export default interface IItemRendererProps {
  style: CSSProperties
  rowIndex: number
  columnIndex: number
  items: IItem[]
  category: Category
  id: string
  gutter: number
  colCount: number
}
