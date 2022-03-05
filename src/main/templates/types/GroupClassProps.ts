import type NameType from '../enums/NameType'
import type IGroupClassProps from './IGroupClassProps'

/** Параметры группы. */
type GroupClassProps = IGroupClassProps & ({
    nameType?: NameType.static
    name: IGroupClassProps['name']
} | {
    nameType: NameType.tagName
    nameSelector: IGroupClassProps['nameSelector']
    resNameSelector?: IGroupClassProps['resNameSelector']
} | {
    nameType: NameType.computed
    nameAttribute: IGroupClassProps['nameAttribute']
    resNameAttribute?: IGroupClassProps['resNameAttribute']
    nameSelector: IGroupClassProps['nameSelector']
    resNameSelector?: IGroupClassProps['resNameSelector']
    icon?: IGroupClassProps['icon']
})

export default GroupClassProps
