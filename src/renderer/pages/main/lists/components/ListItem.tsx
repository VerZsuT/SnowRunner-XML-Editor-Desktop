import type {CSSProperties} from 'react'

import {StarFilled} from '@ant-design/icons'
import {Card, message} from 'antd'
import type {CheerioAPI} from 'cheerio'
import {load} from 'cheerio'
import {CURRENT_DLC, CURRENT_MOD, DEBUG_IMAGES, FILE_PATH, LIST_SCROLL, OPENED_CATEGORY, OPENED_GROUP} from 'consts'
import {Category, Page} from 'enums'
import {globalTexts} from 'globalTexts/renderer'
import {createContextMenu} from 'helpers/createContextMenu'
import type {MainDispatch} from 'pages/main/store'
import {afcMemo, getDispatcher, memoized, useRedux} from 'react-afc'
import {config} from 'scripts/config'
import {getExported} from 'scripts/dom'
import {getGameText, prettify} from 'scripts/helpers'
import {main} from 'scripts/main'
import {storage} from 'scripts/storage'
import type {Item} from 'types'

import {selectFilter} from '../../store/filterSlice'
import {toggleFavorite} from '../../store/listSlice'
import {route} from '../../store/pageSlice'
import {listsTexts} from '../texts'

const { Meta } = Card
const { existsSync, readFileSync, writeFileSync } = window.service
const { saveEPF, paths } = main
const { REMOVE_FAVORITE, ADD_FAVORITE } = listsTexts
const { EXPORT, SUCCESS_EXPORT_MESSAGE } = globalTexts

interface Props {
    item: Item
    type: Category
    listId: string
    modId: string
    dlc: string
    style: CSSProperties
}

export const ListItem = afcMemo<Props>(props => {
    const fileDOM = getDOM(props.item.path)
    const name = getName(props.item, fileDOM)
    const imgSrc = getImgSrc(props.type, props.item, fileDOM)
    const {
        ContextMenu,
        hideContextMenu,
        onContextMenu,
        contextIsShow
    } = createContextMenu()
    const reduxState = useRedux({
        filter: selectFilter
    })

    const dispatch = getDispatcher<MainDispatch>()

    function exportFile() {
        const { item, modId, dlc } = props

        const exported = getExported({
            filePath: item.path,
            shortMode: false,
            mod: modId,
            dlc
        })
        const path = saveEPF(item.name)

        hideContextMenu()
        if (!path) return

        writeFileSync(path, JSON.stringify(exported, null, '\t'))
        message.success(SUCCESS_EXPORT_MESSAGE)
    }

    function openEditor() {
        const { item, type, listId } = props

        storage.set(FILE_PATH, item.path)
        storage.set(CURRENT_DLC, item.dlcName)
        storage.set(CURRENT_MOD, item.modId)
        storage.set(OPENED_CATEGORY, type)
        storage.set(OPENED_GROUP, listId.replace('list-', ''))
        storage.set(LIST_SCROLL, String(Math.round(document.querySelector(`#${listId} > div`).scrollTop)))

        hideContextMenu()
        dispatch(route(Page.editor))
    }

    function toggle() {
        const { item } = props

        hideContextMenu()
        dispatch(toggleFavorite(item.name))
    }

    function isFavorite() {
        return config.favorites.includes(props.item.name)
    }

    const getContextMenuItems = memoized(() => [
        {
            label: isFavorite() ? REMOVE_FAVORITE : ADD_FAVORITE,
            key: 'toggle-favorite',
            onClick: toggle
        },
        {
            label: EXPORT,
            key: 'export',
            onClick: exportFile
        }
    ], () => [isFavorite()])

    return () => {
        const { style } = props
        const { filter } = reduxState

        const show = isShow(name, filter)
        const title = getTitle(name, filter)
    
        if (!show) return
    
        return (
            <div style={{ position: 'relative' }}>
                <Card
                    style={style}
                    className='card'
                    hoverable
                    cover={<img height={350} width={250} src={imgSrc} />}
                    onContextMenu={onContextMenu}
                    onClick={openEditor}
                >
                    <Meta
                        className='card-title'
                        title={typeof title === 'string'
                            ? title
                            : <>
                                {title.first}
                                <span className='red'>
                                    {title.second}
                                </span>
                                {title.last}
                            </>
                        }
                    />
                    {isFavorite() &&
                        <StarFilled className='fav-star' />
                    }
                </Card>
                <ContextMenu isShow={contextIsShow()} items={getContextMenuItems()} />
            </div>
        )
    }
})

function isShow(name: string, filter: string) {
    if (!filter)
        return true

    return name.toLowerCase().includes(filter.toLowerCase())
}

function getTitle(name: string, filter: string) {
    if (!filter)
        return name

    const firstIndex = name.toLowerCase().indexOf(filter.toLowerCase())
    const lastIndex = firstIndex + filter.length

    return {
        first: name.slice(0, firstIndex),
        second: name.slice(firstIndex, lastIndex),
        last: name.slice(lastIndex, name.length)
    }
}

function getImgSrc(category: Category, item: Item, fileDOM: CheerioAPI) {
    switch (category) {
    case Category.trailers:
        try {
            return require(`images/trailers/${item.name}.png`)
        }
        catch {
            return require('images/trailers/default.png')
        }
    case Category.trucks:
        try {
            return require(`images/trucks/${item.name}.jpg`)
        }
        catch {
            const defaultImage = require('images/trucks/default.png')
            if (DEBUG_IMAGES)
                console.warn(`Не найдена картинка ${item.name}`)

            if (item.modId && fileDOM('GameData > UiDesc').length) {
                const imgName = fileDOM('GameData > UiDesc').attr('UiIcon328x458')
                const truckPath = `${paths.modsTemp}/${item.modId}/ui/textures/${imgName}.png`

                if (!existsSync(truckPath))
                    return defaultImage
                
                return truckPath
            }
            return defaultImage
        }
    }
}

function getDOM(path: string) {
    return load(readFileSync(path), { xmlMode: true })
}

function getName(item: Item, fileDOM: CheerioAPI) {
    let name = prettify(item.name)

    if (fileDOM('GameData > UiDesc').length) {
        const uiName = fileDOM('GameData > UiDesc').attr('UiName')
        if (uiName)
            name = getGameText(uiName, item.modId) || uiName
    }
    return name
}
