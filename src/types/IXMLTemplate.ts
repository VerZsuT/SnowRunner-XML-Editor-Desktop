import type { Action } from '#r/actions/Action'
import type { Template } from '#templates/items'

export interface IXMLTemplate {
  template: Template
  selector: string
  actions?: Action[]
  exclude?: Action[]
}
