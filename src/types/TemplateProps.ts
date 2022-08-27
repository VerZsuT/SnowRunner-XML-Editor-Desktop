import type {TemplateType} from 'enums'

import type {TemplateSelectors} from './TemplateSelectors'

export interface TemplateProps {
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
