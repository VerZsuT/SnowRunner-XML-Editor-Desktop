import { ViewModel, redux } from '#r/model-ctrlr'
import { selectFilter } from '#r/pages/main/store/filterSlice'

class SearchModel extends ViewModel {
  @redux(selectFilter)
  readonly filter!: ReturnType<typeof selectFilter>
}

export default SearchModel
