import { PureComponent } from 'react'

import { Snackbar, AlertColor } from '@mui/material'
import StyledAlert from './styled/StyledAlert'

interface IState {
    text: string
    onClose?(): void
    type?: AlertColor
    show?: boolean
}

export let showAlert: (props: IState) => void

export default class Alert extends PureComponent<{}, IState> {
    constructor(props: any) {
        super(props)
        this.state = { text: null }
        showAlert = props => {
            const { onClose } = props

            this.setState({
                show: true,
                type: 'info',
                ...props,
                onClose: () => {
                    this.setState({ show: false })
                    if (onClose)
                        onClose()
                }
            })
        }
    }

    render() {
        const {
            show=false,
            onClose=()=>{},
            type='info',
            text=''
        } = this.state

        return (
            <Snackbar
                open={show}
                autoHideDuration={6000}
                onClose={onClose}
            >
                <StyledAlert
                    onClose={onClose}
                    severity={type}
                >
                    {text}
                </StyledAlert>
            </Snackbar>
        )
    }
}
