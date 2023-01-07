import type HeaderProps from './propsType'

class HeaderModel {
  get title(): string {
    return this.props.text
  }

  constructor(
    private props: HeaderProps
  ) {}
}

export default HeaderModel
