import { PureComponent } from 'react'
import localize from 'scripts/localize'
import config from 'scripts/config'
import main from 'scripts/main'

import { Button } from '@mui/material'
import Container from 'modules/components/styled/Container'

const { saveBackup } = main

interface IProps {
    pathToInitial: string
}

export default class Save extends PureComponent<IProps> {
    render() {
        return (
            <Container>
                <Button
                    className='not-upper'
                    variant='contained'
                    onClick={this.save}
                >
                    {localize.SAVE_BUTTON}
                </Button>
            </Container>
        )
    }

    private save = () => {
        const { pathToInitial } = this.props

        if (!pathToInitial) {
            window['errorHandler'](localize.NO_GAME_FOLDER)
            return
        }

        config.initial = pathToInitial
        saveBackup(true)
    }
}
