import { ViewModel, redux } from '#r/model-ctrlr'
import { selectFilter } from '#r/pages/main/store/filterSlice'

export default class SearchModel extends ViewModel {
  @redux(selectFilter)
  readonly filter!: ReturnType<typeof selectFilter>
}
