import { PureComponent } from 'react'
import {
    Snackbar,
    Alert as MuiAlert,
    styled
} from '@mui/material'

const Alert = styled(MuiAlert)({
    width: '100%'
})

interface IState {
    isOpen: boolean
    message: string
}

interface IProps {
    preload?: {
        errorHandler(error: string): void
    }
}

export class ErrorHandler extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            isOpen: false,
            message: ''
        }
    }
    
    componentDidMount(): void {
        window['errorHandler'] = this.errorHandler
        if (this.props.preload) {
            this.props.preload.errorHandler = this.errorHandler
        }
    }

    render() {
        return (
            <Snackbar
                open={this.state.isOpen}
                autoHideDuration={6000}
                onClose={this.onClose}
            >
                <Alert
                    onClose={this.onClose}
                    severity='error'
                >
                    {this.state.message}
                </Alert>
            </Snackbar>
        )
    }

    private errorHandler = (error: string) => {
        this.setState({
            isOpen: true,
            message: error
        })
    }

    private onClose = () => {
        this.setState({
            isOpen: false
        })
    }
}
