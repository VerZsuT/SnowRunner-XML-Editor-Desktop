import type { ReactNode } from 'react'

import { FileFilled, FolderFilled } from '@ant-design/icons'
import { Button } from 'antd'
import { afcMemo } from 'react-afc'

import { GAME_FOLDER_LABEL } from '../texts'

import { preload } from '#services'
import type { ISetupPreload } from '#types'

const { getInitialPak, getGameFolder } = preload.get<ISetupPreload>()

type Props = {
  onChange(path: string): void
}

export const GameFolder = afcMemo((props: Props) => {
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
    getFolder(props.onChange)
  }

  function onPakClick(): void {
    getPak(props.onChange)
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
})
