import { useContext } from 'react-afc'

import { FileInfoContext } from '../../helpers/getFileInfo'
import { getFileParser } from '../../helpers/getFileParser'
import type IGroupProps from './group.props'

import { InputType } from '#g/enums'
import type { IGroupParams, IInputParams, ISelectParams, TemplateParams } from '#g/types'
import { ViewModel, prop, reactive } from '#r/model-ctrlr'
import { helpers } from '#r/services'

class GroupModel extends ViewModel<IGroupProps> {
  private mod = useContext(FileInfoContext).val.mod
  private item = this.props.item

  private items = this.getItems(this.item)

  readonly params = this.items.params
  readonly groups = this.items.groups

  readonly groupName = this.item.groupName

  @prop<IGroupProps>('isActive')
  readonly isActive!: boolean


  @prop<IGroupProps>('render')
  readonly render = this.props.render ?? false

  @reactive activeKey = ''

  readonly label = this.mod
    ? helpers.getGameText(this.groupName, this.mod) ?? this.item.resGroupName ?? this.groupName
    : this.groupName

  readonly iconSRC = this.item.iconName ? require(`#g/images/icons/${this.item.iconName}`) : null

  readonly parseFile = getFileParser()

  private getItems(item: IGroupParams) {
    const groups: TemplateParams = []
    const files: (IInputParams)[] = []
    const defaultItems: (IInputParams & ISelectParams)[] = []

    const params = {
      default: defaultItems,
      files
    }

    item.groupItems.forEach(groupItem => {
      if (groupItem.paramType === 'group') {
        groups.push(groupItem)
      }
      else if (groupItem.type === InputType.file) {
        params.files.push(groupItem)
      }
      else {
        params.default.push(groupItem)
      }
    })

    return { groups, params }
  }
}

export default GroupModel
