import { getFileData } from './helpers/getFileData'
import { getFileInfo } from './helpers/getFileInfo'
import { getResetProvider } from './helpers/getResetProvider'

import { ViewModel } from '#r/model-ctrlr'

class EditorModel extends ViewModel {
  readonly fileInfo = getFileInfo()
  readonly fileData = getFileData(this.fileInfo.filePath)
  readonly resetProvider = getResetProvider()
  readonly hasError = this.fileData.fileDOM.has('error')
}

export default EditorModel
