import { PureComponent } from 'react'
import { render } from 'react-dom'
import { load } from 'cheerio'
import memoizee from 'memoizee'
import type { Cheerio, CheerioAPI, Node as CNode } from 'cheerio'
import type IItem from './types/IItem'
import ListType from './enums/ListType'
import SrcType from './enums/SrcType'
import { MAIN, setHotKey } from 'scripts/funcs'
import localize from 'scripts/localize'
import config from 'scripts/config'
import local from 'scripts/storage'
import main from 'scripts/main'
import { ListContext } from './FilterContext'
import Menu from 'menu'

import InnerList from './components/InnerList'
import Search from 'modules/components/Search'
import ErrorHandler from 'modules/components/ErrorHandler'
//import DropArea from 'modules/components/DropArea'
import Loading, { showLoading } from 'modules/components/Loading'
import Popup from 'modules/components/Popup'
import Alert from 'modules/components/Alert'

import { Typography, Tooltip, Tabs } from '@mui/material'
import { ArrowBack, StarRounded } from '@mui/icons-material'
import Title from './styled/Title'
import BackIconButton from './styled/BackIconButton'
import TabsContainer from './styled/TabsContainer'
import Tab from './styled/Tab'
import TabIcon from './styled/TabIcon'
import 'styles/list'

const { getList } = window.listPreload
const { readFileSync } = window.service
const { openCategories } = main

enum TabType {
    main,
    dlc,
    mods,
    favorites,
}

interface IState {
    filter: string
    favorites: IItem[]
    activeTab: TabType
}

class List extends PureComponent<any, IState> {
    private styles = {
        backIcon: { fontSize: '30px' },
        favIcon: { fontSize: '27px' }
    }
    private listType: ListType
    private dlc: IItem[]
    private mods: IItem[]
    private main: IItem[]

    constructor(props: any) {
        super(props)

        this.listType = local.get('listType') as ListType
        this.dlc = this.getDLC()
        this.mods = this.getMods()
        this.main = this.getMain()

        let activeTab = TabType.main
        if (local.get('openedList')) {
            switch (local.get('openedList')) {
                case 'main':
                    activeTab = TabType.main
                break
                case 'dlc':
                    activeTab = TabType.dlc
                break
                case 'mods':
                    activeTab = TabType.mods
                break
                case 'favorites':
                    activeTab = TabType.favorites
                break
            }
        }

        this.state = {
            filter: '',
            favorites: this.getFavorites(),
            activeTab
        }
    }

    componentDidMount(): void {
        this.setBackHotkey()
        setTimeout(() => {
            if (local.get('listScroll'))
                document.querySelector(`#list-${local.pop('openedList')}`).scrollTo(0, +local.pop('listScroll'))
        }, 200)
    }

    render() {
        const { filter, activeTab, favorites } = this.state

        return <>
            <Menu/>
            <ErrorHandler/>
            {/* <DropArea onDrop={()=>{}}/> */}
            <Loading/>
            <Popup/>
            <Alert/>

            <ListContext.Provider value={this.getContext(filter)}>
                <Title>
                    <Search value={filter} onChange={this.setFilter}/>
                    <Typography variant='h5'>
                        {this.listType === ListType.trucks ? localize.TRUCKS_LIST_TITLE : localize.TRAILERS_LIST_TITLE}
                    </Typography>
                    <Tooltip title={localize.BACK_BUTTON} placement='right'>
                        <BackIconButton color='inherit' onClick={this.back}>
                            <ArrowBack style={this.styles.backIcon}/>
                        </BackIconButton>
                    </Tooltip>
                </Title>
                <TabsContainer>
                    <Tabs
                        value={activeTab}
                        onChange={this.onTabChange}
                        textColor='inherit'
                        variant='fullWidth'
                    >
                        <Tab
                            label={localize.MAIN_LIST_TITLE}
                            icon={this.icons.main}
                        />
                        <Tab
                            label={localize.DLC_LIST_TITLE}
                            disabled={!config.settings.DLC}
                            icon={this.icons.dlc}
                        />
                        <Tab
                            label={localize.MODS_LIST_TITLE}
                            disabled={!config.settings.mods}
                            icon={this.icons.mods}
                        />
                        <Tab
                            label={localize.FAVORITES_LIST_TITLE}
                            icon={this.icons.favs}
                        />
                    </Tabs>
                </TabsContainer>

                <InnerList srcType={SrcType.main} items={this.main} opened={activeTab === TabType.main}/>
                {config.settings.DLC ?
                    <InnerList srcType={SrcType.dlc} items={this.dlc} opened={activeTab === TabType.dlc}/>
                : null}
                {config.settings.mods ?
                    <InnerList srcType={SrcType.mods} items={this.mods} opened={activeTab === TabType.mods}/>
                : null}
                <InnerList srcType={SrcType.favorites} items={favorites} opened={activeTab === TabType.favorites}/>
            </ListContext.Provider>
        </>
    }

