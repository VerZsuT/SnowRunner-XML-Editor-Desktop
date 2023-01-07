import Action from '../Action'
import type AddonsContentComponent from './component'

import WrenchIcon from '#images/icons/wrench.png'
import { lzn } from '#services'

class AddonsContentAction extends Action {
  protected name = lzn.localize({
    RU: 'Содержимое аддонов',
    EN: 'Addons content',
    DE: 'Addon-Inhalt',
    CH: '附加组件的内容'
  })
  protected id = 'addons-content'
  protected minHeight = 200
  protected minWidth = 350
  protected imgSRC = WrenchIcon

  constructor(component: typeof AddonsContentComponent) { super(component); this.init() }
}

export default AddonsContentAction
