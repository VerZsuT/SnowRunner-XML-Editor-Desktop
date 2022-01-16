import { PureComponent } from 'react'
import { render } from 'react-dom'
import 'styles/update/main'
import { MAIN, mainProcess, t } from 'scripts'

import {
    Button as MuiButton,
    Typography,
    ButtonProps,
    TypographyProps,
    styled
} from '@mui/material'
import { GridContainer } from 'modules/components/styled'

const { config, ipcRenderer } = window.provider
const { update } = mainProcess

const VersionTitle = styled((props: TypographyProps) => 
    <Typography variant='h6' {...props}/>
)({
    marginTop: '20px'
})

const ButtonsGrid = styled(GridContainer)({
    position: 'absolute',
    bottom: '20px',
    justifyContent: 'center'
})

const Button = styled((props: ButtonProps) => 
    <MuiButton variant='contained' {...props}/>
)({
    marginLeft: '5px',
    marginRight: '5px',
    textTransform: 'none'
})

interface IState {
    version: string
}

class UpdateWindow extends PureComponent<any, IState> {
    constructor(props: any) {
        super(props)

        this.state = {
            version: ''
        }
    }

    componentDidMount() {
        this.listenIPC()
    }

    render() {
        return (<> 
            <VersionTitle>
                {t.ALLOW_NEW_VERSION_AUTO} (v{this.state.version})
            </VersionTitle>
            <ButtonsGrid>
                <Button color='success' onClick={this.update}>{t.UPDATE}</Button>
                <Button color='error' onClick={this.ignore}>{t.IGNORE}</Button>
                <Button color='primary' onClick={this.close}>{t.CLOSE}</Button>
            </ButtonsGrid>
        </>)
    }

    private close = () => {
        window.close()
    }

    private update = () => {
        update()
    }

    private ignore = () => {
        config.settings.updates = false
        window.close()
    }

    private listenIPC() {
        ipcRenderer.on('content', (_event, data) => {
            this.setState({
                version: data
            })
        })
    }
}

render(<UpdateWindow />, MAIN)
