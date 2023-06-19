import type { SrcType } from '#g/enums'
import type { IItem } from '#g/types'

export default interface IListProps {
  srcType: SrcType
  items: IItem[]
  opened?: boolean
}
