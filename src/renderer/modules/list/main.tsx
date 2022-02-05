import { PureComponent } from 'react'
import { render } from 'react-dom'
import { MAIN, mainProcess, setHotKey, t } from 'scripts'
import { ListContext } from './FilterContext'
import { ListType, SrcType } from './enums'
import { ProgramMenu } from 'menu'

import { InnerList } from './components/InnerList'
import { Search } from '../components/Search'
import { ErrorHandler } from '../components/ErrorHandler'

import {
    Typography, Tooltip, IconButton, Tabs, Tab as MuiTab,
    Backdrop, CircularProgress, TabProps, styled
} from '@mui/material'
import {  ArrowBack, StarRounded } from '@mui/icons-material'
import { boxShadow2, Container } from 'modules/components/styled'
import 'styles/list'

const { getList } = window.listPreload
const { config, local } = window.provider
const { readFile, openCategories } = mainProcess

const Title = styled(Container)({
    position: 'fixed',
    boxShadow: boxShadow2,
    backgroundColor: '#1c7dca',
    top: '31px',
    color: '#fafafa',
    padding: '8px 0',
    textAlign: 'center',
    zIndex: 20
})

const TabsContainer = styled(Container)({
    position: 'fixed',
    boxShadow: boxShadow2,
    top: '78px',
    zIndex: 20,
    backgroundColor: 'white',
    paddingLeft: '0',
    paddingRight: '0'
})

const BackIconButton = styled(IconButton)({
    position: 'absolute',
    top: '0',
    left: '0'
})

const Tab = styled((props: TabProps) =>
    <MuiTab iconPosition='end' {...props}/>
)({
    fontSize: '0.92rem',
    minHeight: '57px'
})

const TabIcon = styled('img')({
    width: '20px',
    marginLeft: '10px'
})

enum TabType {
    main,
    dlc,
    mods,
    favorites,
}

interface IState {
    filter: string
    favorites: Item[]
    activeTab: TabType
    isLoading: boolean
}

