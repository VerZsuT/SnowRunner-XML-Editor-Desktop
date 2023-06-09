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
import Bridge from '#r/scripts/bridge'
import { Config, Preload, System, XML } from '#r/services'

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
    await new Promise<void>(async resolve => {
      XMLFiles.files.forEach(file => {
        const dom = file.dom.clone()
        dom.selectAll('[SXMLE_ID]').map(element => element.removeAttr('SXMLE_ID'))
        System.writeFileSync(file.path, dom.toHTML()!)
      })

      if (this.props.mod) {
        await Bridge.updateFiles(this.props.mod)
      }
      await Bridge.updateFiles()

      XMLFiles.files.forEach(file => {
        if (!XMLFiles.edited.includes(file.path)) return

        const edited = Config.edited
        if (edited.find(item => item.path === file.path)) return
        Config.edited = [...edited, { path: file.path, mod: file.mod, dlc: file.dlc }]
      })
      hideLoading()
      message.success($.SUCCESS_SAVE_FILES)
      resolve()
    })
  }

  importFile(): void {
    ImportService.importFile(this.props.filePath, this.props.fileDOM, this.props.actions)
  }

  exportFile(): void {
    const pathToSave = Bridge.saveEPF(System.basename(this.props.filePath, '.xml'))
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
    void Bridge.openPath(file.path)
    MainHeaderController.preload.watchFile(file.path, () => window.location.reload())
  }

  goToLists(): void {
    this.route(Page.lists)
  }
}
