import { PureComponent } from 'react'
import localize from 'scripts/localize'
import memoizee from 'memoizee'

import { Menu, MenuItem } from '@mui/material'

interface IState {
    onReset?(): void
    onClose?(): void
    x?: number
    y?: number
    show?: boolean
    text?: string
}

export let showResetMenu: (props: IState) => void

export default class ResetMenu extends PureComponent<{}, IState> {
    constructor(props: any) {
        super(props)
        this.state = {}
        showResetMenu = props => {
            const { onClose, onReset } = props

            this.setState({
                show: true,
                ...props,
                onClose: () => {
                    this.setState({ show: false })
                    if (onClose)
                        onClose()
                },
                onReset: () => {
                    this.setState({ show: false })
                    if (onReset)
                        onReset()
                }
            })
        }
    }

    render() {
        const {
            show=false,
            onClose=()=>{},
            onReset=()=>{},
            x=0,
            y=0,
            text=''
        } = this.state

        return (
            <Menu
                open={show}
                onClose={onClose}
                anchorReference='anchorPosition'
                anchorPosition={this.position(y, x)}
            >
                <MenuItem onClick={onReset}>
                    {localize.RESET_MENU_ITEM_LABEL}{text ? ` "${text}"` : ''}
                </MenuItem>
            </Menu>
        )
    }

    private position = memoizee((top: number, left: number) => ({ top, left }))
}
