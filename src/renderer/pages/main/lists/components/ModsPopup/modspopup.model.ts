import type IModsPopupProps from './modspopup.props'

import type { IFindItem } from '#g/types'
import { prop, reactive, ViewModel } from '#r/model-ctrlr'
import $ from '../../texts'

class ModsPopupModel extends ViewModel<IModsPopupProps> {
  readonly titles = [$.FOUND_ITEMS, $.ADDED_ITEMS]

  @prop<IModsPopupProps>('show')
  readonly show!: IModsPopupProps['show']

  @reactive items: IFindItem[] | undefined = undefined
  @reactive targetKeys: string[] = []
  @reactive selectedKeys: string[] = []
}

export default ModsPopupModel
