import { PureComponent } from 'react'
import { render } from 'react-dom'
import { MAIN } from 'scripts/funcs'
import localize from 'scripts/localize'
import main from 'scripts/main'
import Menu from 'menu'

import Language from '../components/Language'
import GameFolder from '../components/GameFolder'
import Save from './components/Save'
import Confirm, { IConfirmProps } from '../components/Confirm'
import ErrorHandler from '../components/ErrorHandler'

import { Typography } from '@mui/material'
import Title from './styled/Title'
import 'styles/setup'

const { importConfig, paths, texts } = main
const { existsSync, join, readFileSync } = window.service

interface IState {
    pathToInitial: string
    confirm: IConfirmProps
}

class Setup extends PureComponent<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            pathToInitial: '',
            confirm: null
        }
    }

    componentDidMount(): void {
        setTimeout(() => {
            this.checkExportedConfig()
        }, 500)
    }

    render() {
        return (<>
            <Menu />
            <Confirm
                show={this.state.confirm?.show}
                text={this.state.confirm?.text}
                onSuccess={this.import}
                onClose={() => this.setState({ confirm: null })}
            />
            <ErrorHandler />
            <Title>
                <Typography variant='h5'>
                    {localize.FIRST_STEPS_DESCRIPTION}
                </Typography>
            </Title>

            <Language />
            <GameFolder onChange={this.setPath} preload={window.setupPreload} />
            <Save pathToInitial={this.state.pathToInitial} />
        </>)
    }

    private setPath = (path: string) => {
        this.setState({ pathToInitial: path })
    }

    private checkExportedConfig() {
        if (existsSync(join(paths.backupFolder, 'config.json'))) {
            const exported = JSON.parse(readFileSync(join(paths.backupFolder, 'config.json')).toString())
            
            this.setState({
                confirm: {
                    show: true,
                    text: texts[exported.lang].IMPORT_CONFIG_MESSAGE
                }
            })
        }
    }

    private import = () => {
        importConfig()
    }
}

render(<Setup/>, MAIN)
