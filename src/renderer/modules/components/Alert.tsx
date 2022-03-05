import { PureComponent } from 'react'

import { Snackbar, AlertColor } from '@mui/material'
import StyledAlert from './styled/StyledAlert'

interface IProps {
    show: boolean
    onClose(): void
    text: string
    type: AlertColor
}

export default class Alert extends PureComponent<IProps> {
    render() {
        return (
            <Snackbar
                open={this.props.show}
                autoHideDuration={6000}
                onClose={this.props.onClose}
            >
                <StyledAlert
                    onClose={this.props.onClose}
                    severity={this.props.type}
                >
                    {this.props.text}
                </StyledAlert>
            </Snackbar>
        )
    }
}
