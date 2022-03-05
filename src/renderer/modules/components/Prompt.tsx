import { PureComponent } from 'react'
import localize from 'scripts/localize'

import { Dialog, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import DialogContentText from './styled/DialogContentText'

interface IProps {
    open: boolean
    text: string
    onSuccess(value: string): void
    onClose(): void
    default?: string
    type?: string
    min?: string
    max?: string
}

interface IState {
    value: string
}

export default class Prompt extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        
        this.state = {
            value: this.props.default
        }
    }

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
                        <TextField
                            value={this.state.value}
                            type={this.props.type?? 'text'}
                            onChange={e => this.onChange(e.target.value)}
                            onBlur={this.onBlur}
                            placeholder={this.props.default.toString()}
                            inputProps={{
                                min: this.props.min,
                                max: this.props.max
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onSuccess} autoFocus>
                            {localize.DIALOG_ENTER}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    private onSuccess = () => {
        this.props.onSuccess(this.state.value? this.state.value : this.props.default)
        this.setState({ value: '' })
    }

    private onChange = (value: string) => {
        this.setState({value})
    }

    private onBlur = () => {
        let value = this.state.value
        if (this.props.type === 'number') {
            const min = this.props.min ? +this.props.min : 0
            const max = this.props.max ? +this.props.max : Infinity
            value = this.limit(+value, min, max).toString()
        }
        this.setState({value})
    }

    private limit(value: number, min: number, max: number) {
        return Math.min(Math.max(value, min), max)
    }
}
