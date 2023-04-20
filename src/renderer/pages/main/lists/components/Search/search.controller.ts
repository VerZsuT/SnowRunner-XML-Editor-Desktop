import { handleLocale } from '#r/helpers'
import { ViewController, action } from '#r/model-ctrlr'
import { actions } from '#r/pages/main/store'

class SearchController extends ViewController {
  @action(actions.changeFilter)
  changeFilter!: typeof actions.changeFilter

  constructor() {
    super()

    handleLocale()
  }
}

export default SearchController
