import type { SrcType } from '#g/enums'
import type { IItem } from '#g/types'

interface IListProps {
  srcType: SrcType
  items: IItem[]
  opened?: boolean
}

export default IListProps
