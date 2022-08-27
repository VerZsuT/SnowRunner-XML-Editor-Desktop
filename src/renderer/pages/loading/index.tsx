import {LoadingOutlined} from '@ant-design/icons'
import {Progress, Spin, Typography} from 'antd'
import {Window} from 'enums'
import {globalTexts} from 'globalTexts/renderer'
import {windowReady} from 'helpers/windowReady'
import {afc, createState} from 'react-afc'
import {render} from 'scripts/helpers'

import './styles.sass'

const { Title, Text } = Typography
const { on } = window.ipc
const { LOADING } = globalTexts

const Loading = afc(() => {
    const [state, setState] = createState({
        loadedCount: 0,
        allCount: 0,
        percent: 0,
        title: LOADING,
        isDownload: false
    })

    windowReady(Window.Loading)

    on('download', () => setState({ isDownload: true }))
    on('success', () => {
        setState({
            percent: 0,
            loadedCount: state.loadedCount + 1
        })
    })
    on('fileName', (_, msg) => setState({ title: msg }))
    on('percent', (_, msg) => setState({ percent: +msg }))
    on('count', (_, msg) => setState({ allCount: +msg }))

    return () => {
        const { title, isDownload, percent, loadedCount, allCount } = state

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

render(<Loading />)
