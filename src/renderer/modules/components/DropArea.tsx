import { PureComponent } from 'react'
import localize from 'scripts/localize'

import { Typography } from '@mui/material'
import Popup, { showPopup } from './Popup'
import Grid from './styled/Grid'

interface IProps {
    onDrop(files: FileList): void
}

interface IState {
    show: boolean
}

export default class DropArea extends PureComponent<IProps, IState> {
    private gridStyle = {
        justifyContent: 'center',
        alignItems: 'center',
        width: '200px',
        height: '100px'
    }

    constructor(props: IProps) {
        super(props)
        this.state = { show: null }
    }

    public componentDidMount() {
        this.handleDrop()
    }

    public componentDidUpdate(): void {
        const { show } = this.state

        showPopup({
            show,
            minHeight: 100,
            minWidth: 200,
            children: <>
                <Grid style={this.gridStyle}>
                    <Typography>{localize.DROP_TEXT}</Typography>
                </Grid>
            </>
        })
    }

    public render() {
        return <Popup/>
    }

    private handleDrop() {
        const { onDrop } = this.props

        let counter = 0

        document.addEventListener('drop', event => {
            event.preventDefault()
            event.stopPropagation()

            onDrop(event.dataTransfer.files)
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
