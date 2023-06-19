import Editor from '../editor'
import Lists from '../lists'
import { selectPage } from '../store/pageSlice'

import { Page } from '#g/enums'
import { ViewModel, redux } from '#r/model-ctrlr'

export default class MainModel extends ViewModel {
  get currentPage() {
    return this.pages[this.page]
  }

  @redux(selectPage)
  private page!: ReturnType<typeof selectPage>

  private readonly pages = {
    [Page.lists]: Lists,
    [Page.editor]: Editor
  }
}
