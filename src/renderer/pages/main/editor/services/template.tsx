import type { ReactNode } from 'react'

import memoizee from 'memoizee'

import Group from '../components/Group'
import Parameter from '../components/Parameter'

import { ParamType } from '#g/enums'
import { hasItems } from '#g/helpers'
import type { TemplateParams } from '#g/types'

class TemplateService {
  parseItems = memoizee((items: TemplateParams) => {
    const children: ReactNode[] = []

    items.forEach(item => {
      const isGroup = item.paramType === ParamType.group

      if (isGroup && hasItems(item.groupItems)) {
        children.push(<Group key={item.selector} item={item} />)
      }
      else if (!isGroup) {
        children.push(<Parameter key={item.selector} item={item} />)
      }
    })

    return children
  })
}

const templates = new TemplateService()

export default templates
