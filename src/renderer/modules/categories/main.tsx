import { PureComponent } from 'react'
import { render } from 'react-dom'
import ListType from 'modules/list/enums/ListType'

import Menu from 'menu'
import { setHotKey, MAIN } from 'scripts/funcs'
import main from 'scripts/main'
import Category from './components/Category'
import Loading from 'modules/components/Loading'

import Grid from './styled/Grid'
import 'styles/categories'
import config from 'scripts/config'

const { openConsole, openWhatsNew, quit } = main

class Categories extends PureComponent {
    private items: JSX.Element[]

    constructor(props: any) {
        super(props)
        const categories = this.getCategories()
        this.items = categories.map(category =>
            <Category key={category} name={category} />
        )
    }


    componentDidMount() {
        this.setHotkeys()
        this.openWhatsNew()
    }

    render() {
        return <>
            <Loading/>
            <Menu/>
            <Grid>
                {this.items}
            </Grid>
        </>
    }

    private openWhatsNew() {
        if (config.settings.showWhatsNew) {
            openWhatsNew()
            config.settings.showWhatsNew = false
        }        
    }

    private getCategories() {
        return Object.keys(ListType) as ListType[]
    }

    private setHotkeys() {
        setHotKey({
            key: 'Backquote'
        }, () => openConsole())
        setHotKey({
            key: 'Escape',
            eventName: 'keydown'
        }, () => quit())
    }
}

render(<Categories/>, MAIN)
