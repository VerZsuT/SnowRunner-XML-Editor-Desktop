import {ONLY_FOR_SELECTOR} from 'consts'
import {NameType, ParamType} from 'enums'
import {getGameText} from 'templates/service'
import type {GroupGetter, GroupParams, GroupTypedProps, ItemGetterProps, TemplateItems, TemplateParams} from 'types'

import {getSelectorID} from './helpers'

/**
 * Объединение параметров в раскрывающуюся группу.
 * @param props имя или параметры группы.
 * @param children
 */
export function Group(props: string | GroupTypedProps, children: TemplateItems[]): GroupGetter {
    if (typeof props === 'string')
        return _Group({ label: props }, children)
    else
        return _Group(props, children)
}

function _Group(props: GroupTypedProps, children: TemplateItems[]): GroupGetter {
    const {
        label = ONLY_FOR_SELECTOR,
        iconName: iconPath,
        provided: providedSelector,
        addCounter: withCounter = false
    } = props
    const providedSelectorID = getSelectorID(providedSelector)

    return (props: ItemGetterProps): [GroupParams] | any[] => {
        const { formattedSelectors, fileDOM, tNumber, cycleNumber } = props
        let params: TemplateParams = []
        let groupLabel: string
        let resGroupLabel: string

        if (typeof label === 'string') {
            groupLabel = label
        }
        else {
            let labelSelectorID: string
            let labelExtraSelectorID: string
            if (Array.isArray(label.selector)) {
                labelSelectorID = getSelectorID(label.selector[0])
                labelExtraSelectorID = getSelectorID(label.selector[1])
            }
            else {
                labelSelectorID = getSelectorID(label.selector)
            }

            const $nameElement = fileDOM(formattedSelectors[labelSelectorID])
            const $resNameElement = fileDOM(formattedSelectors[labelExtraSelectorID])

            if ($nameElement.length === 0 && $resNameElement.length === 0)
                return []

            if (label.type === NameType.computed) {
                if (Array.isArray(label.attribute)) {
                    resGroupLabel = $resNameElement.attr(label.attribute[1])
                    groupLabel = getGameText($nameElement.attr(label.attribute[0])) || $nameElement.attr(label.attribute[0])
                }
                else {
                    groupLabel = getGameText($nameElement.attr(label.attribute))
                }
            }
            else if (label.type === NameType.tagName) {
                groupLabel = $nameElement.html().split('<')[1].split(' ')[0]
            }
        }

        children.forEach(childGetter => {
            params = params.concat(childGetter({
                providedSelector: providedSelectorID,
                formattedSelectors,
                tNumber,
                fileDOM
            }))
        })

        if (withCounter)
            groupLabel += ` ${cycleNumber}`

        if (label === ONLY_FOR_SELECTOR)
            return params

        if (!params.length)
            return []

        return [<GroupParams>{
            paramType: ParamType.group,
            groupItems: params,
            groupName: groupLabel,
            resGroupName: resGroupLabel,
            iconName: iconPath
        }]
    }
}
