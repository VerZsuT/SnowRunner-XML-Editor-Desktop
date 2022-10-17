import type { ReactNode } from 'react'

import { Button, Modal, Steps } from 'antd'
import { Bridge } from 'emr-bridge/renderer'
import { afcMemo, onMount, reactive } from 'react-afc'

import { GameFolder } from './components/GameFolder'
import { FIRST_STEPS_DESCRIPTION, GAME_DATA_STEP, IMPORT_CONFIG_MESSAGE, NEXT } from './texts'

import { Header } from '#components/Header'
import { Language } from '#components/Language'
import { Menu } from '#components/Menu'
import { ProgramWindow } from '#enums'
import { LANGUAGE_LABEL } from '#globalTexts/renderer'
import { handleIPCMessage } from '#helpers/handleIPCMessage'
import { windowReady } from '#helpers/windowReady'
import { config, helpers, system } from '#services'
import type { IMPC } from '#types'

import './styles'

const bridge = Bridge.as<IMPC>()
const paths = bridge.paths
const { Step } = Steps
const { confirm } = Modal

const Setup = afcMemo(() => {
  const stepsContent = [
    <Language isSetup key='language'/>,
    <GameFolder key='game-folder' onChange={onSave}/>
  ]

  const state = reactive({
    step: 0
  })
  windowReady(ProgramWindow.Setup)
  handleIPCMessage()

  onMount(() => {
    setTimeout(checkExportedConfig, 300)
  })

  function render(): ReactNode {
    const { step } = state

    return <>
      <Menu/>
      <Header text={FIRST_STEPS_DESCRIPTION}/>

      <Steps className='steps' current={step}>
        <Step title={LANGUAGE_LABEL}/>
        <Step title={GAME_DATA_STEP}/>
      </Steps>
      <div className='steps-content'>
        {stepsContent[step]}
      </div>
      <div className='steps-actions'>
        {step < stepsContent.length - 1 && (
          <Button type='primary' onClick={onNext}>
            {NEXT}
          </Button>
        )}
      </div>
    </>
  }

  function onSave(path: string): void {
    config.initial = path
    void bridge.saveBackup(true)
  }

  function onNext(): void {
    state.step++
  }

  function checkExportedConfig(): void {
    if (system.existsSync(system.join(paths.backupFolder, 'config.json'))) {
      confirm({
        title: IMPORT_CONFIG_MESSAGE,
        onOk: () => bridge.importConfig()
      })
    }
  }

  return render
})

helpers.renderComponent(<Setup/>)
