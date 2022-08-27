import {Button, Switch, Typography} from 'antd'
import {Language} from 'components/Language'
import {Window} from 'enums'
import {globalTexts} from 'globalTexts/renderer'
import {handleIPCMessage} from 'helpers/handleIPCMessage'
import {windowReady} from 'helpers/windowReady'
import {afc, createState} from 'react-afc'
import {config} from 'scripts/config'
import {render} from 'scripts/helpers'
import {main} from 'scripts/main'

import {settingsTexts} from './texts'

import './styles.sass'

const { Text } = Typography
const { settings } = config
const { relaunchApp } = main

const {
    UPDATES_LABEL,
    DLC_LABEL,
    MODS_LABEL,
    ADVANCED_MODE_LABEL
} = settingsTexts
const { SAVE_BUTTON } = globalTexts

const Settings = afc(() => {
    const [state, setState] = createState(settings)
    handleIPCMessage()
    windowReady(Window.Settings)

    function saveSettings() {
        config.settings = state
        relaunchApp()
    }

    const onToggleUpdates = () => setState({ updates: !state.updates })
    const onToggleDLC = () => setState({ DLC: !state.DLC })
    const onToggleMods = () => setState({ mods: !state.mods })
    const onToggleAdvanced = () => setState({ advancedMode: !state.advancedMode })

    return () => {
        const { updates, DLC, mods, advancedMode } = state

        return <>
            <Language />
            <div className='checkboxes'>
                <Switch
                    size='small'
                    onClick={onToggleUpdates}
                    checked={updates}
                />
                <Text className='label'>{UPDATES_LABEL}</Text>
                <br />

                <Switch
                    size='small'
                    onClick={onToggleDLC}
                    checked={DLC}
                />
                <Text className='label'>{DLC_LABEL}</Text>
                <br />

                <Switch
                    size='small'
                    onClick={onToggleMods}
                    checked={mods}
                />
                <Text className='label'>{MODS_LABEL}</Text>
                <br />

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
})

render(<Settings />)
