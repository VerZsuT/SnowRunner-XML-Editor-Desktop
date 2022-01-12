import { PureComponent } from 'react'
import { mainProcess, t } from 'scripts'

import { Button, Container } from '@mui/material'

const { saveBackup } = mainProcess
const { config } = window.provider

interface IProps {
    pathToInitial: string
}

export class Save extends PureComponent<IProps> {
    render() {
        return (
            <Container>
                <Button
                    className='not-upper'
                    variant='contained'
                    onClick={this.save}
                >
                    {t.SAVE_BUTTON}
                </Button>
            </Container>
        )
    }

    private save = () => {
        if (!this.props.pathToInitial) {
            window['errorHandler'](t.NO_GAME_FOLDER)
            return
        }

        config.initial = this.props.pathToInitial
        saveBackup(true)
    }
}
