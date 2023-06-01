import type { ReactNode } from 'react'

import memoizee from 'memoizee'

import Group from '../components/Group'
import Parameter from '../components/Parameter'

import { ParamType } from '#g/enums'
import type { TemplateParams } from '#g/types'
import { hasItems } from '#g/utils'

class TemplateService {
  parseItems = memoizee((items: TemplateParams, renderIt = false) => {
    const children: ReactNode[] = []

    items.forEach(item => {
      const isGroup = item.paramType === ParamType.group

      if (isGroup && hasItems(item.groupItems)) {
        children.push(<Group key={item.selector} item={item} renderIt={renderIt} />)
      }
      else if (!isGroup) {
        children.push(<Parameter key={item.selector} item={item} renderIt={renderIt} />)
      }
    })

    return children
  })
}

const templates = new TemplateService()

export default templates
