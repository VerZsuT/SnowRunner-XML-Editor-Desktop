import { Button, Switch, Typography } from 'antd'
import { afc } from 'react-afc'

import SettingsController from './settings.controller'
import SettingsModel from './settings.model'
import $ from './texts'

import { Language } from '#r/components'

import '#r/templateScript'
import './settings.styles'

const { Text } = Typography

function Settings() {
  const model = new SettingsModel()
  const ctrlr = new SettingsController(model)

  return () => {
    const { updates, DLC, mods, advancedMode } = model

    return <>
      <Language />
      <div className='checkboxes'>
        <Switch
          size='small'
          onClick={ctrlr.toggleUpdates}
          checked={updates}
        />
        <Text className='label'>{$.UPDATES_LABEL}</Text>
        <br />

        <Switch
          size='small'
          onClick={ctrlr.toggleDLC}
          checked={DLC}
        />
        <Text className='label'>{$.DLC_LABEL}</Text>
        <br />

        <Switch
          size='small'
          onClick={ctrlr.toggleMods}
          checked={mods}
        />
        <Text className='label'>{$.MODS_LABEL}</Text>
        <br />

        <Switch
          size='small'
          onClick={ctrlr.toggleAdvanced}
          checked={advancedMode}
        />
        <Text className='label'>{$.ADVANCED_MODE_LABEL}</Text>
      </div>
      <Button
        onClick={ctrlr.saveSettings}
        size='large'
        type='primary'
      >
        {$.SAVE_BUTTON}
      </Button>
    </>
  }
}

export default afc(Settings)
