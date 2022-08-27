import type {TemplateType} from 'enums'

import type {TemplateProps} from './TemplateProps'

export type TemplateTypedProps = TemplateProps & ({
    type: TemplateType.multiply
    itemSelector: TemplateProps['itemSelector']
} | {
    type?: TemplateType.single
})
