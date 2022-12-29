import type { ReactNode } from 'react'

import { FileFilled, FolderFilled } from '@ant-design/icons'
import { Button } from 'antd'
import { fafcMemo } from 'react-afc'
import type { FastProps } from 'react-afc/types'

import { GAME_FOLDER_LABEL } from '../texts'

import { preload } from '#services'
import type { ISetupPreload } from '#types'

const { getInitialPak, getGameFolder } = preload.get<ISetupPreload>()

type Props = {
  onChange(path: string): void
}

function GameFolder(props: FastProps<Props>) {
  function render(): ReactNode {
    return (
      <div className='game-folder'>
        <Button
          className='folder-button'
          type='primary'
          icon={<FolderFilled/>}
          size='large'
          onClick={onFolderClick}
        >
          {GAME_FOLDER_LABEL}
        </Button>
        <Button
          type='primary'
          icon={<FileFilled/>}
          size='large'
          onClick={onPakClick}
        >
          initial.pak
        </Button>
      </div>
    )
  }

  function onFolderClick(): void {
    getFolder(props.curr.onChange)
  }

  function onPakClick(): void {
    getPak(props.curr.onChange)
  }

  function getPak(callback: Props['onChange']): void {
    const data = getInitialPak()
    if (!data) return

    data.folder = data.initial
    callback(data.initial)
  }

  function getFolder(callback: Props['onChange']): void {
    const data = getGameFolder()
    if (!data) return

    callback(data.initial)
  }

  return render
}

export default fafcMemo(GameFolder)
