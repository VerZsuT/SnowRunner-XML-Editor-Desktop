import helpers from './helpers'

import { ParamType } from '#enums'
import { isString } from '#gl-helpers'
import { getGameText } from '#templates/service'
import type {
  GroupTypedProps, IGroupParams,
  IItemGetterProps,
  ITemplateItem,
  TemplateItems,
  TemplateParams
} from '#types'

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

  constructor(
    props: string | GroupTypedProps,
    ...children: TemplateItems[]
  ) {
    this.children = children
    
    if (isString(props))
      this.construct({ label: props })
    else
      this.construct(props)
  }

  public getParams(props: IItemGetterProps): [IGroupParams] | any[] {
    const { formattedSelectors = {}, fileDOM, tNumber, cycleNumber } = props
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

      const $nameElement = fileDOM(formattedSelectors[labelSelectorID!])
      const $resNameElement = fileDOM(formattedSelectors[labelExtraSelectorID!])

      if ($nameElement.length === 0 && $resNameElement.length === 0)
        return []

      if (this.label.attribute) {
        if (Array.isArray(this.label.attribute)) {
          resGroupLabel = $resNameElement.attr(this.label.attribute[1])
          groupLabel = getGameText($nameElement.attr(this.label.attribute[0])!) || $nameElement.attr(this.label.attribute[0])
        }
        else {
          groupLabel = getGameText($nameElement.attr(this.label.attribute!)!)
        }
      }
      else if (this.label.selector) {
        groupLabel = $nameElement.html()?.split('<')[1].split(' ')[0]
      }
    }

    this.children.forEach(child => {
      params = params.concat(child.getParams({
        providedSelector: this.providedSelectorID,
        formattedSelectors,
        tNumber,
        fileDOM
      }))
    })

    if (this.withCounter)
      groupLabel += ` ${cycleNumber}`

    if (!params.length)
      return []

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
