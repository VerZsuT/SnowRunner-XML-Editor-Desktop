import type TemplateType from '../enums/TemplateType'
import type TTemplateClassProps from './TTemplateClassProps'

type TemplateClassProps = TTemplateClassProps & ({
    type: TemplateType.multiply
    itemSelector: TTemplateClassProps['itemSelector']
} | {
    type?: TemplateType.single
})

export default TemplateClassProps
