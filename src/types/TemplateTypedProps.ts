import type ITemplateProps from './ITemplateProps'

import type { TemplateType } from '#g/enums'

type TemplateTypedProps =
  (Omit<ITemplateProps, 'type' | 'itemSelector'> & {
    type: TemplateType.multiply
    itemSelector: ITemplateProps['itemSelector']
  }) | (Omit<ITemplateProps, 'type'> & {
    type?: TemplateType.single
  })

export default TemplateTypedProps
