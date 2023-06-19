import type IItemGetterProps from './IItemGetterProps'

export default interface ITemplateItem<T = any> {
  getParams(props: IItemGetterProps): T
}
