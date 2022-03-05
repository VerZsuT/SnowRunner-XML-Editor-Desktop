import { PureComponent } from 'react'

import { CircularProgress } from '@mui/material'
import StyledBackdrop from './styled/StyledBackdrop'

interface IProps {
    open: boolean
}

export default class Loading extends PureComponent<IProps> {
    render() {
        if (!this.props.open)
            return null
        
        return (
            <StyledBackdrop open={this.props.open}>
                <CircularProgress color='inherit' />
            </StyledBackdrop>
        )
    }
}
