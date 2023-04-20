import { ID_ATTRIBUTE, SELECTOR_SEPARATOR, SelPrefix, genAttributeValue } from '../service'
import helpers from './helpers'

import { TemplateType } from '#g/enums'
import { lastItem } from '#g/helpers'
import type {
  IItemGetterProps, ITemplateItem,
  ITemplateProps, TemplateItems,
  TemplateParams, TemplateSelectors,
  TemplateTypedProps
} from '#g/types'

/**
 * Шаблон таблицы параметров. Может иметь вложенные под-шаблоны.
 */
class Template implements ITemplateItem<TemplateParams> {
  private type!: TemplateType
  private selectors!: TemplateSelectors
  private itemSelector?: string
  private itemSelectorID?: string
  private children: TemplateItems[]

  constructor(
    props: TemplateSelectors | TemplateTypedProps,
    ...children: TemplateItems[]
  ) {
    const construct = (props: ITemplateProps): void => {
      this.type = props.type ?? TemplateType.single
      this.selectors = props.selectors ?? {}
      this.itemSelector = props.itemSelector
      this.itemSelectorID = helpers.getSelectorID(this.itemSelector)
    }

    this.children = children

    if (props.type || props.itemSelector) {
      construct(props)
    }
    else {
      construct({ selectors: props as TemplateSelectors })
    }
  }

  getParams(props: IItemGetterProps): TemplateParams | never {
    const {
      providedSelector,
      fileDOM,
      tCount = 1,
      formattedSelectors = this.selectors,
      multiply = (this.type === TemplateType.multiply)
    } = props

    let { counter = 1 } = props
    let params: TemplateParams = []
    const resultSelectors: TemplateSelectors = {}
    for (const selector in formattedSelectors) {
      if (formattedSelectors[selector].includes(SELECTOR_SEPARATOR)) {
        formattedSelectors[selector] = formattedSelectors[selector].split(SELECTOR_SEPARATOR)[1]
      }
    }

    if (multiply) {
      if (!this.itemSelectorID) {
        throw new Error('Selector ID is undefined')
      }
      let itemSelector = formattedSelectors[this.itemSelectorID]
      if (itemSelector.endsWith('"]')) {
        const temp1 = itemSelector.split(' ')
        const temp2 = lastItem(temp1).split(`[${ID_ATTRIBUTE}`)
        itemSelector = `${temp1.slice(0, temp1.length - 1).join(' ')} ${temp2[temp2.length - 2]}`
      }

      const items = fileDOM.selectAll(itemSelector)
      let cycleNumber = 1
      items.map(element => {
        element.setAttr(ID_ATTRIBUTE, String(counter))
        for (const selector in formattedSelectors) {
          resultSelectors[selector] = formattedSelectors[selector].replaceAll(genAttributeValue(SelPrefix.forEach, tCount), String(counter))
          if (cycleNumber === 1) {
            resultSelectors[selector] = resultSelectors[selector].replaceAll(genAttributeValue(SelPrefix.first, tCount), String(counter))
          }
          else if (cycleNumber === items.length) {
            resultSelectors[selector] = resultSelectors[selector].replaceAll(genAttributeValue(SelPrefix.last, tCount), String(counter))
          }
          resultSelectors[selector] = resultSelectors[selector].replaceAll(genAttributeValue(SelPrefix.th + cycleNumber, tCount), String(counter))
        }

        ++counter
        params = params.concat(this.getParams({
          formattedSelectors: resultSelectors,
          tCount: multiply ? tCount + 1 : tCount,
          multiply: false,
          providedSelector,
          cycleNumber,
          fileDOM,
          counter
        }))
        ++cycleNumber
      })
    }
    else {
      this.children.forEach(child => {
        params = params.concat(child.getParams({
          tCount: multiply ? tCount + 1 : tCount,
          formattedSelectors,
          providedSelector,
          cycleNumber: props.cycleNumber ?? 1,
          fileDOM
        }))
      })
    }
    return params
  }
}

export default Template
