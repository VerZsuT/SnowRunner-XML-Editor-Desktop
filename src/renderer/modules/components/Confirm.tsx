import { PureComponent } from 'react'
import localize from 'scripts/localize'

import { Dialog, DialogContent, DialogActions, Button } from '@mui/material'
import DialogContentText from './styled/DialogContentText'

interface IState {
    text: string
    show?: boolean
    onSuccess?(): void
    onClose?(): void
    buttons?: {
        text: string
        onClick(): void
    }[]
}

export let showConfirm: (props: IState) => void

export default class Confirm extends PureComponent<{}, IState> {
    constructor(props: any) {
        super(props)
        this.state = { text: null }
        showConfirm = props => {
            const { onSuccess, onClose } = props

            this.setState({
                show: true,
                ...props,
                onSuccess: () => {
                    this.setState({ show: false })
                    if (onSuccess)
                        onSuccess()
                },
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
            onSuccess=()=>{},
            text='',
            buttons=null
        } = this.state

        return (
            <div>
                <Dialog
                    open={show}
                    onClose={onClose}
                >
                    <DialogContent>
                        <DialogContentText>
                            {text}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {buttons
                            ? buttons.map(button =>
                                <Button onClick={button.onClick}>
                                    {button.text}
                                </Button>
                            )
                            : <>
                                <Button onClick={onSuccess} autoFocus>
                                    {localize.DIALOG_YES}
                                </Button>
                                <Button onClick={onClose}>
                                    {localize.DIALOG_NO}
                                </Button>
                              </>
                        }
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
