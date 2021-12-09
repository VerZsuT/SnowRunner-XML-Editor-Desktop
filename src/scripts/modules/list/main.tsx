import { PureComponent } from 'react'
import { render } from 'react-dom'
import '@editor-bootstrap'
import '@editor-service/menu'
import '../../../styles/main.css'

import { MAIN } from '@editor-service'
import InnerList from './components/InnerList'
import Search from './components/Search'
import { FilterContext } from './FilterContext'
import { SrcType } from './enums'

interface IState {
    filter: string
}

class List extends PureComponent<any, IState> {
    constructor(props: any) {
        super(props)

        this.state = {
            filter: ''
        }
    }

    render() {
        return (
            <FilterContext.Provider value={this.state.filter}>
                <div id='list'>
                    <Search value={this.state.filter} onChange={this.setFilter}/>

                    {config.settings.mods? 
                        <InnerList srcType={SrcType.mods}/> 
                    :null}
                    {config.settings.DLC? 
                        <InnerList srcType={SrcType.dlc}/>
                    :null}
                    
                    <InnerList srcType={SrcType.main}/>
                </div>
            </FilterContext.Provider>
        )
    }

    private setFilter = (value: string) => {
        this.setState({
            filter: value
        })
    } 
}

render(<List/>, MAIN)
