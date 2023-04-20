import type GameFolderProps from './gamefolder.props'

import type { ISetupPreload } from '#g/types'
import { handleLocale } from '#r/helpers'
import { ViewController } from '#r/model-ctrlr'
import { preload } from '#r/services'

const { getInitialPak, getGameFolder } = preload.get<ISetupPreload>()

class GameFolderController extends ViewController<GameFolderProps> {
  constructor(props: GameFolderProps) {
    super(props)

    handleLocale()
  }

  getPak(): void {
    const data = getInitialPak()
    if (!data) return

    data.folder = data.initial
    this.props.onChange(data.initial)
  }

  getFolder(): void {
    const data = getGameFolder()
    if (!data) return

    this.props.onChange(data.initial)
  }
}

export default GameFolderController
