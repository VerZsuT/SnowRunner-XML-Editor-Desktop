import { actions } from '../../../store'

import { Page } from '#g/enums'
import { ViewController, action } from '#r/model-ctrlr'

export default class ErrorHeaderController extends ViewController {
  @action(actions.route)
  private route!: typeof actions.route

  goToLists(): void {
    this.route(Page.lists)
  }
}
