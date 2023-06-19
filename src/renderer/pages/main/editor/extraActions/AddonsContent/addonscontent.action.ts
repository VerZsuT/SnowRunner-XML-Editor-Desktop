import ExtraAction from '../ExtraAction'
import type AddonsContentComponent from './addonscontent.view'

import WrenchIcon from '#g/images/icons/wrench.png'
import { localizeVal } from '#g/texts/renderer'

export default class AddonsContentAction extends ExtraAction {
  protected name = localizeVal({
    RU: 'Содержимое аддонов',
    EN: 'Addons content',
    DE: 'Addon-Inhalt',
    CH: '附加组件的内容'
  }).val
  protected id = 'addons-content'
  protected minHeight = 200
  protected minWidth = 350
  protected imgSRC = WrenchIcon

  constructor(component: typeof AddonsContentComponent) { super(component); this.init() }
}
