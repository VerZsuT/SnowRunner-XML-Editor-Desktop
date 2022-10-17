import type { IItemGetterProps } from './IItemGetterProps'

export interface ITemplateItem<T = any> {
  getParams(props: IItemGetterProps): T
}
