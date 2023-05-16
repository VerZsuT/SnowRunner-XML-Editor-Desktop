import type { IGroupParams } from '#g/types'

interface IGroupProps {
  key: string | number
  item: IGroupParams
  isActive?: boolean
  render?: boolean
}

export default IGroupProps
