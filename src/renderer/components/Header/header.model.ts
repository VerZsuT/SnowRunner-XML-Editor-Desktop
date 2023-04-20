import type HeaderProps from './header.props'

import { prop, ViewModel } from '#r/model-ctrlr'

class HeaderModel extends ViewModel<HeaderProps> {
  @prop<HeaderProps>('text')
  readonly text!: string
}

export default HeaderModel
