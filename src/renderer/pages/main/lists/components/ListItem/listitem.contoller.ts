import { message } from 'antd'

import { editorService } from '../../services'
import $ from '../../texts'
import type ListItemModel from './listitem.model'
import type IListItemProps from './listitem.props'

import { Page } from '#g/enums'
import { handleLocale } from '#r/helpers'
import { ViewController, action } from '#r/model-ctrlr'
import { actions } from '#r/pages/main/store'
import { xml } from '#r/services'

class ListItemController extends ViewController<IListItemProps, ListItemModel> {
  @action(actions.toggleFavorite)
  private reduxToggleFavorite!: typeof actions.toggleFavorite

  @action(actions.route)
  private route!: typeof actions.route

  constructor(props: IListItemProps, model: ListItemModel) {
    super(props, model)

    handleLocale()
  }

  exportFile(): void {
    const { item, modId, dlc } = this.props

    const isSuccess = xml.exportFile({
      filePath: item.path,
      shortMode: false,
      mod: modId,
      dlc
    }, item.name)

    this.model.contextMenu.hide()
    if (isSuccess) {
      void message.success($.SUCCESS_EXPORT_MESSAGE)
    }
  }

  openEditor(): void {
    const { item, type, listId } = this.props

    editorService.setStorageValues(item, type, listId)
    this.model.contextMenu.hide()
    this.route(Page.editor)
  }

  toggleFavorite(): void {
    this.model.contextMenu.hide()
    this.reduxToggleFavorite(this.props.item.name)
  }
}

export default ListItemController
