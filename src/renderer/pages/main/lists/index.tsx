import {ApiOutlined, AppstoreAddOutlined, AppstoreOutlined, StarFilled} from '@ant-design/icons'
import {Tabs} from 'antd'
import {load} from 'cheerio'
import {Header} from 'components/Header'
import {Menu} from 'components/Menu'
import {Category, GroupTab, SrcType, Window} from 'enums'
import {handleIPCMessage} from 'helpers/handleIPCMessage'
import {handleKey} from 'helpers/handleKey'
import {afc, afterDraw, getDispatcher, memoized, useRedux} from 'react-afc'
import {config} from 'scripts/config'
import {getPreload} from 'scripts/getPreload'
import {main} from 'scripts/main'
import type {Item, ListPreload} from 'types'

import type {MainDispatch} from '../store'
import {selectCategory, selectGroup, setCategory, setGroup} from '../store/listSlice'
import {List} from './components/List'
import {Search} from './components/Search'
import {listsTexts} from './texts'

import './styles.sass'

const { settings } = config
const { TabPane } = Tabs
const { readFileSync } = window.service
const { quitApp, openWindow } = main
const { getList } = getPreload<ListPreload>('listPreload')

const {
    TRUCKS_LIST_TITLE,
    TRAILERS_LIST_TITLE,
    MAIN_LIST_TITLE,
    DLC_LIST_TITLE,
    MODS_LIST_TITLE,
    FAVORITES_LIST_TITLE,
    TRAILERS_CATEGORY_TITLE,
    TRUCKS_CATEGORY_TITLE
} = listsTexts

export const Lists = afc(() => {
    const dispatch = getDispatcher<MainDispatch>()
    const reduxState = useRedux({
        category: selectCategory,
        group: selectGroup
    })
    handleIPCMessage()
    
    handleKey({
        key: 'Escape'
    }, () => quitApp())

    afterDraw(() => {
        if (settings.showWhatsNew)
            openWhatsNew()
    })

    function onChangeCategory(category: string) {
        dispatch(setCategory(category as Category))
    }

    function onChangeGroup(group: string) {
        dispatch(setGroup(group as GroupTab))
    }

    const items = memoized(
        () => getItems(reduxState.category),
        () => [reduxState.category]
    )

    return () => {
        const { category, group } = reduxState
        const { dlc, mods, all, main } = items()

        return <>
            <Menu />

            <Header
                text={category === Category.trucks ? TRUCKS_LIST_TITLE : TRAILERS_LIST_TITLE}
                extra={<Search />}
            />
            <Tabs
                className='tabs'
                activeKey={category}
                onChange={onChangeCategory}
            >
                <TabPane
                    tab={<span>{TRUCKS_CATEGORY_TITLE}</span>}
                    key={Category.trucks}
                />
                <TabPane
                    tab={<span>{TRAILERS_CATEGORY_TITLE}</span>}
                    key={Category.trailers}
                />
            </Tabs>
            <Tabs
                className='tabs'
                activeKey={group}
                onChange={onChangeGroup}
            >
                <TabPane
                    tab={<span>
                        <AppstoreOutlined className='tab-icon' />
                        {MAIN_LIST_TITLE}
                    </span>}
                    key={GroupTab.main}
                />
                <TabPane
                    tab={<span>
                        <AppstoreAddOutlined className='tab-icon' />
                        {DLC_LIST_TITLE}
                    </span>}
                    disabled={!settings.DLC}
                    key={GroupTab.dlc}
                />
                <TabPane
                    tab={<span>
                        <ApiOutlined className='tab-icon' />
                        {MODS_LIST_TITLE}
                    </span>}
                    disabled={!settings.mods}
                    key={GroupTab.mods}
                />
                <TabPane
                    tab={<span>
                        <StarFilled className='tab-icon' />
                        {FAVORITES_LIST_TITLE}
                    </span>}
                    key={GroupTab.favorites}
                />
            </Tabs>

            <List
                srcType={SrcType.main}
                items={main}
                opened={group === GroupTab.main}
            />
            <List
                srcType={SrcType.favorites}
                items={all}
                opened={group === GroupTab.favorites}
            />

            {!!settings.DLC &&
                <List
                    srcType={SrcType.dlc}
                    items={dlc}
                    opened={group === GroupTab.dlc}
                />
            }
            {!!settings.mods &&
                <List
                    srcType={SrcType.mods}
                    items={mods}
                    opened={group === GroupTab.mods}
                />
            }
        </>
    }
})

function openWhatsNew() {
    if (settings.showWhatsNew) {
        openWindow(Window.WhatsNew)
        settings.showWhatsNew = false
    }
}

function getItems(category: Category) {
    const main = getMain(category)
    const dlc = getDLC(category)
    const mods = getMods(category)
    const all = [...main, ...dlc, ...mods]
    return { main, dlc, mods, all }
}

function getMain(category: Category) {
    const array = getList(category, SrcType.main)

    return array.map(value => {
        if (category !== Category.trucks)
            return value

        const fileData = readFileSync(value.path)
        const dom = load(fileData, { xmlMode: true })
        const $Truck = dom('Truck')

        if (!$Truck.length)
            return value

        if ($Truck.attr('Type') !== 'Trailer')
            return value
    }).filter(value => !!value)
}

function filterByCategory(array: Item[], category: Category): Item[] {
    return array.map(value => {
        const fileData = readFileSync(value.path)
        const $dom = load(fileData, { xmlMode: true })
        const $Truck = $dom('Truck')

        if (!$Truck.length) return

        if (category === Category.trailers && $Truck.attr('Type') === 'Trailer')
            return value

        if (category === Category.trucks && $Truck.attr('Type') !== 'Trailer')
            return value
    }).filter(value => !!value)
}

function getDLC(category: Category) {
    const newArray: Item[] = []

    if (!settings.DLC)
        return []
  
    getList(category, SrcType.dlc).forEach(dlc => {
        dlc.items.forEach(item => {
            newArray.push({
                ...item,
                dlcName: dlc.dlcName
            })
        })
    })
  
    return filterByCategory(newArray, category)
}

function getMods(category: Category) {
    const newArray: Item[] = []

    if (!settings.mods)
        return []

    getList(category, SrcType.mods).forEach(mod => {
        mod.items.forEach(item => {
            newArray.push({
                ...item,
                modId: mod.id
            })
        })
    })
  
    return filterByCategory(newArray, category)
}
