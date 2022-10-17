import type { ReactNode } from 'react'

import { Button, Switch, Typography } from 'antd'
import { Bridge } from 'emr-bridge/renderer'
import { afcMemo, reactive } from 'react-afc'

import { ADVANCED_MODE_LABEL, DLC_LABEL, MODS_LABEL, UPDATES_LABEL } from './texts'

import { Language } from '#components/Language'
import { ProgramWindow } from '#enums'
import { SAVE_BUTTON } from '#globalTexts/renderer'
import { handleIPCMessage } from '#helpers/handleIPCMessage'
import { windowReady } from '#helpers/windowReady'
import { config, helpers } from '#services'
import type { IMPC } from '#types'

import './styles'

const bridge = Bridge.as<IMPC>()
const { Text } = Typography
const { settings } = config

const Settings = afcMemo(() => {
  const state = reactive(settings)
  windowReady(ProgramWindow.Settings)
  handleIPCMessage()

  function render(): ReactNode {
    const { updates, DLC, mods, advancedMode } = state

    return <>
      <Language/>
      <div className='checkboxes'>
        <Switch
          size='small'
          onClick={onToggleUpdates}
          checked={updates}
        />
        <Text className='label'>{UPDATES_LABEL}</Text>
        <br/>

        <Switch
          size='small'
          onClick={onToggleDLC}
          checked={DLC}
        />
        <Text className='label'>{DLC_LABEL}</Text>
        <br/>

        <Switch
          size='small'
          onClick={onToggleMods}
          checked={mods}
        />
        <Text className='label'>{MODS_LABEL}</Text>
        <br/>

        <Switch
          size='small'
          onClick={onToggleAdvanced}
          checked={advancedMode}
        />
        <Text className='label'>{ADVANCED_MODE_LABEL}</Text>
      </div>
      <Button
        onClick={saveSettings}
        size='large'
        type='primary'
      >
        {SAVE_BUTTON}
      </Button>
    </>
  }

  function saveSettings(): void {
    config.settings = state
    bridge.relaunchApp()
  }

  function onToggleUpdates(): void {
    state.updates = !state.updates
  }
  function onToggleDLC(): void {
    state.DLC = !state.DLC
  }
  function onToggleMods(): void {
    state.mods = !state.mods
  }
  function onToggleAdvanced(): void {
    state.advancedMode = !state.advancedMode
  }

  return render
})

helpers.renderComponent(<Settings/>)
