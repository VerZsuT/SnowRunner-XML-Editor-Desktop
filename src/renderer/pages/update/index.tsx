import {Button, Typography} from 'antd'
import {Window} from 'enums'
import {windowReady} from 'helpers/windowReady'
import {afc, createState} from 'react-afc'
import {config} from 'scripts/config'
import {render} from 'scripts/helpers'
import {main} from 'scripts/main'

import {updateTexts} from './texts'

import './styles.sass'

const { Title } = Typography
const { updateApp } = main
const { on } = window.ipc
const { settings } = config

const {
    ALLOW_NEW_VERSION_AUTO,
    UPDATE,
    IGNORE,
    CLOSE
} = updateTexts

function closeWindow() {
    window.close()
}

function updateProgram() {
    updateApp()
}

function ignoreUpdate() {
    settings.updates = false
    window.close()
}

const UpdateWindow = afc(() => {
    const [state, setState] = createState({
        version: ''
    })
    windowReady(Window.Update)

    on('content', (_event, data) => setState({ version: data }))
    
    return () => <>
        <Title className='version-title' level={4}>
            {ALLOW_NEW_VERSION_AUTO} {` (v${state.version})`}
        </Title>
        <div className='buttons'>
            <Button type='primary' onClick={updateProgram}>{UPDATE}</Button>
            <Button type='primary' danger onClick={ignoreUpdate}>{IGNORE}</Button>
            <Button onClick={closeWindow}>{CLOSE}</Button>
        </div>
    </>
})

render(<UpdateWindow />)
