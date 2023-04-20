import type Action from '#r_editor/actions/Action'
import type Template from '#r_editor/templates/items/template.item'

interface IXMLTemplate {
  template: Template
  selector: string
  actions?: Action[]
  exclude?: Action[]
}

export default IXMLTemplate
