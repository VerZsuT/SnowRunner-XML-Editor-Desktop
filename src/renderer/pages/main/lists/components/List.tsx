import type {CSSProperties} from 'react'
import {memo} from 'react'

import {Button, Modal} from 'antd'
import {LIST_SCROLL} from 'consts'
import type {Category} from 'enums'
import {SrcType} from 'enums'
import {getForceUpdate} from 'helpers/getForceUpdate'
import {afcMemo, afterUnmount, createState, useRedux} from 'react-afc'
import type {GridChildComponentProps} from 'react-window'
import {FixedSizeGrid} from 'react-window'
import {config} from 'scripts/config'
import {main} from 'scripts/main'
import {storage} from 'scripts/storage'
import type {Item} from 'types'

import {selectFilter} from '../../store/filterSlice'
import {selectCategory, selectFavorites} from '../../store/listSlice'
import {listsTexts} from '../texts'
import {ListItem} from './ListItem'
import {ModsPopup} from './ModsPopup'

const { confirm } = Modal
const { relaunchApp } = main
const { settings } = config
const { RELAUNCH_PROMPT, MODS_CHANGE_BUTTON } = listsTexts

interface Props {
    srcType: SrcType
    items: Item[]
    opened?: boolean
}

export const List = afcMemo<Props>(props => {
    const [state, setState] = createState({
        isShowMods: false
    })
    const reduxState = useRedux({
        filter: selectFilter,
        favorites: selectFavorites,
        category: selectCategory
    })
    const forceUpdate = getForceUpdate()

    window['onResize'](forceUpdate)
    afterUnmount(() => window['removeResizeHandler'](forceUpdate))

    const reloadPromptTimeout = 200
    const id = `list-${props.srcType}`

    function showModsPopup() {
        setState({ isShowMods: true })
    }

    function hideModsPopup(isReload?: boolean) {
        setState({ isShowMods: false })
        if (isReload) {
            setTimeout(() => {
                confirm({
                    title: RELAUNCH_PROMPT,
                    onOk: () => relaunchApp()
                })
            }, reloadPromptTimeout) 
        }
    }

    return () => {
        const { items, srcType, opened } = props
        const { isShowMods } = state
        const { filter, favorites, category } = reduxState

        if ((srcType === SrcType.mods && !settings.mods) ||
        (srcType === SrcType.dlc && !settings.DLC))
            return

        let filteredItems = items
        if (srcType === SrcType.favorites)
            filteredItems = filteredItems.filter(value => favorites.includes(value.name))

        if (filter)
            filteredItems = filteredItems.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))

        if (opened === false) return

        const colWidth = 250
        const rowHeight = 420
        const gridHeight = window.innerHeight - (srcType === SrcType.mods? 230 : 210)
        const gridWidth = window.innerWidth
        let colCount = Math.floor(window.innerWidth / colWidth)
        const rowCount = Math.ceil(filteredItems.length / colCount)

        if (filteredItems.length < colCount)
            colCount = filteredItems.length

        const gutter = Math.round((gridWidth - (colCount * colWidth)) / (colCount + 1))

        return (
            <div className='list' id={id}>
                {srcType === SrcType.mods && <>
                    <div>
                        <Button
                            type='primary'
                            className='mods-button'
                            onClick={showModsPopup}
                        >
                            {MODS_CHANGE_BUTTON}
                        </Button>
                    </div>
                    <ModsPopup
                        show={isShowMods}
                        hidePopup={hideModsPopup}
                    />
                </>}
                <FixedSizeGrid
                    initialScrollTop={parseInt(storage.pop(LIST_SCROLL) || '0')}
                    className='card-list'
                    columnCount={colCount}
                    columnWidth={colWidth}
                    height={gridHeight}
                    width={gridWidth}
                    rowHeight={rowHeight}
                    rowCount={rowCount}
                >
                    {(props: GridChildComponentProps, index: number) => (
                        <ItemRenderer
                            style={props.style}
                            columnIndex={props.columnIndex}
                            rowIndex={props.rowIndex}
                            gutter={gutter}
                            items={filteredItems}
                            category={category}
                            id={id}
                            colCount={colCount}
                            key={index}
                        />
                    )}
                </FixedSizeGrid>
            </div>
        )
    }
})

interface IItemProps {
    style: CSSProperties;
    rowIndex: number;
    columnIndex: number;
    items: Item[];
    category: Category;
    id: string;
    gutter: number;
    colCount: number;
}

const ItemRenderer = memo((props: IItemProps) => {
    const { colCount, style, rowIndex, columnIndex, category, items, id, gutter } = props
    const index = columnIndex + colCount * (rowIndex)

    if (items.length <= index) return

    const item = items[index]

    return (
        <ListItem
            style={{
                ...style,
                top: style.top as number + 10,
                left: style.left as number + gutter * (columnIndex + 1)
            }}
            item={item}
            type={category}
            listId={id}
            modId={item.modId}
            dlc={item.dlcName}
        />
    )
})
