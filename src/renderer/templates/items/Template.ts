import helpers from './helpers'

import { TemplateType } from '#enums'
import type {
  IItemGetterProps,
  ITemplateItem,
  ITemplateProps, TemplateItems,
  TemplateParams, TemplateSelectors, TemplateTypedProps
} from '#types'

/**
 * Шаблон таблицы параметров. Может иметь вложенные под-шаблоны.
 */
class Template implements ITemplateItem<TemplateParams> {
  private replaceName = 'CYCLE'
  private type!: TemplateType
  private selectors!: TemplateSelectors
  private itemSelector?: string
  private itemSelectorID?: string
  private children: TemplateItems[]

  constructor(props: TemplateTypedProps, ...children: TemplateItems[])
  constructor(props: TemplateSelectors, ...children: TemplateItems[])
  constructor(
    props: TemplateSelectors | TemplateTypedProps,
    ...children: TemplateItems[]
  ) {
    this.children = children
    
    if (props.type || props.itemSelector)
      this.construct(props)
    else
      this.construct({ selectors: <TemplateSelectors> props })
  }

  public getParams(props: IItemGetterProps): TemplateParams | never {
    const {
      providedSelector,
      fileDOM,
      cycleNumber = 1,
      tNumber = 1,
      formattedSelectors = this.selectors,
      multiply = (this.type === TemplateType.multiply)
    } = props

    let { counter = 1 } = props
    let params: TemplateParams = []
    const newSelectors: TemplateSelectors = {}
    for (const selector in formattedSelectors) {
      if (formattedSelectors[selector].includes('||'))
        formattedSelectors[selector] = formattedSelectors[selector].split('||')[1]
    }

    if (multiply) {
      if (!this.itemSelectorID)
        throw new Error('Selector ID is undefined')
      let itemSelector = formattedSelectors[this.itemSelectorID]
      if (itemSelector.endsWith('"]')) {
        const temp1 = itemSelector.split(' ')
        const temp2 = temp1[temp1.length - 1].split('[SXMLE_ID')
        itemSelector = `${temp1.slice(0, temp1.length - 1).join(' ')} ${temp2[temp2.length - 2]}`
      }

      const items = fileDOM(itemSelector)
      const name = this.replaceName + tNumber
      let cycleNumber = 1
      items.each((_, el) => {
        fileDOM(el).attr('SXMLE_ID', String(counter))
        for (const selector in formattedSelectors) {
          newSelectors[selector] = formattedSelectors[selector].replaceAll(`-${name}-`, String(counter))
          if (cycleNumber === 1)
            newSelectors[selector] = newSelectors[selector].replaceAll(`-F_${name}-`, String(counter))
          else if (cycleNumber === items.length)
            newSelectors[selector] = newSelectors[selector].replaceAll(`-L_${name}-`, String(counter))
          newSelectors[selector] = newSelectors[selector].replaceAll(`-N${cycleNumber}_${name}-`, String(counter))
        }

        ++counter
        params = params.concat(this.getParams({
          formattedSelectors: newSelectors,
          tNumber: multiply ? tNumber + 1 : tNumber,
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
          tNumber: multiply ? tNumber + 1 : tNumber,
          formattedSelectors,
          providedSelector,
          cycleNumber,
          fileDOM
        }))
      })
    }
    return params
  }

  private construct(props: ITemplateProps): void {
    this.type = props.type ?? TemplateType.single
    this.selectors = props.selectors ?? {}
    this.itemSelector = props.itemSelector
    this.itemSelectorID = helpers.getSelectorID(this.itemSelector)
  }
}

export default Template
