import { PureComponent } from 'react'
import { render } from 'react-dom'
import '@sxmle-service/menu'
import '@sxmle-bootstrap'
import '@sxmle-main-style'
import './styles/main'

import { setHotKey, mainProcess, MAIN, t } from '@sxmle-service'
import Category from './components/Category'
import { ListType } from '../list/enums'

class Categories extends PureComponent {
    private items: JSX.Element[]

    constructor(props: any) {
        super(props)

        const categories = Object.keys(ListType) as ListType[]
        this.items = categories.map(category => 
            <Category key={category} name={category}/>
        )
    }

    componentDidMount() {
        this.setConsoleHotkey()
        this.checkInvalidMods()
    }

    render() {
        return (
            <div id='categories'>
                {this.items}
            </div>
        )
    }

    private checkInvalidMods() {
        setTimeout(() => {
            const invalidMods = mainProcess.invalidMods
            if (invalidMods.length !== 0) {
                mainProcess.alertSync(`${t.INVALID_MODS_ALERT_MAIN}: \n- ${invalidMods.join('\n- ')}`)
            }
            if (config.settings.showWhatsNew) {
                mainProcess.openWhatsNew()
            }
        }, 500)
    }

    private setConsoleHotkey() {
        setHotKey({
            key: 'Backquote'
        }, () => {
            mainProcess.openConsole()
        })
    }
}

render(<Categories/>, MAIN)
