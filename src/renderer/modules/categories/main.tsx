import { PureComponent } from 'react'
import { render } from 'react-dom'
import { setHotKey, mainProcess, MAIN } from 'scripts'
import { Category } from './components/Category'
import { ListType } from 'modules/list/enums'
import { ProgramMenu } from 'menu'
import 'styles/categories/main'

import { styled } from '@mui/system'
import { GridContainer } from 'modules/components/styled'

const { openConsole, quit } = mainProcess

const Grid = styled(GridContainer)({
    justifyContent: 'space-evenly',
    marginTop: '31px'
})

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
    }

    render() {
        return (<>
            <ProgramMenu />
            <Grid>
                {this.items}
            </Grid>
        </>)
    }

    private getCategories() {
        return Object.keys(ListType) as ListType[]
    }

    private setHotkeys() {
        setHotKey({
            key: 'Backquote'
        }, () => {
            openConsole()
        })
        setHotKey({
            key: 'Escape',
            eventName: 'keydown'
        }, () => {
            quit()
        })
    }
}

render(<Categories />, MAIN)
