import type { ReactNode } from 'react'

import type IMainHeaderProps from './mainheader.props'
import type MenuItemsType from './MenuItemsType'

import type { IXMLElement } from '#g/types'
import { lastItem } from '#g/utils'
import { reactive, ViewModel } from '#r/model-ctrlr'
import { config, helpers } from '#r/services'

class MainHeaderModel extends ViewModel<IMainHeaderProps> {
  menuItems: MenuItemsType = []
  @reactive action: ReactNode = null

  readonly mod = this.props.mod
  readonly actions = this.props.actions
  readonly advancedMode = config.settings.advancedMode
  readonly title = this.getMainTitle(this.props.fileDOM, this.props.filePath, this.props.mod)

  private getMainTitle(DOM: IXMLElement, path: string, modName: string): string {
    if (DOM.has('GameData UiDesc')) {
      const text = DOM.select('GameData UiDesc').getAttr('UiName')
      return helpers.getGameText(text, modName) ?? text ?? 'TITLE_ERROR'
    }

    if (path.split('/').length !== 1) {
      const a = path.split('/')
      return helpers.prettyString(lastItem(a).replace('.xml', '')).toUpperCase()
    }

    const a = path.split('\\')
    return helpers.prettyString(lastItem(a).replace('.xml', '')).toUpperCase()
  }
}

export default MainHeaderModel
