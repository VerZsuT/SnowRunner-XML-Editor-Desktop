import { PureComponent } from 'react'

import { Snackbar } from '@mui/material'
import Alert from './styled/Alert'

interface IState {
    isOpen: boolean
    message: string
}

export default class ErrorHandler extends PureComponent<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            isOpen: false,
            message: ''
        }
    }
    
    componentDidMount(): void {
        window['errorHandler'] = this.errorHandler
    }

    render() {
        return (
            <Snackbar
                open={this.state.isOpen}
                autoHideDuration={6000}
                onClose={this.onClose}
            >
                <Alert onClose={this.onClose} severity='error'>
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
        this.setState({ isOpen: false })
    }
}
