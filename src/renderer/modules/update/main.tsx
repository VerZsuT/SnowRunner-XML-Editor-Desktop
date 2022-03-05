import { PureComponent } from 'react'
import { render } from 'react-dom'
import { MAIN } from 'scripts/funcs'
import localize from 'scripts/localize'
import config from 'scripts/config'
import main from 'scripts/main'

import VersionTitle from './styled/VersionTitle'
import ButtonsGrid from './styled/ButtonsGrid'
import Button from './styled/Button'
import 'styles/update'

const { on } = window.ipc
const { update } = main

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
                {localize.ALLOW_NEW_VERSION_AUTO} (v{this.state.version})
            </VersionTitle>
            <ButtonsGrid>
                <Button color='success' onClick={this.update}>{localize.UPDATE}</Button>
                <Button color='error' onClick={this.ignore}>{localize.IGNORE}</Button>
                <Button color='primary' onClick={this.close}>{localize.CLOSE}</Button>
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
        on('content', (_event, data) => {
            this.setState({ version: data })
        })
    }
}

render(<UpdateWindow/>, MAIN)
