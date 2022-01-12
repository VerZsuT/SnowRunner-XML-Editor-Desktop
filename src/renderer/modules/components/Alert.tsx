import { PureComponent } from 'react'
import {
    Snackbar,
    Alert as AlertMUI,
    AlertColor,
    styled
} from '@mui/material'

interface IProps {
    show: boolean
    onClose(): void
    text: string
    type: AlertColor
}

const StyledAlert = styled(AlertMUI)({
    width: '100%'
})

export class Alert extends PureComponent<IProps> {
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
