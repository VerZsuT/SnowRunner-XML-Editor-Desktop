import { PureComponent } from 'react'
import { render } from 'react-dom'
import { setHotKey, mainProcess, MAIN } from 'scripts'
import { Category } from './components/Category'
import { ListType } from 'modules/list/enums'
import { Menu } from 'menu'
import 'styles/categories/main'

const { openConsole } = mainProcess

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
        this.setConsoleHotkey()
    }

    render() {
        return (<>
            {Menu}
            <div id='categories'>
                {this.items}
            </div>
        </>)
    }

    private getCategories() {
        return Object.keys(ListType) as ListType[]
    }

    private setConsoleHotkey() {
        setHotKey({
            key: 'Backquote'
        }, () => {
            openConsole()
        })
    }
}

render(<Categories />, MAIN)
