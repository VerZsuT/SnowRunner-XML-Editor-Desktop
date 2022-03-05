import { PureComponent } from 'react'
import localize from 'scripts/localize'

import { Dialog, DialogContent, DialogActions, Button } from '@mui/material'
import DialogContentText from './styled/DialogContentText'

interface IProps {
    open: boolean
    text: string
    onSuccess(): void
    onClose(): void
    buttons?: {
        text: string
        onClick(): void
    }[]
}

export default class Confirm extends PureComponent<IProps> {
    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.onClose}
                >
                    <DialogContent>
                        <DialogContentText>
                            {this.props.text}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {this.props.buttons
                            ? this.props.buttons.map(button =>
                                <Button onClick={button.onClick}>
                                    {button.text}
                                </Button>
                            )
                            : <>
                                <Button onClick={this.props.onSuccess} autoFocus>
                                    {localize.DIALOG_YES}
                                </Button>
                                <Button onClick={this.props.onClose}>
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
