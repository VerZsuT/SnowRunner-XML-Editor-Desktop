import $ from '#g/texts/renderer'
import { ViewModel, reactive } from '#r/model-ctrlr'

export default class LoadingModel extends ViewModel {
  @reactive loadedCount = 0
  @reactive allCount = 0
  @reactive percent = 0
  @reactive title = $.LOADING
  @reactive isDownload = false
}
