import { Button, Typography } from 'antd'
import { pafc, useState } from 'react-afc'

import $ from './texts'

import { ProgramWindow } from '#enums'
import useWindowReady from '#helpers/useWindowReady'
import bridge from '#r-scripts/bridge'
import { config, helpers, ipc } from '#services'

import '#r/templateScript'
import './styles'

const { Title } = Typography
const { settings } = config

const UpdateWindow = pafc(() => {
  const [version, setVersion] = useState('')
  useWindowReady(ProgramWindow.Update)
  handleContent()

  return () => <>
    <Title className='version-title' level={4}>
      {$.ALLOW_NEW_VERSION_AUTO} {` (v${version.val})`}
    </Title>
    <div className='buttons'>
      <Button type='primary' onClick={updateProgram}>{$.UPDATE}</Button>
      <Button type='primary' danger onClick={ignoreUpdate}>{$.IGNORE}</Button>
      <Button onClick={closeWindow}>{$.CLOSE}</Button>
    </div>
  </>

  function closeWindow(): void {
    window.close()
  }

  function updateProgram(): void {
    bridge.updateApp()
  }

  function ignoreUpdate(): void {
    settings.updates = false
    window.close()
  }

  function handleContent(): void {
    ipc.on('content', (_event, data) => setVersion(data))
  }
})

helpers.renderComponent(<UpdateWindow/>)
