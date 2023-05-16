import { message } from 'antd'

import { actions } from '../../../store'
import type ExtraAction from '../../extraActions/ExtraAction'
import { importService, xmlFiles } from '../../services'
import $ from '../../texts'
import type MainHeaderModel from './mainheader.model'
import type IMainHeaderProps from './mainheader.props'

import { Page, PreloadType } from '#g/enums'
import type { IEditorPreload } from '#g/types'
import { ViewController, action } from '#r/model-ctrlr'
import bridge from '#r/scripts/bridge'
import { XMLDOM } from '#r/scripts/xml'
import { preload, system, xml } from '#r/services'

const { watchFile } = preload.get<IEditorPreload>(PreloadType.editor)

class MainHeaderController extends ViewController<IMainHeaderProps, MainHeaderModel> {
  @action(actions.route)
  private route!: typeof actions.route

  changeAction(newAction: ExtraAction): void {
    this.model.action = <newAction.Component
      filePath={this.props.filePath}
      currentMod={this.props.mod}
      dom={this.props.fileDOM}
    />
  }

  reset(): void {
    this.props.resetList.forEach(callback => callback())
    void message.success($.SUCCESS_RESET)
  }

  async save() {
    const hideLoading = message.loading($.SAVING_MESSAGE)
    await new Promise<void>(resolve => {
      setTimeout(() => {
        xmlFiles.files.forEach(file => {
          const dom = XMLDOM.fromString(file.dom.toHTML()!)
          dom.selectAll('[SXMLE_ID]').map(element => element.removeAttr('SXMLE_ID'))
          system.writeFileSync(file.path, dom.toHTML())
        })

        this.props.mod && bridge.updateFiles(this.props.mod)
        bridge.updateFiles()

        hideLoading()
        message.success($.SUCCESS_SAVE_FILES)
        resolve()
      }, 100)
    })
  }

  importFile(): void {
    importService.importFile(this.props.filePath, this.props.fileDOM, this.props.actions)
  }

  exportFile(): void {
    const pathToSave = bridge.saveEPF(system.basename(this.props.filePath, '.xml'))
    if (!pathToSave) {
      void message.error($.PATH_TO_SAVE_NOT_FOUND)
      return
    }

    const exported = xml.exportToObject({
      filePath: this.props.filePath,
      shortMode: false,
      mod: this.props.mod,
      dlc: this.props.dlc,
      fileDOM: this.props.fileDOM,
      templateItems: this.props.tableItems,
      actions: this.props.actions
    })

    system.writeFileSync(pathToSave, JSON.stringify(exported, null, '\t'))
    void message.success($.WAS_EXPORTED)
  }

  openXMLFile(file: typeof xmlFiles.files[number]): void {
    void bridge.openPath(file.path)
    watchFile(file.path, () => window.location.reload())
  }

  goToLists(): void {
    this.route(Page.lists)
  }
}

export default MainHeaderController
