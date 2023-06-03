import { message } from 'antd'

import { actions } from '../../../store'
import type ExtraAction from '../../extraActions/ExtraAction'
import { ImportService, XMLFiles } from '../../services'
import $ from '../../texts'
import type MainHeaderModel from './mainheader.model'
import type IMainHeaderProps from './mainheader.props'

import { Page, PreloadType } from '#g/enums'
import type { IEditorPreload } from '#g/types'
import { ViewController, action } from '#r/model-ctrlr'
import bridge from '#r/scripts/bridge'
import { Preload, System, XML } from '#r/services'

export default class MainHeaderController extends ViewController<IMainHeaderProps, MainHeaderModel> {
  private static preload = Preload.get<IEditorPreload>(PreloadType.editor)

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
      setTimeout(async () => {
        XMLFiles.files.forEach(file => {
          const dom = file.dom.clone()
          dom.selectAll('[SXMLE_ID]').map(element => element.removeAttr('SXMLE_ID'))
          System.writeFileSync(file.path, dom.toHTML()!)
        })

        if (this.props.mod) {
          await bridge.updateFiles(this.props.mod)
        }
        await bridge.updateFiles()

        hideLoading()
        message.success($.SUCCESS_SAVE_FILES)
        resolve()
      }, 100)
    })
  }

  importFile(): void {
    ImportService.importFile(this.props.filePath, this.props.fileDOM, this.props.actions)
  }

  exportFile(): void {
    const pathToSave = bridge.saveEPF(System.basename(this.props.filePath, '.xml'))
    if (!pathToSave) {
      void message.error($.PATH_TO_SAVE_NOT_FOUND)
      return
    }

    const exported = XML.exportToObject({
      filePath: this.props.filePath,
      shortMode: false,
      mod: this.props.mod,
      dlc: this.props.dlc,
      fileDOM: this.props.fileDOM,
      templateItems: this.props.tableItems,
      actions: this.props.actions
    })

    System.writeFileSync(pathToSave, JSON.stringify(exported, null, '\t'))
    void message.success($.WAS_EXPORTED)
  }

  openXMLFile(file: typeof XMLFiles.files[number]): void {
    void bridge.openPath(file.path)
    MainHeaderController.preload.watchFile(file.path, () => window.location.reload())
  }

  goToLists(): void {
    this.route(Page.lists)
  }
}
