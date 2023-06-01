import type { IGroupParams } from '#g/types'

interface IGroupProps {
  key: string | number
  item: IGroupParams
  isActive?: boolean
  renderIt?: boolean
}

export default IGroupProps
