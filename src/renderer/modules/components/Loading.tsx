import { PureComponent } from 'react'

import { CircularProgress } from '@mui/material'
import StyledBackdrop from './styled/StyledBackdrop'

interface IProps {
    show: boolean
}

export default class Loading extends PureComponent<IProps> {
    render() {
        if (!this.props.show)
            return null
        
        return (
            <StyledBackdrop open={this.props.show}>
                <CircularProgress color='inherit' />
            </StyledBackdrop>
        )
    }
}
