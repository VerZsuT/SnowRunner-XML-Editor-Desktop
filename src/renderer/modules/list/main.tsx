import { PureComponent } from 'react'
import { render } from 'react-dom'
import { MAIN, mainProcess, t } from 'scripts'
import { InnerList } from './components/InnerList'
import { Search } from './components/Search'
import { ListContext } from './FilterContext'
import { ListType, SrcType } from './enums'
import { Menu } from 'menu'
import 'styles/list/main'

const { getList } = window.listPreload
const { config, local } = window.provider
const { readFile, openCategories } = mainProcess

enum Tab {
    dlc,
    mods,
    favorites,
    main
}

interface IState {
    filter: string
    favorites: Item[]
    activeTab: Tab
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

        this.state = {
            filter: '',
            favorites: this.getFavorites(),
            activeTab: Tab.main
        }
    }

    render() {
        return (<>
            {Menu}
            <ListContext.Provider value={{
                filter: this.state.filter,
                toggleFavorite: this.toggleFavorite
            }}>
                <div id='list'>
                    <Search value={this.state.filter} onChange={this.setFilter} />

                    <header className='list-title'>
                        {this.listType === ListType.trucks? t.TRUCKS_LIST_TITLE : t.TRAILERS_LIST_TITLE}
                        <button
                            className='back'
                            onClick={this.back}
                            title={t.BACK_BUTTON}
                        ></button>
                        <div className='tabs'>
                            <div
                                className={this.state.activeTab === Tab.main ? 'active' : ''}
                                onClick={() => this.setState({ activeTab: Tab.main })}
                            >
                                <span>{t.MAIN_LIST_TITLE}</span>
                                <img className='inverted' src={require('images/icons/list/main.png')} />
                            </div>
                            <div
                                className={this.state.activeTab === Tab.dlc ? 'active' : ''}
                                onClick={() => this.setState({ activeTab: Tab.dlc })}
                            >
                                <span>{t.DLC_LIST_TITLE}</span>
                                <img className='inverted' src={require('images/icons/list/dlc.png')} />
                            </div>
                            <div
                                className={this.state.activeTab === Tab.mods ? 'active' : ''}
                                onClick={() => this.setState({ activeTab: Tab.mods })}
                            >
                                <span>{t.MODS_LIST_TITLE}</span>
                                <img className='inverted' src={require('images/icons/list/mods.png')} />
                            </div>
                            <div 
                                className={this.state.activeTab === Tab.favorites ? 'active' : ''}
                                onClick={() => this.setState({ activeTab: Tab.favorites })}
                            >
                                <span>{t.FAVORITES_LIST_TITLE}</span>
                                <img className='gray' src={require('images/icons/list/filled_star.png')} />
                            </div>
                        </div>
                    </header>
                    <InnerList srcType={SrcType.main} items={this.main} opened={this.state.activeTab === Tab.main} />
                    <InnerList srcType={SrcType.dlc} items={this.dlc} opened={this.state.activeTab === Tab.dlc} />
                    <InnerList srcType={SrcType.mods} items={this.mods} opened={this.state.activeTab === Tab.mods} />
                    <InnerList srcType={SrcType.favorites} items={this.state.favorites} opened={this.state.activeTab === Tab.favorites} />
                </div>
            </ListContext.Provider>
        </>)
    }

    private setFilter = (value: string) => {
        this.setState({
            filter: value
        })
    }

    private back = () => {
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
