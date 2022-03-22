import { PureComponent } from 'react'
import { render } from 'react-dom'
import { MAIN } from 'scripts/funcs'
import localize from 'scripts/localize'
import main from 'scripts/main'
import Menu from 'menu'

import Language from '../components/Language'
import GameFolder from '../components/GameFolder'
import Save from './components/Save'
import Confirm, { showConfirm } from '../components/Confirm'
import ErrorHandler from '../components/ErrorHandler'

import { Typography } from '@mui/material'
import Title from './styled/Title'
import 'styles/setup'

const { importConfig, paths, texts } = main
const { existsSync, join, readFileSync } = window.service

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

    componentDidMount(): void {
        setTimeout(() => {
            this.checkExportedConfig()
        }, 500)
    }

    render() {
        const { pathToInitial } = this.state

        return <>
            <Menu/>
            <Confirm/>
            <ErrorHandler/>
            <Title>
                <Typography variant='h5'>
                    {localize.FIRST_STEPS_DESCRIPTION}
                </Typography>
            </Title>

            <Language/>
            <GameFolder onChange={this.setPath} preload={window.setupPreload}/>
            <Save pathToInitial={pathToInitial}/>
        </>
    }

    private setPath = (path: string) => {
        this.setState({ pathToInitial: path })
    }

    private checkExportedConfig() {
        if (existsSync(join(paths.backupFolder, 'config.json'))) {
            const exported = JSON.parse(readFileSync(join(paths.backupFolder, 'config.json')).toString())
            
            showConfirm({
                text: texts[exported.lang].IMPORT_CONFIG_MESSAGE,
                onSuccess: this.import
            })
        }
    }

    private import = () => {
        importConfig()
    }
}

render(<Setup/>, MAIN)
