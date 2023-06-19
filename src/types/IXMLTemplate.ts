import type ExtraAction from '#r_editor/extraActions/ExtraAction'
import type Template from '#r_editor/templates/items/template.item'

export default interface IXMLTemplate {
  template: Template
  selector: string
  extraActions?: ExtraAction[]
  exclude?: ExtraAction[]
}
