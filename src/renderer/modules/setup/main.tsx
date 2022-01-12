import { PureComponent } from 'react'
import { render } from 'react-dom'
import { MAIN, mainProcess, t } from 'scripts'
import { Language } from '../components/Language'
import { GameFolder } from '../components/GameFolder'
import { Save } from './components/Save'
import { ProgramMenu } from 'menu'
import 'styles/setup/main'
import { Confirm } from '../components/Confirm'
import { ErrorHandler } from '../components/ErrorHandler'

import {
    Typography,
    Container,
    ContainerProps,
    styled
} from '@mui/material'

const { importConfig } = mainProcess
const { existsSync, join, readFileSync } = window.setupPreload
const { paths, texts } = window.provider

const Title = styled((props: ContainerProps) =>
    <Container sx={{ boxShadow: 2 }} {...props} />
)({
    backgroundColor: '#1c7dca',
    marginTop: '31px',
    marginBottom: '8px',
    color: '#fafafa',
    padding: '8px 0'
})

interface IState {
    pathToInitial: string
    confirmIsOpened: boolean
    confirmText: string
}

class Setup extends PureComponent<any, IState> {
    constructor(props: any) {
        super(props)

        this.state = {
            pathToInitial: '',
            confirmText: '',
            confirmIsOpened: false
        }
    }

    componentDidMount(): void {
        setTimeout(() => {
            this.checkExportedConfig()
        }, 500)
    }

    render() {
        return (<>
            <ProgramMenu />
            <Confirm
                open={this.state.confirmIsOpened}
                text={this.state.confirmText}
                onSuccess={this.import}
                onClose={() => this.setState({ confirmIsOpened: false })}
            />
            <ErrorHandler preload={window.setupPreload} />
            <Title>
                <Typography variant='h5'>
                    {t.FIRST_STEPS_DESCRIPTION}
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
                confirmIsOpened: true,
                confirmText: texts[exported.lang].IMPORT_CONFIG_MESSAGE
            })
        }
    }

    private import = () => {
        importConfig()
    }
}

render(<Setup />, MAIN)
