import type IItemGetterProps from './IItemGetterProps'

interface ITemplateItem<T = any> {
  getParams(props: IItemGetterProps): T
}

export default ITemplateItem
