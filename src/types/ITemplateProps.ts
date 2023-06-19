import type TemplateSelectors from './TemplateSelectors'

import type { TemplateType } from '#g/enums'

export default interface ITemplateProps {
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
  selectors?: TemplateSelectors
}
