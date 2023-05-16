import { Button, Typography } from 'antd'
import { afc } from 'react-afc'

import $ from './texts'
import UpdateWindowController from './update.controller'
import UpdateWindowModel from './update.model'

import '#r/templateScript'
import './update.styles'

const { Title } = Typography

function UpdateWindow() {
  const model = new UpdateWindowModel()
  const ctrlr = new UpdateWindowController(model)

  return () => <>
    <Title className='version-title' level={4}>
      {$.ALLOW_NEW_VERSION_AUTO} {` (v${model.version})`}
    </Title>
    <div className='buttons'>
      <Button type='primary' onClick={ctrlr.updateProgram}>{$.UPDATE}</Button>
      <Button type='primary' danger onClick={ctrlr.ignoreUpdate}>{$.IGNORE}</Button>
      <Button onClick={ctrlr.closeWindow}>{$.CLOSE}</Button>
    </div>
  </>
}

export default afc(UpdateWindow)
