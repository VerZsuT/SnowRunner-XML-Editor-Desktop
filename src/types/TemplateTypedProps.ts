import type { ITemplateProps } from './ITemplateProps'

import type { TemplateType } from '#enums'

export type TemplateTypedProps = ITemplateProps & ({
  type: TemplateType.multiply
  itemSelector: ITemplateProps['itemSelector']
} | {
  type?: TemplateType.single
})