class List extends PureComponent<any, IState> {
    private listType: ListType
    private dlc: Item[]
    private mods: Item[]
    private main: Item[]

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
            activeTab,
            isLoading: false
        }
    }

    componentDidMount(): void {
        this.setBackHotkey()
        setTimeout(() => {
            if (local.get('listScroll')) {
                document.querySelector(`#list-${local.pop('openedList')}`).scrollTo(0, +local.pop('listScroll'))
            }
        }, 100)
    }

    render() {
        return (<>
            <ProgramMenu />
            <ErrorHandler />
            <ListContext.Provider value={{
                filter: this.state.filter,
                toggleFavorite: this.toggleFavorite
            }}>

                <Title>
                    <Search value={this.state.filter} onChange={this.setFilter} />
                    <Typography variant='h5'>
                        {this.listType === ListType.trucks ? t.TRUCKS_LIST_TITLE : t.TRAILERS_LIST_TITLE}
                    </Typography>
                    <Tooltip
                        title={t.BACK_BUTTON}
                        placement='right'
                    >
                        <BackIconButton color='inherit' onClick={this.back}>
                            <ArrowBack style={{ fontSize: '30px' }} />
                        </BackIconButton>
                    </Tooltip>
                </Title>
                <TabsContainer>
                    <Tabs
                        value={this.state.activeTab}
                        onChange={(_, value) => this.setState({ activeTab: +value as TabType })}
                        textColor='inherit'
                        variant='fullWidth'
                    >
                        <Tab
                            label={t.MAIN_LIST_TITLE}
                            icon={<TabIcon src={require('images/icons/list/main.png')}/>}
                        />
                        <Tab
                            label={t.DLC_LIST_TITLE}
                            disabled={!config.settings.DLC}
                            icon={<TabIcon src={require('images/icons/list/dlc.png')}/>}
                        />
                        <Tab
                            label={t.MODS_LIST_TITLE}
                            disabled={!config.settings.mods}
                            icon={<TabIcon src={require('images/icons/list/mods.png')}/>}
                        />
                        <Tab
                            label={t.FAVORITES_LIST_TITLE}
                            icon={<StarRounded style={{ fontSize: '27px' }} />}
                        />
                    </Tabs>
                </TabsContainer>

                <InnerList srcType={SrcType.main} items={this.main} opened={this.state.activeTab === TabType.main} />
                {config.settings.DLC ?
                    <InnerList srcType={SrcType.dlc} items={this.dlc} opened={this.state.activeTab === TabType.dlc} />
                    : null}
                {config.settings.mods ?
                    <InnerList srcType={SrcType.mods} items={this.mods} opened={this.state.activeTab === TabType.mods} />
                    : null}
                <InnerList srcType={SrcType.favorites} items={this.state.favorites} opened={this.state.activeTab === TabType.favorites} />
            </ListContext.Provider>
            <Backdrop
                style={{ color: '#fff', zIndex: 30 }}
                open={this.state.isLoading}
            >
                <CircularProgress color='inherit' />
            </Backdrop>
        </>)
    }

    private setFilter = (value: string) => {
        this.setState({
            filter: value
        })
    }

    private setBackHotkey = () => {
        setHotKey({
            key: 'Escape',
            eventName: 'keydown'
        }, () => {
            this.back()
        })
    }

    private back = () => {
        this.setState({
            isLoading: true
        })
        local.pop('openedList')
        local.pop('listScroll')
        openCategories()
    }

    private toggleFavorite = (name: string) => {
        if (config.favorites.includes(name)) {
            config.favorites = config.favorites.filter(value => value !== name)
        } else {
            config.favorites = [...config.favorites, name]
        }

        this.setState({
            favorites: this.getFavorites()
        })
    }

    private getMods() {
        if (!config.settings.mods) return []

        const array = getList(this.listType, SrcType.mods)
        const newArray: Item[] = []

        for (const mod of array) {
            for (const item of mod.items) {
                newArray.push({
                    ...item,
                    modId: mod.id
                })
            }
        }
        return newArray.map(value => {
            const fileData = readFile(value.path)
            const $dom = new DOMParser().parseFromString(`<root>${fileData}</root>`, 'text/xml')
            const $Truck = $dom.querySelector('Truck')
            if (this.listType === ListType.trailers && $Truck && $Truck.getAttribute('Type') === 'Trailer') {
                return value
            } else if (this.listType === ListType.trucks && $Truck && $Truck.getAttribute('Type') !== 'Trailer') {
                return value
            }
        }).filter(value => {
            return Boolean(value)
        })
    }

    private getDLC() {
        if (!config.settings.DLC) return []

        const array = getList(this.listType, SrcType.dlc)
        const newArray: Item[] = []

        for (const dlc of array) {
            for (const item of dlc.items) {
                newArray.push({
                    ...item,
                    dlcName: dlc.dlcName
                })
            }
        }
        return newArray.map(value => {
            const fileData = readFile(value.path)
            const $dom = new DOMParser().parseFromString(`<root>${fileData}</root>`, 'text/xml')
            const $Truck = $dom.querySelector('Truck')
            if (this.listType === ListType.trailers && $Truck && $Truck.getAttribute('Type') === 'Trailer') {
                return value
            } else if (this.listType === ListType.trucks && $Truck && $Truck.getAttribute('Type') !== 'Trailer') {
                return value
            }
        }).filter(value => Boolean(value))
    }

    private getMain() {
        const array = getList(this.listType, SrcType.main)

        return array.map(value => {
            if (this.listType !== ListType.trucks) {
                return value
            }
            const fileData = readFile(value.path)
            const dom = new DOMParser().parseFromString(`<root>${fileData}</root>`, 'text/xml')
            if (dom.querySelector('Truck').getAttribute('Type') !== 'Trailer') {
                return value
            }
        }).filter(value => Boolean(value))
    }

    private getFavorites() {
        const allItems = [...this.main, ...this.mods, ...this.dlc]

        return allItems.filter(value => {
            return config.favorites.includes(value.name)
        })
    }
}

render(<List />, MAIN)
