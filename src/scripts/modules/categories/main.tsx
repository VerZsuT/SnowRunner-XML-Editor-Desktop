import { PureComponent } from 'react'
import { render } from 'react-dom'
import '@editor-service/menu'
import '@editor-bootstrap'
import './styles/main.css'

import { setHotKey, mainProcess, MAIN, t } from '@editor-service'
import Category from './components/Category'

class Categories extends PureComponent {
    private items: JSX.Element[]

    constructor(props: any) {
        super(props)

        const categories = ['trucks', 'trailers', 'cargo']
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
        const invalidMods = mainProcess.invalidMods
        setTimeout(() => {
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
