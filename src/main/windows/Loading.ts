import {Window} from 'enums'
import type {CreateWindowAttributes, DownloadWindow} from 'types'

import {webpackEntries} from '../scripts/webpackEntries'
import {createWindow, wins} from '../scripts/windows'
import {regWindow} from './winsObject'

const createArgs: CreateWindowAttributes = {
    path: webpackEntries.loading,
    preload: webpackEntries.loadingPreload,
    width: 280,
    minWidth: 280,
    height: 130,
    minHeight: 150,
    frame: false,
    type: Window.Loading
}

regWindow(Window.Loading, async () => {
    const loading = <DownloadWindow>createWindow(createArgs)

    function postMessage(channel: string, arg: any) {
        wins.loading.webContents.postMessage(channel, arg)
    }

    loading.setText = (text: string) => postMessage('fileName', text)
    loading.setCount = (count: number) => postMessage('count', count)
    loading.setPercent = (percent: string | number) => postMessage('percent', percent)
    loading.success = () => postMessage('success', true)
    loading.download = () => postMessage('download', true)
    loading.showAndWait = () => {
        return new Promise<void>(resolve => {
            loading.show()
            setTimeout(resolve, 100)
        })
    }

    return wins.loading = loading
})
