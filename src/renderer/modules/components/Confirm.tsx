import { PureComponent } from 'react'
import { t } from 'scripts'

import {
    Dialog,
    DialogContent,
    DialogContentText as MuiDialogContentText,
    DialogActions,
    Button,
    styled
} from '@mui/material'

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

const DialogContentText = styled(MuiDialogContentText)({
    color: 'black'
})

export class Confirm extends PureComponent<IProps> {
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
                                    {t.DIALOG_YES}
                                </Button>
                                <Button onClick={this.props.onClose}>
                                    {t.DIALOG_NO}
                                </Button>
                              </>
                        }
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
