import { Button, Modal, Steps } from 'antd'
import { pafc, useOnMount, useState } from 'react-afc'

import GameFolder from './components/GameFolder'
import $ from './texts'

import Header from '#components/Header'
import Language from '#components/Language'
import Menu from '#components/Menu'
import { ProgramWindow } from '#enums'
import useIPCMessage from '#helpers/useIPCMessage'
import useWindowReady from '#helpers/useWindowReady'
import bridge from '#r-scripts/bridge'
import { config, helpers, system } from '#services'

import '#r/templateScript'
import './styles'

const paths = bridge.paths
const { Step } = Steps
const { confirm } = Modal

const Setup = pafc(() => {
  const stepsContent = [
    <Language isSetup key='language'/>,
    <GameFolder key='game-folder' onChange={onSave}/>
  ]

  const [step, setStep] = useState(0)
  useWindowReady(ProgramWindow.Setup)
  useIPCMessage()

  useOnMount(() => {
    setTimeout(checkExportedConfig, 300)
  })

  return () => <>
    <Menu/>
    <Header text={$.FIRST_STEPS_DESCRIPTION}/>

    <Steps className='steps' current={step.val}>
      <Step title={$.LANGUAGE_LABEL}/>
      <Step title={$.GAME_DATA_STEP}/>
    </Steps>
    <div className='steps-content'>
      {stepsContent[step.val]}
    </div>
    <div className='steps-actions'>
      {step.val < stepsContent.length - 1 && (
        <Button type='primary' onClick={onNext}>
          {$.NEXT}
        </Button>
      )}
    </div>
  </>

  function onSave(path: string): void {
    config.initial = path
    void bridge.saveBackup(true)
  }

  function onNext(): void {
    setStep(step.val + 1)
  }

  function checkExportedConfig(): void {
    if (system.existsSync(system.join(paths.backupFolder, 'config.json'))) {
      confirm({
        title: $.IMPORT_CONFIG_MESSAGE,
        onOk: () => bridge.importConfig()
      })
    }
  }
})

helpers.renderComponent(<Setup/>)
