import type { ITemplateSelectors } from './ITemplateSelectors'

import type { TemplateType } from '#enums'

export interface ITemplateProps {
  /**
   * Тип шаблона.
   *
   * @default TemplateType.single
   */
  type?: TemplateType
  /**
   * Селектор итерируемых элементов.
   *
   * Работает только при {@link type}=`TemplateType.multiply`
   */
  itemSelector?: string
  /**
   * Селекторы, используемые у потомков шаблона.
   *
   * Устанавливается у `root` шаблона.
   */
  selectors?: ITemplateSelectors
}
