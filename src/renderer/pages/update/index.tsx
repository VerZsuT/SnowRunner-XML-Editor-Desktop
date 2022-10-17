import type { ReactNode } from 'react'

import { Button, Typography } from 'antd'
import { Bridge } from 'emr-bridge/renderer'
import { afcMemo, reactive } from 'react-afc'

import { ALLOW_NEW_VERSION_AUTO, CLOSE, IGNORE, UPDATE } from './texts'

import { ProgramWindow } from '#enums'
import { windowReady } from '#helpers/windowReady'
import { config, helpers, ipc } from '#services'
import type { IMPC } from '#types'

import './styles'

const bridge = Bridge.as<IMPC>()
const { Title } = Typography
const { settings } = config

const UpdateWindow = afcMemo(() => {
  const state = reactive({
    version: ''
  })
  windowReady(ProgramWindow.Update)
  handleContent()

  function render(): ReactNode {
    return <>
      <Title className='version-title' level={4}>
        {ALLOW_NEW_VERSION_AUTO} {` (v${state.version})`}
      </Title>
      <div className='buttons'>
        <Button type='primary' onClick={updateProgram}>{UPDATE}</Button>
        <Button type='primary' danger onClick={ignoreUpdate}>{IGNORE}</Button>
        <Button onClick={closeWindow}>{CLOSE}</Button>
      </div>
    </>
  }

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
    ipc.on('content', (_event, data) => state.version = data)
  }

  return render
})

helpers.renderComponent(<UpdateWindow/>)
