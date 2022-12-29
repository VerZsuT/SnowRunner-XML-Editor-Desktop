import type { Group, Template } from '#templates/items'
import type Input from '#templates/items/Input'
import type Select from '#templates/items/Select'

type TemplateItems = Group | Input | Select<any> | Template

export default TemplateItems
