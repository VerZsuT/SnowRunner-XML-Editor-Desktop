import { actions } from '../store'
import type EditorModel from './editor.model'
import { importService, xmlFiles } from './services'

import { FileType, Page } from '#g/enums'
import type { IXMLElement, IXMLTemplate } from '#g/types'
import { addEventListener, handleIPC, handleKey } from '#r/helpers'
import { ViewController, action } from '#r/model-ctrlr'

class EditorController extends ViewController<{}, EditorModel> {
  @action(actions.route)
  private route!: typeof actions.route

  constructor(model: EditorModel) {
    super({}, model)

    const { filePath, mod, dlc } = model.fileInfo
    const { fileDOM, actions: fileActions } = model.fileData

    this.allowDropImport(filePath, fileDOM, fileActions)
    handleIPC()
    handleKey('Escape', () => {
      this.route(Page.lists)
    })
    xmlFiles.add({
      mod, dlc,
      path: filePath,
      dom: fileDOM,
      type: FileType.truck
    }, true)
  }

  private allowDropImport(filePath: string, fileDOM: IXMLElement, actions: IXMLTemplate['actions']): void {
    addEventListener(window, 'drop', event => {
      event.preventDefault()
      importService.importFile(filePath, fileDOM, actions, event.dataTransfer?.files[0].path)
    })
    addEventListener(window, 'dragover', event => {
      event.preventDefault()
    })
  }
}

export default EditorController