    private icons = {
        main: <TabIcon src={require('images/icons/list/main.png')}/>,
        dlc: <TabIcon src={require('images/icons/list/dlc.png')}/>,
        mods: <TabIcon src={require('images/icons/list/mods.png')}/>,
        favs: <StarRounded style={this.styles.favIcon}/>
    }

    private onTabChange = (_: any, value: any) => this.setState({ activeTab: +value as TabType })

    private getContext = memoizee((filter: string) => ({
        filter,
        toggleFavorite: this.toggleFavorite
    }))

    private setFilter = (value: string) => {
        this.setState({ filter: value })
    }

    private setBackHotkey = () => {
        setHotKey({
            key: 'Escape',
            eventName: 'keydown'
        }, () => this.back())
    }

    private back = () => {
        showLoading()
        local.pop('openedList')
        local.pop('listScroll')
        openCategories()
    }

    private toggleFavorite = (name: string) => {
        if (config.favorites.includes(name))
            config.favorites = config.favorites.filter(value => value !== name)
        else
            config.favorites = [...config.favorites, name]

        this.setState({ favorites: this.getFavorites() })
    }

    private getMods() {
        let newArray: IItem[] = []
        let array: IItem[]

        if (!config.settings.mods)
            return []
            
        array = getList(this.listType, SrcType.mods)

        for (const mod of array) {
            for (const item of mod.items) {
                newArray.push({
                    ...item,
                    modId: mod.id
                })
            }
        }
        return newArray.map(value => {
            const fileData = readFileSync(value.path)
            const $dom = load(fileData, { xmlMode: true })
            const $Truck = $dom('Truck')

            if (this.listType === ListType.trailers && $Truck.length && $Truck.attr('Type') === 'Trailer')
                return value
            else if (this.listType === ListType.trucks && $Truck.length && $Truck.attr('Type') !== 'Trailer')
                return value
        }).filter(value => !!value)
    }

    private getDLC() {
        let array: IItem[]
        let newArray: IItem[] = []

        if (!config.settings.DLC) {
            return []
        }
        array = getList(this.listType, SrcType.dlc)

        for (const dlc of array) {
            for (const item of dlc.items) {
                newArray.push({
                    ...item,
                    dlcName: dlc.dlcName
                })
            }
        }
        return newArray.map(value => {
            const fileData = readFileSync(value.path)
            const $dom = load(fileData, { xmlMode: true })
            const $Truck = $dom('Truck')

            if (this.listType === ListType.trailers && $Truck.length && $Truck.attr('Type') === 'Trailer') {
                return value
            }
            else if (this.listType === ListType.trucks && $Truck.length && $Truck.attr('Type') !== 'Trailer') {
                return value
            }
        }).filter(value => !!value)
    }

    private getMain() {
        const array = getList(this.listType, SrcType.main)

        return array.map(value => {
            let fileData: string
            let dom: CheerioAPI
            let $Truck: Cheerio<CNode>

            if (this.listType !== ListType.trucks) {
                return value
            }

            fileData = readFileSync(value.path)
            dom = load(fileData, { xmlMode: true })
            $Truck = dom('Truck')

            if (!$Truck.length) {
                return value
            }
            if ($Truck.attr('Type') !== 'Trailer') {
                return value
            }
        }).filter(value => !!value)
    }

    private getFavorites() {
        const allItems = [...this.main, ...this.mods, ...this.dlc]
        return allItems.filter(value => config.favorites.includes(value.name))
    }
}

render(<List/>, MAIN)
