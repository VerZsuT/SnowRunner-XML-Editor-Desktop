import type { ReactNode } from 'react'

import memoizee from 'memoizee'

import { Group } from '../components/Group'
import Parameter from '../components/Parameter'

import { ParamType } from '#enums'
import type { TemplateParams } from '#types'

class TemplateService {
  parseItems = memoizee((items: TemplateParams) => {
    const children: ReactNode[] = []
  
    items.forEach(item => {
      const isGroup = item.paramType === ParamType.group
      const hasItems = item.groupItems.length > 0
  
      if (isGroup && hasItems)
        children.push(<Group key={item.selector} item={item}/>)
      else if (!isGroup)
        children.push(<Parameter key={item.selector} item={item}/>)
    })
  
    return children
  })
}

export default new TemplateService()
