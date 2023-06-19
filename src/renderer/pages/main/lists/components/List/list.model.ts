import type IListProps from './list.props'

import { SrcType } from '#g/enums'
import type { IItem } from '#g/types'
import { ViewModel, prop, reactive, redux } from '#r/model-ctrlr'
import { selectFilter } from '#r/pages/main/store/filterSlice'
import { selectCategory, selectFavorites } from '#r/pages/main/store/listSlice'

export default class ListModel extends ViewModel<IListProps> {
  readonly colWidth = 250
  readonly rowHeight = 420
  readonly id: string

  @reactive isShowMods = false

  @redux(selectFilter)
  readonly filter!: ReturnType<typeof selectFilter>

  @redux(selectFavorites)
  readonly favorites!: ReturnType<typeof selectFavorites>

  @redux(selectCategory)
  readonly category!: ReturnType<typeof selectCategory>

  @prop<IListProps>('srcType')
  readonly srcType!: IListProps['srcType']

  @prop<IListProps>('opened')
  readonly opened!: IListProps['opened']

  get filteredItems(): IItem[] {
    const { items, srcType } = this.props

    let filteredItems = items

    if (srcType === SrcType.favorites) {
      filteredItems = filteredItems.filter(value => this.favorites.includes(value.name))
    }

    if (this.filter) {
      filteredItems = filteredItems.filter(item => item.name.toLowerCase().includes(this.filter.toLowerCase()))
    }

    return filteredItems
  }

  get gridParams() {
    const itemsLength = this.filteredItems.length
    const gridHeight = window.innerHeight - (this.props.srcType === SrcType.mods ? 230 : 210)
    const gridWidth = window.innerWidth
    let colCount = Math.floor(window.innerWidth / this.colWidth)
    const rowCount = Math.ceil(itemsLength / colCount)
    if (itemsLength < colCount) colCount = itemsLength
    const gutter = Math.round((gridWidth - (colCount * this.colWidth)) / (colCount + 1))

    return { gridHeight, gridWidth, colCount, rowCount, gutter }
  }

  constructor(props: IListProps) {
    super(props)
    this.id = `list-${props.srcType}`
  }
}
