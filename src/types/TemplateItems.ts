import type Group from '#r_editor/templates/items/group.item'
import type Input from '#r_editor/templates/items/input.item'
import type Select from '#r_editor/templates/items/select.item'
import type Template from '#r_editor/templates/items/template.item'

type TemplateItems = Group | Input | Select<any> | Template

export default TemplateItems
