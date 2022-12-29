import type { ReactNode } from 'react'

import { LoadingOutlined } from '@ant-design/icons'
import { Progress, Spin, Typography } from 'antd'
import { pafc, useReactive } from 'react-afc'

import { ProgramWindow } from '#enums'
import { LOADING } from '#globalTexts/renderer'
import useWindowReady from '#helpers/useWindowReady'
import { helpers, ipc } from '#services'

import '#r/templateScript'
import './styles'

const { Title, Text } = Typography

const Loading = pafc(() => {
  const state = useReactive({
    loadedCount: 0,
    allCount: 0,
    percent: 0,
    title: LOADING,
    isDownload: false
  })
  useWindowReady(ProgramWindow.Loading)
  useIPC()

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

  function useIPC(): void {
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
