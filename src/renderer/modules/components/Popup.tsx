import { PureComponent, ReactNode } from 'react'
import {
    Modal,
    Box,
    Typography,
    BoxProps,
    styled
} from '@mui/material'

const PopupBox = styled((props: BoxProps) => 
    <Box boxShadow={24} {...props} />
)({
    display: 'inline-block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    border: '1px solid gray',
    borderRadius: '5px',
    textAlign: 'center',
    paddingTop: '10px',
    paddingBottom: '15px',
    paddingLeft: '10px',
    paddingRight: '10px'
})

interface IProps {
    show: boolean
    title?: string
    onClose(): void
    children: ReactNode
}

export class Popup extends PureComponent<IProps> {
    render() {
        return (
            <Modal
                open={this.props.show}
                onClose={this.props.onClose}
            >
                <PopupBox>
                    {this.props.title?
                        <Typography variant='h6' component='h2'>
                            {this.props.title}
                        </Typography>
                    : null}
                    {this.props.children ?? null}
                </PopupBox>
            </Modal>
        )
    }
}
