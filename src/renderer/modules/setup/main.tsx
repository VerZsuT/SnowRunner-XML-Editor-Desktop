import { PureComponent } from 'react'
import { render } from 'react-dom'
import { MAIN, mainProcess, t } from 'scripts'
import { Language } from './components/Language'
import { GameFolder } from './components/GameFolder'
import { Save } from './components/Save'
import { Menu } from 'menu'
import 'styles/setup/main'

const { existsSync, join, readFileSync } = window.setupPreload
const { paths, texts } = window.provider
const { confirm, importConfig, reload } = mainProcess

interface IState {
    pathToInitial: string
}

class Setup extends PureComponent<any, IState> {
    constructor(props: any) {
        super(props)

        this.state = {
            pathToInitial: ''
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.checkExportedConfig()
        }, 500)
    }

    render() {
        return (<>
            {Menu}
            <div id='app'>
                <header>
                    <h2 className='h2'>{t.FIRST_STEPS_DESCRIPTION}</h2>
                </header>

                <div className='steps'>
                    <Language />
                    <GameFolder onChange={this.setPath} />
                    <Save pathToInitial={this.state.pathToInitial} />
                </div>
            </div>
        </>)
    }

    private setPath = (path: string) => {
        this.setState({ pathToInitial: path })
    }

    private checkExportedConfig() {
        if (existsSync(join(paths.backupFolder, 'config.json'))) {
            const exported = JSON.parse(readFileSync(join(paths.backupFolder, 'config.json')).toString())
            if (confirm(texts[exported.lang].IMPORT_CONFIG_MESSAGE)) {
                importConfig()
                reload()
            }
        }
    }
}

render(<Setup />, MAIN)
