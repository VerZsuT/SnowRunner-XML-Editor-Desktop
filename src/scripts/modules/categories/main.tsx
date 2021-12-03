import { PureComponent } from 'react'
import { render } from 'react-dom'
import '@editor-service/menu'
import '@editor-bootstrap'
import './styles/main.css'

import { setHotKey, mainProcess, MAIN, t } from '@editor-service'
import Category from './components/Category'

class Categories extends PureComponent {
    private categories = ['trucks', 'trailers', 'cargo']
    private items = this.categories.map(category => 
        <Category key={category} name={category}/>
    )

    componentDidMount() {
        setHotKey({
            key: 'Backquote'
        }, () => {
            mainProcess.openConsole()
        })
        const invalidMods = mainProcess.invalidMods
        
        setTimeout(() => {
            if (invalidMods.length !== 0) {
                mainProcess.alertSync(`${t.INVALID_MODS_ALERT_MAIN}: \n- ${invalidMods.join('\n- ')}`)
            }
        }, 1000)
    }

    render() {
        return (
            <div id='categories'>
                {this.items}
            </div>
        )
    }
}

render(<Categories/>, MAIN)
