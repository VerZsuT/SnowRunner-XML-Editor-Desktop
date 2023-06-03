import type { IGroupParams } from '#g/types'

export default interface IGroupProps {
  key: string | number
  item: IGroupParams
  isActive?: boolean
  renderIt?: boolean
}
