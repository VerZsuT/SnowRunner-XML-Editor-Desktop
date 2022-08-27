import {Button, Modal, Steps} from 'antd'
import {Header} from 'components/Header'
import {Language} from 'components/Language'
import {Menu} from 'components/Menu'
import {Window} from 'enums'
import {globalTexts} from 'globalTexts/renderer'
import {handleIPCMessage} from 'helpers/handleIPCMessage'
import {windowReady} from 'helpers/windowReady'
import {afc, afterDraw, createState} from 'react-afc'
import {config} from 'scripts/config'
import {render} from 'scripts/helpers'
import {main} from 'scripts/main'

import {GameFolder} from './components/GameFolder'
import {setupTexts} from './texts'

import './styles.sass'

const { Step } = Steps
const { confirm } = Modal

const { importConfig, paths, saveBackup } = main
const { existsSync, join } = window.service
const {
    FIRST_STEPS_DESCRIPTION,
    IMPORT_CONFIG_MESSAGE,
    GAME_DATA_STEP,
    NEXT
} = setupTexts
const { LANGUAGE_LABEL } = globalTexts

function checkExportedConfig() {
    if (existsSync(join(paths.backupFolder, 'config.json'))) {
        confirm({
            title: IMPORT_CONFIG_MESSAGE,
            onOk: () => importConfig()
        })
    }
}

const Setup = afc(() => {
    const [state, setState] = createState({
        current: 0
    })
    windowReady(Window.Setup)
    handleIPCMessage()

    afterDraw(() => {
        setTimeout(checkExportedConfig, 300)
    })

    function onSave(path: string) {
        config.initial = path
        saveBackup(true)
    }

    function onNext() {
        setState({ current: state.current + 1 })
    }

    const stepsContent = [
        <Language isSetup key='language' />,
        <GameFolder key='game-folder' onChange={onSave} />
    ]

    return () => {
        const { current } = state

        return <>
            <Menu />
            <Header text={FIRST_STEPS_DESCRIPTION} />

            <Steps className='steps' current={current}>
                <Step title={LANGUAGE_LABEL} />
                <Step title={GAME_DATA_STEP} />
            </Steps>
            <div className='steps-content'>
                {stepsContent[current]}
            </div>
            <div className='steps-actions'>
                {current < stepsContent.length - 1 && (
                    <Button type='primary' onClick={onNext}>
                        {NEXT}
                    </Button>
                )}
            </div>
        </>
    }
})

render(<Setup />)
