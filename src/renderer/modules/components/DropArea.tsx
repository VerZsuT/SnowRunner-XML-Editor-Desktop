import { PureComponent } from 'react'
import localize from 'scripts/localize'

import { Typography } from '@mui/material'
import Popup from './Popup'
import Grid from './styled/Grid'

interface IProps {
    onDrop(files: FileList): void
}

interface IState {
    show: boolean
}

export default class DropArea extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            show: false
        }
    }

    public componentDidMount() {
        this.handleDrop()
    }

    public render() {
        if (!this.state.show)
            return null

        return (
            <Popup show={true} minHeight={100} minWidth={200}>
                <Grid style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '200px',
                    height: '100px'
                }}>
                    <Typography>{localize.DROP_TEXT}</Typography>
                </Grid>
            </Popup>
        )
    }

    private handleDrop() {
        let counter = 0

        document.addEventListener('drop', event => {
            event.preventDefault()
            event.stopPropagation()

            this.props.onDrop(event.dataTransfer.files)
            this.setState({ show: false })
            counter = 0
        })

        document.addEventListener('dragover', event => {
            event.preventDefault()
        })

        document.addEventListener('dragenter', () => {
            ++counter
            if (counter === 1)
                this.setState({ show: true })
        })

        document.addEventListener('dragleave', () => {
            --counter
            if (counter === 0)
                this.setState({ show: false })
        })
    }
}
