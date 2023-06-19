import { useMemo } from 'react-afc'

import { ImagesService } from '../../services'
import type IListItemProps from './listitem.props'

import { updateOnLangChange } from '#g/texts/renderer'
import type { IXMLElement } from '#g/types'
import { useContextMenu } from '#r/helpers'
import { ViewModel, redux, unwrap } from '#r/model-ctrlr'
import { selectFilter } from '#r/pages/main/store/filterSlice'
import { Config, XML } from '#r/services'

type Title = {
  first: string
  second: string
  last: string
}

export default class ListItemModel extends ViewModel<IListItemProps> {
  readonly contextMenu = useContextMenu()

  get isFavorite(): boolean {
    return Config.favorites.includes(this.props.item.name)
  }

  readonly fileDOM: IXMLElement
  readonly imgSrc: string

  @unwrap readonly name: string
  @unwrap readonly isShow: boolean
  @unwrap readonly title: Title

  @redux(selectFilter)
  readonly filter!: ReturnType<typeof selectFilter>

  constructor(props: IListItemProps) {
    super(props)

    this.fileDOM = XML.getDOM(props.item.path)
    this.name = updateOnLangChange(() => XML.getName(props.item, this.fileDOM)).cast()
    this.imgSrc = ImagesService.getSrc(props.type, props.item, this.fileDOM)

    this.isShow = useMemo((): boolean => {
      if (!this.filter) return true
      return this.name.toLowerCase().includes(this.filter.toLowerCase())
    }, () => [this.filter]) as unknown as boolean

    this.title = useMemo(() => {
      if (!this.filter) {
        return {
          first: this.name,
          second: '',
          last: ''
        }
      }

      const firstIndex = this.name.toLowerCase().indexOf(this.filter.toLowerCase())
      const lastIndex = firstIndex + this.filter.length

      return {
        first: this.name.slice(0, firstIndex),
        second: this.name.slice(firstIndex, lastIndex),
        last: this.name.slice(lastIndex, this.name.length)
      }
    }, () => [this.filter, this.name]) as unknown as Title
  }
}
