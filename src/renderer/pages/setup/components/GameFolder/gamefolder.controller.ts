import type GameFolderProps from './gamefolder.props'

import type { ISetupPreload } from '#g/types'
import { handleLocale } from '#r/helpers'
import { ViewController } from '#r/model-ctrlr'
import { Preload } from '#r/services'

export default class GameFolderController extends ViewController<GameFolderProps> {
  private readonly preload = Preload.get<ISetupPreload>()

  constructor(props: GameFolderProps) {
    super(props)

    handleLocale()
  }

  getPak(): void {
    const data = this.preload.getInitialPak()
    if (!data) return

    data.folder = data.initial
    this.props.onChange(data.initial)
  }

  getFolder(): void {
    const data = this.preload.getGameFolder()
    if (!data) return

    this.props.onChange(data.initial)
  }
}
