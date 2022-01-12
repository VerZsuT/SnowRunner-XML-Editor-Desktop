import { Menu, MenuItem } from '@mui/material'
import { PureComponent } from 'react'
import { t } from 'scripts'

interface IProps {
    onReset(): void
    onClose(): void
    show: boolean
    x: number
    y: number
    text?: string
}

export class ResetMenu extends PureComponent<IProps> {
    render() {
        return (
            <Menu
                open={this.props.show}
                onClose={this.props.onClose}
                anchorReference='anchorPosition'
                anchorPosition={{
                    top: this.props.y,
                    left: this.props.x
                }}
            >
                <MenuItem onClick={this.props.onReset}>
                    {t.RESET_MENU_ITEM_LABEL}{this.props.text ? ` "${this.props.text}"` : ''}
                </MenuItem>
            </Menu>
        )
    }
}
