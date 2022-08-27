import {FileFilled, FolderFilled} from '@ant-design/icons'
import {Button} from 'antd'
import {afcMemo} from 'react-afc'
import {getPreload} from 'scripts/getPreload'
import type {SetupPreload} from 'types'

import {setupTexts} from '../texts'

const { GAME_FOLDER_LABEL } = setupTexts

const { getInitialPak, getGameFolder } = getPreload<SetupPreload>()

interface Props {
    onChange(path: string): void
}

function getPak(callback: Props['onChange']) {
    const data = getInitialPak()
    if (!data) return

    data.folder = data.initial

    callback(data.initial)
}

function getFolder(callback: Props['onChange']) {
    const data = getGameFolder()
    if (!data) return

    callback(data.initial)
}

export const GameFolder = afcMemo<Props>(props => {
    function onFolderClick() {
        getFolder(props.onChange)
    }

    function onPakClick() {
        getPak(props.onChange)
    }

    return () => (
        <div className='game-folder'>
            <Button
                className='folder-button'
                type='primary'
                icon={<FolderFilled />}
                size='large'
                onClick={onFolderClick}
            >
                {GAME_FOLDER_LABEL}
            </Button>
            <Button
                type='primary'
                icon={<FileFilled />}
                size='large'
                onClick={onPakClick}
            >
                initial.pak
            </Button>
        </div>
    )
})
