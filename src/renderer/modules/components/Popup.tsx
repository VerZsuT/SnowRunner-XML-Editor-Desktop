import { PureComponent } from 'react'
import type { ReactNode } from 'react'

import { Modal, Typography } from '@mui/material'
import PopupBox from './styled/PopupBox'
import Container from './styled/Container'

interface IProps {
    show: boolean
    title?: string
    onClose?(): void
    children: ReactNode
    keepMounted?: boolean
    minWidth?: number
    minHeight?: number
}

export default class Popup extends PureComponent<IProps> {
    render() {
        return (
            <Modal
                open={this.props.show}
                onClose={this.props.onClose ?? (()=>{})}
                keepMounted={this.props.keepMounted ?? false}
            >
                <PopupBox
                    style={{
                        minWidth: this.props.minWidth ?? 300,
                        minHeight: this.props.minHeight ?? 400,
                        padding: 0
                    }}
                >
                    {this.props.title?
                        <Typography
                            variant='h6'
                            component='h2'
                            style={{
                                padding: 3,
                                background: '#1c7dca',
                                color: 'white',
                                borderTopRightRadius: '4px',
                                borderTopLeftRadius: '4px',
                                border: 'none'
                            }}
                        >
                            {this.props.title}
                        </Typography>
                    : null}
                    <Container style={{ padding: 10 }}>
                        {this.props.children ?? null}
                    </Container>
                </PopupBox>
            </Modal>
        )
    }
}
