import { PureComponent } from 'react'
import {
    Backdrop,
    CircularProgress,
    styled
} from '@mui/material'

const StyledBackdrop = styled(Backdrop)({
    color: '#fff',
    zIndex: 30
})

interface IProps {
    open: boolean
}

export class Loading extends PureComponent<IProps> {
    render() {
        if (!this.props.open) return null
        return (
            <StyledBackdrop open={this.props.open}>
                <CircularProgress color='inherit' />
            </StyledBackdrop>
        )
    }
}
