import type HeaderProps from './header.props'

import { prop, ViewModel } from '#r/model-ctrlr'

export default class HeaderModel extends ViewModel<HeaderProps> {
  @prop<HeaderProps>('text')
  readonly text!: string
}
