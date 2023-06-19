import { Modal } from 'antd'
import { useOnMount } from 'react-afc'

import type SetupModel from './setup.model'
import $ from './texts'

import { ProgramWindow } from '#g/enums'
import { handleIPC, handleLocale, handleNotification, windowReady } from '#r/helpers'
import { ViewController } from '#r/model-ctrlr'
import Bridge from '#r/scripts/bridge'
import { Config, System } from '#r/services'

export default class SetupController extends ViewController<{}, SetupModel> {
  private readonly paths = Bridge.paths

  constructor(model: SetupModel) {
    super({}, model)

    windowReady(ProgramWindow.Setup)
    handleIPC()
    handleLocale()
    handleNotification()

    useOnMount(() => {
      setTimeout(this.checkExportedConfig, 300)
    })
  }

  save = async (path: string) => {
    Config.initial = path
    await Bridge.saveBackup()
    await Bridge.unpackMain()
    Bridge.relaunchApp()
  }

  nextStep = (): void => {
    this.model.step++
  }

  private checkExportedConfig = (): void => {
    if (System.existsSync(System.join(this.paths.backupFolder, 'config.json'))) {
      Modal.confirm({
        okText: $.OK, cancelText: $.CANCEL,
        title: $.IMPORT_CONFIG_MESSAGE,
        onOk: () => Bridge.importConfig(),
        style: { marginTop: -60 }
      })
    }
  }
}
