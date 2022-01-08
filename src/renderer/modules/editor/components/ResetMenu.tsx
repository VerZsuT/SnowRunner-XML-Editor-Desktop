import { PureComponent } from 'react'
import { t } from 'scripts'

interface IProps {
    show?: boolean
    onClick(): void
    onBlur(): void
    x: number
    y: number
    text?: string
}

export class ResetMenu extends PureComponent<IProps> {
    render() {
        if (!this.props.show) return null

        return (
            <button
                className='btn btn-primary reset-context'
                onClick={this.props.onClick}
                style={{
                    top: this.props.y,
                    left: this.props.x
                }}
                autoFocus
                onBlur={this.props.onBlur}
            >
                {t.RESET_MENU_ITEM_LABEL}{this.props.text ? ` "${this.props.text}"` : ''}
            </button>
        )
    }
}
