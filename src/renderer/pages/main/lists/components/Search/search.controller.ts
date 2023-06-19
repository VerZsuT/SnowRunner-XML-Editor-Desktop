import { handleLocale } from '#r/helpers'
import { ViewController, action } from '#r/model-ctrlr'
import { actions } from '#r/pages/main/store'

export default class SearchController extends ViewController {
  @action(actions.changeFilter)
  changeFilter!: typeof actions.changeFilter

  constructor() {
    super()

    handleLocale()
  }
}
