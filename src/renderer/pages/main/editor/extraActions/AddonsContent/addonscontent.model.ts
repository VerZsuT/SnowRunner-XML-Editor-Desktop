import type OptionsType from './OptionsType'

import type { IExtraActionProps, IFindItem } from '#g/types'
import { ViewModel, reactive } from '#r/model-ctrlr'

class AddonsContentModel extends ViewModel<IExtraActionProps> {
  options: OptionsType = []

  @reactive items: IFindItem[] | null = null
  @reactive selectedAddon = ''
  @reactive filter = ''
  @reactive wheels = ''
  @reactive repairs = ''
  @reactive fuel = ''
}

export default AddonsContentModel
