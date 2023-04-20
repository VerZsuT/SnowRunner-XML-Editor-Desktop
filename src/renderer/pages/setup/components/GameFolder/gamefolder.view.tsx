import { FileFilled, FolderFilled } from '@ant-design/icons'
import { Button } from 'antd'
import { afcMemo } from 'react-afc'

import $ from '../../texts'
import GameFolderController from './gamefolder.controller'
import type GameFolderProps from './gamefolder.props'

function GameFolderView(props: GameFolderProps) {
  const ctrlr = new GameFolderController(props)

  return () => (
    <div className='game-folder'>
      <Button
        className='folder-button'
        type='primary'
        icon={<FolderFilled />}
        size='large'
        onClick={onFolderClick}
      >
        {$.GAME_FOLDER_LABEL}
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

  function onFolderClick(): void {
    ctrlr.getFolder()
  }

  function onPakClick(): void {
    ctrlr.getPak()
  }
}

export default afcMemo(GameFolderView)
