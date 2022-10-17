import type { ReactNode } from 'react'

import { LoadingOutlined } from '@ant-design/icons'
import { Progress, Spin, Typography } from 'antd'
import { afcMemo, reactive } from 'react-afc'

import { ProgramWindow } from '#enums'
import { LOADING } from '#globalTexts/renderer'
import { windowReady } from '#helpers/windowReady'
import { helpers, ipc } from '#services'

import './styles'

const { Title, Text } = Typography

const Loading = afcMemo(() => {
  const state = reactive({
    loadedCount: 0,
    allCount: 0,
    percent: 0,
    title: LOADING,
    isDownload: false
  })
  windowReady(ProgramWindow.Loading)
  handleIPC()

  function render(): ReactNode {
    const { title, isDownload, percent, loadedCount, allCount } = state

    return (
      <div className='main'>
        <Title className='title' level={4}>
          {title}
        </Title>

        {isDownload
          ? <>
            <Progress percent={percent}/>
            <div className='grid info'>
              <Text>
                {loadedCount} / {allCount}
              </Text>
            </div>
          </>
          : <Spin
            className='spin'
            indicator={<LoadingOutlined className='spin-icon' spin/>}
          />
        }
      </div>
    )
  }

  function handleIPC(): void {
    ipc.on('success', () => {
      state.percent = 0
      state.loadedCount++
    })
    ipc.on('download', () => state.isDownload = true)
    ipc.on('fileName', (_, title) => state.title = title)
    ipc.on('percent', (_, percent) => state.percent = percent)
    ipc.on('count', (_, allCount) => state.allCount = allCount)
  }

  return render
})

helpers.renderComponent(<Loading/>)
