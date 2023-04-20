import helpers from './helpers'

import { ParamType } from '#g/enums'
import { hasItems, isString } from '#g/helpers'
import type {
  GroupTypedProps, IGroupParams,
  IItemGetterProps,
  ITemplateItem,
  TemplateItems,
  TemplateParams
} from '#g/types'
import { getGameText } from '#r/pages/main/editor/templates/helpers'

/**
 * Объединение параметров в раскрывающуюся группу.
 */
class Group implements ITemplateItem<[IGroupParams] | any[]> {
  private label!: GroupTypedProps['label']
  private withCounter!: boolean
  private iconPath?: string
  private providedSelector?: string
  private providedSelectorID?: string
  private children: TemplateItems[]

  constructor(props: string | GroupTypedProps, ...children: TemplateItems[]) {
    this.children = children

    if (isString(props)) {
      this.construct({ label: props })
    }
    else {
      this.construct(props)
    }
  }

  getParams(props: IItemGetterProps): [IGroupParams] | any[] {
    const { formattedSelectors = {}, fileDOM, counter: tNumber, cycleNumber } = props
    let params: TemplateParams = []
    let groupLabel: string | undefined
    let resGroupLabel: string | undefined

    if (isString(this.label)) {
      groupLabel = this.label
    }
    else {
      let labelSelectorID: string | undefined
      let labelExtraSelectorID: string | undefined
      if (Array.isArray(this.label.selector)) {
        labelSelectorID = helpers.getSelectorID(this.label.selector[0])
        labelExtraSelectorID = helpers.getSelectorID(this.label.selector[1])
      }
      else {
        labelSelectorID = helpers.getSelectorID(this.label.selector)
      }

      const $nameElement = fileDOM.select(formattedSelectors[labelSelectorID!])
      const $resNameElement = fileDOM.select(formattedSelectors[labelExtraSelectorID!])

      if (!$nameElement.exists && !$resNameElement.exists) {
        return []
      }

      if (this.label.attribute) {
        if (Array.isArray(this.label.attribute)) {
          resGroupLabel = $resNameElement.getAttr(this.label.attribute[1])
          groupLabel = getGameText($nameElement.getAttr(this.label.attribute[0])!) || $nameElement.getAttr(this.label.attribute[0])
        }
        else {
          groupLabel = getGameText($nameElement.getAttr(this.label.attribute!)!)
        }
      }
      else if (this.label.selector) {
        groupLabel = $nameElement.toHTML()?.split('<')[1].split(' ')[0]
      }
    }

    this.children.forEach(child => {
      params = params.concat(child.getParams({
        providedSelector: this.providedSelectorID,
        formattedSelectors,
        counter: tNumber,
        fileDOM
      }))
    })

    if (this.withCounter) {
      groupLabel += ` ${cycleNumber}`
    }

    if (!hasItems(params)) {
      return []
    }

    return [{
      paramType: ParamType.group,
      groupItems: params,
      groupName: groupLabel,
      resGroupName: resGroupLabel,
      iconName: this.iconPath
    }]
  }

  private construct(props: GroupTypedProps): void {
    this.label = props.label
    this.iconPath = props.iconName
    this.withCounter = props.addCounter ?? false
    this.providedSelector = props.provided
    this.providedSelectorID = helpers.getSelectorID(this.providedSelector)
  }
}

export default Group
