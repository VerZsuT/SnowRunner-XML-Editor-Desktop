import { Button, Steps } from 'antd'
import { afc } from 'react-afc'

import { GameFolder } from './components'
import SetupController from './setup.controller'
import SetupModel from './setup.model'
import $ from './texts'

import { Header, Language, Menu } from '#r/components'

import '#r/templateScript'
import './setup.styles'

const { Step } = Steps

function Setup() {
  const model = new SetupModel()
  const ctrlr = new SetupController(model)

  const stepsContent = [
    <Language isSetup key='language' />,
    <GameFolder key='game-folder' onChange={onGameFolderChange} />
  ]

  return () => <>
    <Menu />
    <Header text={$.FIRST_STEPS_DESCRIPTION} />

    <Steps className='steps' current={model.step}>
      <Step title={$.LANGUAGE_LABEL} />
      <Step title={$.GAME_DATA_STEP} />
    </Steps>
    <div className='steps-content'>
      {stepsContent[model.step]}
    </div>
    <div className='steps-actions'>
      {model.step < stepsContent.length - 1 && (
        <Button type='primary' onClick={onNextClick}>
          {$.NEXT}
        </Button>
      )}
    </div>
  </>

  function onGameFolderChange(path: string): void {
    ctrlr.save(path)
  }

  function onNextClick(): void {
    ctrlr.nextStep()
  }
}

export default afc(Setup)
