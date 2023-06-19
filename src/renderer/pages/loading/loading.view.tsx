import { LoadingOutlined } from '@ant-design/icons'
import { Progress, Spin, Typography } from 'antd'
import { afc } from 'react-afc'

import LoadingController from './loading.controller'
import LoadingModel from './loading.model'

import '#r/templateScript'
import './loading.styles'

export default afc(function Loading() {
  const { Title, Text } = Typography

  const model = new LoadingModel()
  new LoadingController(model)

  return () => {
    const { title, isDownload, percent, loadedCount, allCount } = model

    return (
      <div className='main'>
        <Title className='title' level={4}>
          {title}
        </Title>

        {isDownload
          ? <>
            <Progress percent={percent} />
            <div className='grid info'>
              <Text>
                {loadedCount} / {allCount}
              </Text>
            </div>
          </>
          : <Spin
            className='spin'
            indicator={<LoadingOutlined className='spin-icon' spin />}
          />
        }
      </div>
    )
  }
})
