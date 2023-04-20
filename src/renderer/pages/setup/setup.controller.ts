import { Modal } from 'antd'
import { useOnMount } from 'react-afc'

import type SetupModel from './setup.model'
import $ from './texts'

import { ProgramWindow } from '#g/enums'
import { handleIPC, handleLocale, windowReady } from '#r/helpers'
import { ViewController } from '#r/model-ctrlr'
import bridge from '#r/scripts/bridge'
import { config, system } from '#r/services'

const paths = bridge.paths
const { confirm } = Modal

class SetupController extends ViewController<{}, SetupModel> {
  constructor(model: SetupModel) {
    super({}, model)

    windowReady(ProgramWindow.Setup)
    handleIPC()
    handleLocale()

    useOnMount(() => {
      setTimeout(this.checkExportedConfig, 300)
    })
  }

  save = (path: string): void => {
    config.initial = path
    void bridge.saveBackup(true)
  }

  nextStep = (): void => {
    this.model.step++
  }

  private checkExportedConfig = (): void => {
    if (system.existsSync(system.join(paths.backupFolder, 'config.json'))) {
      confirm({
        title: $.IMPORT_CONFIG_MESSAGE,
        onOk: () => bridge.importConfig()
      })
    }
  }
}

export default SetupController
